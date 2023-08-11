import { useEffect, useRef, useState } from "react"
import "./App.css"
import useFiles from "./hooks/useFiles"
import useFile from "./hooks/useFile"
import type { File, SortingType } from "./types"
import { v4 as uuidv4 } from "uuid"
import { SideMenu } from "./components/SideMenu"
import useSearchHistory from "./hooks/useSearchHistory"
import { FileEditor } from "./components/FileEditor"
import { FilesActions } from "./components/FilesActions"
import { Header } from "./components/Header"
import { useSavedValue } from "./hooks/useSavedValue"
import { useFolders } from "./hooks/useFolders"
import { NewFolderModal } from "./components/NewFolderModal"
import { Feed } from "./components/Feed"
import { SelectionMenu } from "./components/SelectionMenu"
import { styles } from "./styles"
import { NewFile } from "./components/NewFile"
import { FolderSelection } from "./components/FolderSelection"

const sortingTypes: SortingType[] = [
    {
        name: "Date of creation",
        compare: (a, b) => +new Date(b.createdAt) - +new Date(a.createdAt),
    },
    {
        name: "Date of last change",
        compare: (a, b) => +new Date(b.changedAt ?? b.createdAt) - +new Date(a.changedAt ?? a.createdAt),
    },
    {
        name: "Note's title",
        compare: (a, b) => (a.name === "" ? 1 : b.name === "" ? -1 : a.name.localeCompare(b.name)),
    },
]

