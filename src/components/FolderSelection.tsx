import { Dispatch, SetStateAction } from "react"
import { Folder } from "../types"

type FolderSelectionProps = {
    open: boolean
    hide: () => void
    folderSelectedCallbackRef: React.MutableRefObject<((folderId: string | undefined) => void) | undefined>
    folders: { [key: string]: Folder }
    setNewFolderModalOpen: Dispatch<SetStateAction<boolean>>
    filesCounts: { [key: string]: number }
}

export function FolderSelection({ open, filesCounts, hide, folderSelectedCallbackRef, folders, setNewFolderModalOpen }: FolderSelectionProps) {
    return (
        <div
            className={"folder-selection-modal" + (open ? " open" : "")}
            onClick={(e) => {
                if (e.currentTarget != e.target) {
                    return
                }

                hide()
                folderSelectedCallbackRef.current = undefined
            }}
        >
            <div className="folder-selection-modal-wrapper">
                <header>Select folder</header>
                <div className="folder-selection">
                    {[{ name: "Default" } as Partial<Folder> & { name: string }].concat(Object.values(folders)).map((folder) => (
                        <button
                            key={folder.id ?? ""}
                            onClick={() => {
                                hide()
                                folderSelectedCallbackRef.current?.(folder.id)
                                folderSelectedCallbackRef.current = undefined
                            }}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill={folder.color ?? "currentColor"} viewBox="0 0 16 16">
                                <path d="M.54 3.87.5 3a2 2 0 0 1 2-2h3.672a2 2 0 0 1 1.414.586l.828.828A2 2 0 0 0 9.828 3h3.982a2 2 0 0 1 1.992 2.181l-.637 7A2 2 0 0 1 13.174 14H2.826a2 2 0 0 1-1.991-1.819l-.637-7a1.99 1.99 0 0 1 .342-1.31zM2.19 4a1 1 0 0 0-.996 1.09l.637 7a1 1 0 0 0 .995.91h10.348a1 1 0 0 0 .995-.91l.637-7A1 1 0 0 0 13.81 4H2.19zm4.69-1.707A1 1 0 0 0 6.172 2H2.5a1 1 0 0 0-1 .981l.006.139C1.72 3.042 1.95 3 2.19 3h5.396l-.707-.707z" />
                            </svg>
                            <div>{folder.name}</div>
                            <div className="file-count">{filesCounts[folder.id + ""]}</div>
                        </button>
                    ))}
                    <button onClick={() => setNewFolderModalOpen(true)}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z" />
                        </svg>
                        <div>Create new</div>
                    </button>
                </div>
            </div>
        </div>
    )
}
