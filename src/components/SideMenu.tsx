import { Dispatch, SetStateAction, useState } from "react"
import { Folder, File } from "../types"

export type SideMenuProps = {
    open: boolean
    onClose: () => void
    folders: { [key: string]: Folder }
    filesCounts: { [key: string]: number }
    files: File[]
    removeFolder: (id: string) => void
    setNewFolderModalOpen: (value: React.SetStateAction<boolean>) => void
    selectedFolder: string | undefined | null
    setSelectedFolder: Dispatch<SetStateAction<string | undefined | null>>
}

export function SideMenu({ files, open, onClose, folders, filesCounts, removeFolder, setNewFolderModalOpen, setSelectedFolder, selectedFolder }: SideMenuProps) {
    const [editMode, setEditMode] = useState<boolean>(false)

    const foldersArray = Object.values(folders)

    return (
        <div className={"side-menu-wrapper" + (open ? " open" : "")} onClick={(e) => (e.currentTarget == e.target ? onClose() : null)}>
            <div className="side-menu">
                <header>
                    <button className="close-button" onClick={() => onClose()}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                            <path
                                fillRule="evenodd"
                                d="M12.5 15a.5.5 0 0 1-.5-.5v-13a.5.5 0 0 1 1 0v13a.5.5 0 0 1-.5.5ZM10 8a.5.5 0 0 1-.5.5H3.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L3.707 7.5H9.5a.5.5 0 0 1 .5.5Z"
                            />
                        </svg>
                    </button>
                </header>
                <div className="side-menu-content">
                    <div className="all-folders">
                        <div className={"folder" + (selectedFolder === null ? " selected" : "")}>
                            <button
                                className="core"
                                onClick={() => {
                                    setSelectedFolder(null)
                                    onClose()
                                }}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                                    <path d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2z" />
                                    <path d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1z" />
                                </svg>
                                <div>{"All notes"}</div>
                                <div className="file-count">{files.length}</div>
                            </button>
                        </div>
                        {[{ name: "Default" } as Partial<Folder> & { name: string }].concat(foldersArray).map((folder) => (
                            <div className={"folder" + (selectedFolder === folder.id ? " selected" : "")} key={folder.id ?? ""}>
                                <button
                                    className="core"
                                    onClick={() => {
                                        setSelectedFolder(folder.id)
                                        onClose()
                                    }}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill={folder.color ?? "currentColor"} viewBox="0 0 16 16">
                                        <path d="M.54 3.87.5 3a2 2 0 0 1 2-2h3.672a2 2 0 0 1 1.414.586l.828.828A2 2 0 0 0 9.828 3h3.982a2 2 0 0 1 1.992 2.181l-.637 7A2 2 0 0 1 13.174 14H2.826a2 2 0 0 1-1.991-1.819l-.637-7a1.99 1.99 0 0 1 .342-1.31zM2.19 4a1 1 0 0 0-.996 1.09l.637 7a1 1 0 0 0 .995.91h10.348a1 1 0 0 0 .995-.91l.637-7A1 1 0 0 0 13.81 4H2.19zm4.69-1.707A1 1 0 0 0 6.172 2H2.5a1 1 0 0 0-1 .981l.006.139C1.72 3.042 1.95 3 2.19 3h5.396l-.707-.707z" />
                                    </svg>
                                    <div>{folder.name}</div>
                                    <div className="file-count">{filesCounts[folder.id + ""]}</div>
                                </button>
                                {editMode && folder.id !== undefined && (
                                    <button onClick={() => folder.id !== undefined && removeFolder(folder.id)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" viewBox="0 0 16 16">
                                            <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
                                        </svg>
                                    </button>
                                )}
                            </div>
                        ))}
                        {editMode && (
                            <div className="folder">
                                <button className="core" onClick={() => setNewFolderModalOpen(true)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                                        <path fillRule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z" />
                                    </svg>
                                    <div>New folder</div>
                                </button>
                            </div>
                        )}
                    </div>
                </div>
                <div className="edit-folders-wrapper">
                    <button className="edit-folders" onClick={() => setEditMode(!editMode)}>
                        {editMode ? "Stop editing" : "Edit"}
                    </button>
                </div>
            </div>
        </div>
    )
}
