import { Dispatch, SetStateAction } from "react"
import type { File, SaveFile } from "../types"
import { SearchQueue } from "../hooks/useSearchHistory"
import { SearchHistory } from "./SearchHistory"
import { Files } from "./Files"

type FeedProps = {
    searchMode: boolean
    selectionMode: boolean
    searchQueue: string
    files: File[]
    styleIndex: number
    searchHistory: SearchQueue[]
    setCurrentFile: (f: SaveFile) => void
    setAllSelected: (b: boolean) => void
    toggleSelection: (file: File) => void
    removeFromSearchHistory: (id: string) => void
    setEditorOpen: Dispatch<SetStateAction<boolean>>
    setSelectionMode: Dispatch<SetStateAction<boolean>>
    setSearchQueue: Dispatch<SetStateAction<string>>
}
export function Feed({
    files,
    styleIndex,
    searchMode,
    searchQueue,
    selectionMode,
    searchHistory,
    setEditorOpen,
    setCurrentFile,
    setSearchQueue,
    setAllSelected,
    toggleSelection,
    setSelectionMode,
    removeFromSearchHistory,
}: FeedProps) {
    return !searchMode || (searchMode && searchQueue.length !== 0) ? (
        <Files
            files={files}
            searchMode={searchMode}
            styleIndex={styleIndex}
            selectionMode={selectionMode}
            setEditorOpen={setEditorOpen}
            setCurrentFile={setCurrentFile}
            setAllSelected={setAllSelected}
            toggleSelection={toggleSelection}
            setSelectionMode={setSelectionMode}
        />
    ) : (
        <SearchHistory searchHistory={searchHistory} setSearchQueue={setSearchQueue} removeFromSearchHistory={removeFromSearchHistory} />
    )
}
