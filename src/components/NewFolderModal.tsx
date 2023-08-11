import { useRef, useState } from "react"

type NewFolderModalProps = {
    open: boolean
    hide: () => void
    addFolder: (name: string, color?: string) => void
}
export function NewFolderModal({ open, hide, addFolder }: NewFolderModalProps) {
    const [currentColor, setCurrentColor] = useState<string>("red")
    const nameInputRef = useRef<HTMLInputElement>(null)

    function create() {
        addFolder(nameInputRef.current?.value || "New Folder", currentColor)

        hide()
    }

    return (
        <div className={"new-folder-background" + (open ? " open" : "")} onClick={(e) => (e.currentTarget == e.target ? hide() : null)}>
            <div className="new-folder-modal">
                <input ref={nameInputRef} className="folder-name-input" placeholder="Folder's name" autoFocus />
                <div className="color-selection">
                    <header>Color</header>
                    <div className="options">
                        {["red", "green", "blue", "yellow", "purple", "white", "aqua", "brown", "lightgreen", "crimson", "AliceBlue", "darkorange"].map((color) => (
                            <button key={color} className={currentColor === color ? "selected" : ""} style={{ backgroundColor: color }} onClick={() => setCurrentColor(color)}></button>
                        ))}
                    </div>
                </div>
                <button onClick={create}>Create</button>
            </div>
        </div>
    )
}
