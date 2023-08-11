import { Dispatch, SetStateAction } from "react"
import type { File, SaveFile } from "../types"
import { FilePreview } from "../components/FilePreview"
import { styles } from "../styles"

type FilesProps = {
    selectionMode: boolean
    files: File[]
    styleIndex: number
    searchMode: boolean
    setCurrentFile: (f: SaveFile) => void
    setAllSelected: (b: boolean) => void
    toggleSelection: (file: File) => void
    setEditorOpen: Dispatch<SetStateAction<boolean>>
    setSelectionMode: Dispatch<SetStateAction<boolean>>
}
export function Files({ selectionMode, searchMode, files, setEditorOpen, setCurrentFile, setAllSelected, toggleSelection, setSelectionMode, styleIndex }: FilesProps) {
    return (
        <>
            {files.length !== 0 ? (
                <div className={"files" + (selectionMode ? " easy-selection" : "") + " " + styles[styleIndex].className}>
                    {files.map((file) => (
                        <FilePreview
                            key={file.id}
                            file={file}
                            openFile={() => {
                                setEditorOpen(true)
                                setCurrentFile(file)
                            }}
                            toggleSelection={() => {
                                setAllSelected(false)
                                toggleSelection(file)
                                setSelectionMode(true)
                            }}
                            easySelection={selectionMode}
                            appearanceStyle={styles[styleIndex]}
                        />
                    ))}
                </div>
            ) : !searchMode ? (
                <div className="empty-files">
                    <div className="heading">No notes</div>
                    <div className="sub">Click button in the bottom right corner to create one</div>
                </div>
            ) : (
                <div className="empty-files">
                    <div className="sub">No notes satisfies search</div>
                </div>
            )}
        </>
    )
}
