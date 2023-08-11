import { Dispatch, SetStateAction, useState } from "react"
import type { File } from "../types"
import { downloadFile } from "../utils/downloadFile"
import { formatDayMonth } from "../utils/dates"

type SelectionMenuProps = {
    selectionMode: boolean
    setFolderSelectionOpen: Dispatch<SetStateAction<boolean>>
    folderSelectedCallbackRef: React.MutableRefObject<((folderId: string | undefined) => void) | undefined>
    saveFile: (f: File) => void
    files: File[]
    deleteFile: (string: string) => void
    toggleFavourite: (f: File) => void
    copyFile: (f: File) => void
}
export function SelectionMenu({ selectionMode, copyFile, toggleFavourite, setFolderSelectionOpen, saveFile, folderSelectedCallbackRef, files, deleteFile }: SelectionMenuProps) {
    const [confirmDeletion, setConfirmDeletion] = useState<boolean>(false)

    return (
        <div className={"selection-menu" + (selectionMode ? " open" : "")}>
            <div className="selection-menu-wrapper">
                <button
                    onClick={() => {
                        setFolderSelectionOpen(true)

                        folderSelectedCallbackRef.current = (folderId: string | undefined) => {
                            files.forEach((f) => {
                                if (f.selected) {
                                    f.folderId = folderId
                                    saveFile(f)
                                }
                            })
                        }
                    }}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M.54 3.87.5 3a2 2 0 0 1 2-2h3.672a2 2 0 0 1 1.414.586l.828.828A2 2 0 0 0 9.828 3h3.982a2 2 0 0 1 1.992 2.181l-.637 7A2 2 0 0 1 13.174 14H2.826a2 2 0 0 1-1.991-1.819l-.637-7a1.99 1.99 0 0 1 .342-1.31zM2.19 4a1 1 0 0 0-.996 1.09l.637 7a1 1 0 0 0 .995.91h10.348a1 1 0 0 0 .995-.91l.637-7A1 1 0 0 0 13.81 4H2.19zm4.69-1.707A1 1 0 0 0 6.172 2H2.5a1 1 0 0 0-1 .981l.006.139C1.72 3.042 1.95 3 2.19 3h5.396l-.707-.707z" />
                    </svg>
                    <span>Move</span>
                </button>
                {!confirmDeletion ? (
                    <button onClick={() => setConfirmDeletion(true)}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z" />
                        </svg>
                        <span>Delete</span>
                    </button>
                ) : (
                    <button
                        onClick={() => {
                            files.forEach((f) => {
                                if (f.selected) {
                                    deleteFile(f.id)
                                }
                            })
                            setConfirmDeletion(false)
                        }}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="green" viewBox="0 0 16 16">
                            <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z" />
                        </svg>
                        <span>Confirm</span>
                    </button>
                )}
                <button
                    onClick={() => {
                        files.forEach((f) => {
                            if (f.selected) {
                                toggleFavourite(f)
                            }
                        })
                    }}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z" />
                    </svg>
                    <span>Toggle</span>
                </button>
                <button
                    onClick={() => {
                        files.forEach((f) => {
                            if (f.selected) {
                                const name = f.name || `Text Note ${formatDayMonth(new Date(f.createdAt))}`
                                downloadFile(name, `${name} | ${f.createdAt.split("T")[0]} \n----------------\n` + f.content)
                            }
                        })
                    }}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z" />
                        <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z" />
                    </svg>
                    <span>Download</span>
                </button>
                <button
                    onClick={() => {
                        files.forEach((f) => {
                            if (f.selected) {
                                copyFile(f)
                            }
                        })
                    }}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M13 0H6a2 2 0 0 0-2 2 2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2 2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm0 13V4a2 2 0 0 0-2-2H5a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1zM3 4a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4z" />
                    </svg>
                    <span>Copy</span>
                </button>
            </div>
        </div>
    )
}