function App() {
    const { files: initialFiles, saveFile, toggleSelection, setSelectedAll, deleteFile, toggleFavourite, copyFile } = useFiles()
    const { searchHistory, addToSearchHistory, removeFromSearchHistory } = useSearchHistory()
    const { folders, filesCounts, addFolder, removeFolder } = useFolders(initialFiles)

    const [selectionMode, setSelectionMode] = useState<boolean>(false)
    const [allSelected, setAllSelected] = useState<boolean>(false)

    const [searchMode, setSearchMode] = useState<boolean>(false)
    const [searchQueue, setSearchQueue] = useState<string>("")

    const [currentFile, setCurrentFile] = useFile()

    const [sideMenuOpen, setSideMenuOpen] = useState(false)
    const [editorOpen, setEditorOpen] = useState(false)

    const [sortingTypeIndex, setSortingTypeIndex] = useState<number>(0)
    const [inverseSorting, setInverseSorting] = useState<boolean>(false)

    const [styleIndex, setStyleIndex] = useSavedValue<number>(0, "styleIndex")

    const [folderSelectionOpen, setFolderSelectionOpen] = useState<boolean>(false)
    const folderSelectedCallbackRef = useRef<((folderId: string | undefined) => void) | undefined>(undefined)

    const [newFolderModalOpen, setNewFolderModalOpen] = useState<boolean>(false)
    // null = no folder, undefined = default
    const [selectedFolder, setSelectionFolder] = useState<string | undefined | null>(null)

    // it could be better, but it won't
    function fileToSatisfiness(file: File) {
        let result = 0

        result += 10 * (file.name.split(searchQueue).length - 1)
        result += file.content.split(searchQueue).length - 1

        return result
    }

    function filterAndSortSearch(files: File[]) {
        return files
            .map((file) => {
                return {
                    file: file,
                    satisfy: fileToSatisfiness(file),
                }
            })
            .filter((obj) => obj.satisfy > 0)
            .sort((a, b) => {
                return a.satisfy - b.satisfy
            })
            .map((obj) => obj.file)
    }

    const sortedFiles = initialFiles.sort(inverseSorting ? (a, b) => sortingTypes[sortingTypeIndex].compare(b, a) : sortingTypes[sortingTypeIndex].compare)

    const files = searchMode ? filterAndSortSearch(sortedFiles) : sortedFiles.filter((f) => f.folderId === selectedFolder || selectedFolder === null)

    useEffect(() => {
        if (!searchMode && searchQueue !== "") {
            addToSearchHistory(searchQueue)
            setSearchQueue("")
        }
    }, [searchMode])

    useEffect(() => {
        if (editorOpen) {
            document.body.classList.add("locked")
        } else {
            document.body.classList.remove("locked")
        }
    }, [editorOpen])

    return (
        <>
            <SideMenu
                selectedFolder={selectedFolder}
                files={initialFiles}
                open={sideMenuOpen}
                setNewFolderModalOpen={setNewFolderModalOpen}
                onClose={() => setSideMenuOpen(false)}
                folders={folders}
                filesCounts={filesCounts}
                removeFolder={removeFolder}
                setSelectedFolder={setSelectionFolder}
            />
            <div className={"main"}>
                <Header
                    selectedFolderLabel={selectedFolder === null ? "All Notes" : selectedFolder === undefined ? "Default" : folders[selectedFolder].name}
                    styleIndex={styleIndex}
                    searchMode={searchMode}
                    appearanceStyles={styles}
                    searchQueue={searchQueue}
                    saveFile={saveFile}
                    setStyleIndex={setStyleIndex}
                    setSearchMode={setSearchMode}
                    setSearchQueue={setSearchQueue}
                    setSideMenuOpen={setSideMenuOpen}
                    setSelectionMode={setSelectionMode}
                />
                {(!searchMode || searchQueue.length !== 0) && (
                    <FilesActions
                        allSelected={allSelected}
                        sortingTypes={sortingTypes}
                        selectionMode={selectionMode}
                        inverseSorting={inverseSorting}
                        sortingTypeIndex={sortingTypeIndex}
                        setSelectedAll={setSelectedAll}
                        setAllSelected={setAllSelected}
                        setSelectionMode={setSelectionMode}
                        setInverseSorting={setInverseSorting}
                        setSortingTypeIndex={setSortingTypeIndex}
                    />
                )}
                <Feed
                    files={files}
                    searchMode={searchMode}
                    styleIndex={styleIndex}
                    searchQueue={searchQueue}
                    searchHistory={searchHistory}
                    selectionMode={selectionMode}
                    setEditorOpen={setEditorOpen}
                    setCurrentFile={setCurrentFile}
                    setAllSelected={setAllSelected}
                    setSearchQueue={setSearchQueue}
                    toggleSelection={toggleSelection}
                    setSelectionMode={setSelectionMode}
                    removeFromSearchHistory={removeFromSearchHistory}
                />
            </div>
            <SelectionMenu
                files={files}
                selectionMode={selectionMode}
                folderSelectedCallbackRef={folderSelectedCallbackRef}
                saveFile={saveFile}
                copyFile={copyFile}
                deleteFile={deleteFile}
                toggleFavourite={toggleFavourite}
                setFolderSelectionOpen={setFolderSelectionOpen}
            />
            {!searchMode && !selectionMode && (
                <NewFile
                    onClick={() => {
                        const file = {
                            name: "",
                            content: "",
                            id: uuidv4(),
                            createdAt: new Date().toISOString(),
                        }
                        setCurrentFile(file)
                        setEditorOpen(true)
                    }}
                />
            )}
            <FolderSelection
                filesCounts={filesCounts}
                setNewFolderModalOpen={setNewFolderModalOpen}
                open={folderSelectionOpen}
                hide={() => setFolderSelectionOpen(false)}
                folderSelectedCallbackRef={folderSelectedCallbackRef}
                folders={folders}
            />
            <FileEditor
                open={editorOpen}
                onClose={() => setEditorOpen(false)}
                file={currentFile}
                saveFile={saveFile}
                setFolderSelectionOpen={setFolderSelectionOpen}
                folderSelectedCallbackRef={folderSelectedCallbackRef}
                deleteCurrentFile={() => deleteFile(currentFile.id)}
            />
            <NewFolderModal open={newFolderModalOpen} hide={() => setNewFolderModalOpen(false)} addFolder={addFolder} />
        </>
    )
}

export default App
