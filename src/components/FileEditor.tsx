import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react"
import type { PreFile, SaveFile } from "../types"

type FileEditorProps = {
    onClose: () => void
    open: boolean
    file: SaveFile
    saveFile: (file: PreFile) => void
    setFolderSelectionOpen: Dispatch<SetStateAction<boolean>>
    folderSelectedCallbackRef: React.MutableRefObject<((folderId: string | undefined) => void) | undefined>
    deleteCurrentFile: () => void
}

export function FileEditor({ open, onClose, file, saveFile, setFolderSelectionOpen, folderSelectedCallbackRef }: FileEditorProps) {
    const [nameExpanded, setNameExpanded] = useState(false)
    const [favourite, setFavourite] = useState(false)
    const [readonly, setReadonly] = useState(false)

    const nameInputRef = useRef<HTMLInputElement>(null)
    const textareaRef = useRef<HTMLTextAreaElement>(null)

    useEffect(() => {
        if (nameInputRef.current) {
            nameInputRef.current.value = file.name
        }

        if (textareaRef.current) {
            textareaRef.current.value = file.content
        }

        setFavourite(file.favourite ?? false)
    }, [file])

    function close() {
        file.name = nameInputRef.current?.value.substring(0, 50) ?? ""
        file.content = textareaRef.current?.value ?? ""
        file.favourite = favourite
        saveFile(file)
        onClose()
    }

    return (
        <div className={"file-editor" + (open ? " open" : "")}>
            <header className={nameExpanded ? "expanded" : ""}>
                <button className="go-back" onClick={() => (nameExpanded ? setNameExpanded(false) : close())}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z" />
                    </svg>
                </button>
                <input ref={nameInputRef} maxLength={50} className="name-input" placeholder="Name" onClick={() => setNameExpanded(true)} />
                <button className="favourite" onClick={() => setFavourite(!favourite)}>
                    {favourite ? (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z" />
                        </svg>
                    )}
                </button>
                <button
                    className="folders"
                    onClick={() => {
                        setFolderSelectionOpen(true)
                        folderSelectedCallbackRef.current = (folderId) => {
                            file.folderId = folderId
                        }
                    }}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M1 3.5A1.5 1.5 0 0 1 2.5 2h2.764c.958 0 1.76.56 2.311 1.184C7.985 3.648 8.48 4 9 4h4.5A1.5 1.5 0 0 1 15 5.5v.64c.57.265.94.876.856 1.546l-.64 5.124A2.5 2.5 0 0 1 12.733 15H3.266a2.5 2.5 0 0 1-2.481-2.19l-.64-5.124A1.5 1.5 0 0 1 1 6.14V3.5zM2 6h12v-.5a.5.5 0 0 0-.5-.5H9c-.964 0-1.71-.629-2.174-1.154C6.374 3.334 5.82 3 5.264 3H2.5a.5.5 0 0 0-.5.5V6zm-.367 1a.5.5 0 0 0-.496.562l.64 5.124A1.5 1.5 0 0 0 3.266 14h9.468a1.5 1.5 0 0 0 1.489-1.314l.64-5.124A.5.5 0 0 0 14.367 7H1.633z" />
                    </svg>
                    <div>Folders</div>
                </button>
                <div className="creation-date">
                    <div>
                        {new Date(file.createdAt).toLocaleString("en-GB", {
                            hour12: false,
                        })}
                    </div>
                </div>
                <div className="file-actions">
                    <button onClick={() => setReadonly(!readonly)}>
                        {readonly ? (
                            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                                <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                                <path d="M1 2.828c.885-.37 2.154-.769 3.388-.893 1.33-.134 2.458.063 3.112.752v9.746c-.935-.53-2.12-.603-3.213-.493-1.18.12-2.37.461-3.287.811V2.828zm7.5-.141c.654-.689 1.782-.886 3.112-.752 1.234.124 2.503.523 3.388.893v9.923c-.918-.35-2.107-.692-3.287-.81-1.094-.111-2.278-.039-3.213.492V2.687zM8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783z" />
                            </svg>
                        )}
                    </button>
                </div>
            </header>
            <div className="textarea-wrapper" onClick={() => setNameExpanded(false)}>
                <textarea autoFocus ref={textareaRef} readOnly={readonly}></textarea>
            </div>
        </div>
    )
}
