import { useRef } from "react"
import type { AppearanceStyle, File } from "../types"
import { formatDayMonth, formatDate } from "../utils/dates"

type FilePreviewProps = {
    file: File
    openFile: () => void
    toggleSelection: () => void
    easySelection: boolean
    appearanceStyle: AppearanceStyle
}

function clampLines(content: string, maximumLines: number) {
    const lines = content.split("\n")

    return (lines.length <= maximumLines ? lines : lines.slice(0, maximumLines - 1).concat(". . .")).join("\n")
}

function clampLength(content: string, maximumLength: number) {
    return content.length <= maximumLength ? content : content.substring(0, maximumLength - 4).concat(" ...")
}

export function FilePreview({ file, openFile, toggleSelection, easySelection, appearanceStyle }: FilePreviewProps) {
    const longPressSuccess = useRef<boolean>(false)
    const longPressCancel = useRef<boolean>(true)
    const longPressTimeout = useRef<number | undefined>(undefined)

    return (
        <div
            className="file"
            onMouseDown={() => {
                if (easySelection) {
                    return
                }

                longPressSuccess.current = false
                longPressCancel.current = false

                clearTimeout(longPressTimeout.current)
                longPressTimeout.current = undefined

                longPressTimeout.current = setTimeout(() => {
                    longPressSuccess.current = true

                    longPressTimeout.current = setTimeout(() => {
                        if (!longPressCancel.current) {
                            toggleSelection()
                        }
                    }, 200)
                }, 400)
            }}
            onMouseUp={() => {
                if (easySelection && longPressCancel.current) {
                    toggleSelection()
                } else if (longPressSuccess.current && longPressCancel.current) {
                    toggleSelection()
                } else if (!easySelection) {
                    openFile()
                }

                longPressCancel.current = true
            }}
        >
            <div className="preview">
                <pre>{clampLines(file.content, appearanceStyle.previewLinesClamp)}</pre>
            </div>
            <div className="name">
                <span>{clampLength(file.name || `Text Note ${formatDayMonth(new Date(file.createdAt))}`, appearanceStyle.nameClamp)}</span>
            </div>
            <div className="date">
                <span>{formatDate(new Date(file.createdAt))}</span>
                {file.favourite && (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                    </svg>
                )}
            </div>
            <div className="selection">
                {file.selected && (
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                    </svg>
                )}
            </div>
        </div>
    )
}
