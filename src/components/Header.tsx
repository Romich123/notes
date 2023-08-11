import { Dispatch, SetStateAction, useRef, useState } from "react"
import type { PreFile, SaveFile, File, AppearanceStyle } from "../types"
import isArrayBuffer from "is-array-buffer"
import { arrayBufferToString } from "../utils/arrayBufferToString"

type HeaderProps = {
    styleIndex: number
    searchMode: boolean
    searchQueue: string
    selectedFolderLabel: string
    appearanceStyles: AppearanceStyle[]
    saveFile: (f: SaveFile | File | PreFile) => void
    setStyleIndex: Dispatch<SetStateAction<number>>
    setSearchQueue: Dispatch<SetStateAction<string>>
    setSearchMode: Dispatch<SetStateAction<boolean>>
    setSideMenuOpen: Dispatch<SetStateAction<boolean>>
    setSelectionMode: Dispatch<SetStateAction<boolean>>
}
export function Header({
    selectedFolderLabel,
    searchMode,
    setSelectionMode,
    setSearchMode,
    setSideMenuOpen,
    searchQueue,
    setSearchQueue,
    saveFile,
    appearanceStyles,
    setStyleIndex,
    styleIndex,
}: HeaderProps) {
    const [menuOpen, setMenuOpen] = useState<boolean>(false)
    const [appearanceSettingsOpen, setAppearanceSettingsOpen] = useState<boolean>(false)

    const fileInputRef = useRef<HTMLInputElement>(null)

    return (
        <>
            <header>
                <button className={"menu-button" + (searchMode ? " back-button" : "")} onClick={() => (!searchMode ? setSideMenuOpen((prev) => !prev) : setSearchMode(false))}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z" />
                    </svg>
                </button>
                {!searchMode ? (
                    <div className="label">{selectedFolderLabel}</div>
                ) : (
                    <input
                        autoFocus
                        className={"search" + (searchQueue.length > 0 ? " filled" : "")}
                        placeholder="Search"
                        value={searchQueue}
                        onChange={(e) => {
                            setSearchQueue(e.target.value)
                        }}
                    />
                )}
                <div className="actions">
                    {!searchMode && (
                        <button onClick={() => fileInputRef.current?.click()}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                                <path d="M8.5 11.5a.5.5 0 0 1-1 0V7.707L6.354 8.854a.5.5 0 1 1-.708-.708l2-2a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 7.707V11.5z" />
                                <path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2zM9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5v2z" />
                            </svg>
                        </button>
                    )}
                    <button
                        onClick={() => {
                            setSearchMode(true)
                        }}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                        </svg>
                    </button>
                    {!searchMode ? (
                        <button onClick={() => setMenuOpen(true)}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                                <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                            </svg>
                        </button>
                    ) : (
                        <button onClick={() => setSearchMode(false)} className="cross">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                                <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
                            </svg>
                        </button>
                    )}
                </div>
            </header>
            {menuOpen && (
                <div className="files-menu-wrapper" onClick={(e) => (e.currentTarget == e.target ? setMenuOpen(false) : null)}>
                    <div className="files-menu">
                        <button
                            onClick={() => {
                                setSelectionMode((prev) => !prev)
                                setMenuOpen(false)
                            }}
                        >
                            Edit
                        </button>
                        <button
                            onClick={() => {
                                setAppearanceSettingsOpen(true)
                                setMenuOpen(false)
                            }}
                        >
                            Change Appearance
                        </button>
                    </div>
                </div>
            )}
            {appearanceSettingsOpen && (
                <div className="appearance-settings-wrapper" onClick={(e) => (e.currentTarget == e.target ? setAppearanceSettingsOpen(false) : null)}>
                    <div className="appearance-settings">
                        {appearanceStyles.map((style, i) => (
                            <button
                                key={i}
                                onClick={() => {
                                    setStyleIndex(i)
                                    setAppearanceSettingsOpen(false)
                                }}
                                className={styleIndex === i ? "selected" : ""}
                            >
                                {style.name}
                            </button>
                        ))}
                    </div>
                </div>
            )}
            <input
                ref={fileInputRef}
                onChange={(e) => {
                    const file = (e?.target.files as FileList)[0]

                    if (file) {
                        var reader = new FileReader()
                        reader.readAsText(file, "UTF-8")

                        reader.onload = (e) => {
                            const result = e.target?.result

                            let content
                            if (isArrayBuffer(result)) {
                                content = arrayBufferToString(result)
                            } else {
                                content = result + ""
                            }

                            saveFile({
                                name: file.name.split(".")[0],
                                content: content,
                            })
                        }

                        reader.onerror = (e) => {
                            alert("Error: " + e.target?.error)
                        }
                    }
                }}
                style={{ visibility: "hidden", display: "none" }}
                type="file"
                accept="text/plain"
            />
        </>
    )
}
