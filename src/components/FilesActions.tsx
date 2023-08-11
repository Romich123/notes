import { Dispatch, SetStateAction, useState } from "react"
import { SortingType } from "../types"

type FilesActionsProps = {
    selectionMode: boolean
    setSelectedAll: (b: boolean) => void
    allSelected: boolean
    setAllSelected: Dispatch<SetStateAction<boolean>>
    setSelectionMode: Dispatch<SetStateAction<boolean>>
    sortingTypes: SortingType[]
    sortingTypeIndex: number
    setSortingTypeIndex: Dispatch<SetStateAction<number>>
    inverseSorting: boolean
    setInverseSorting: Dispatch<SetStateAction<boolean>>
}

export function FilesActions({
    inverseSorting,
    setInverseSorting,
    sortingTypeIndex,
    setSortingTypeIndex,
    selectionMode,
    setSelectedAll,
    allSelected,
    setAllSelected,
    setSelectionMode,
    sortingTypes,
}: FilesActionsProps) {
    const [sortTypeSelection, setSortTypeSelection] = useState<boolean>(false)

    return (
        <div className="files-actions">
            <div className={"selection-actions" + (selectionMode ? " visible" : "")}>
                <div
                    className="select-all"
                    onClick={() => {
                        setSelectedAll(!allSelected)
                        setAllSelected((prev) => !prev)
                    }}
                >
                    {allSelected ? (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                        </svg>
                    )}
                    <span>All</span>
                </div>
                <div
                    className="cancel-selection"
                    onClick={() => {
                        setSelectedAll(false)
                        setSelectionMode(false)
                    }}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
                    </svg>
                </div>
            </div>
            <div className="sort-settings">
                <button
                    className="sort-type"
                    onMouseDown={() => {
                        sortTypeSelection || setSortTypeSelection(true)
                    }}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M3.5 2.5a.5.5 0 0 0-1 0v8.793l-1.146-1.147a.5.5 0 0 0-.708.708l2 1.999.007.007a.497.497 0 0 0 .7-.006l2-2a.5.5 0 0 0-.707-.708L3.5 11.293V2.5zm3.5 1a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zM7.5 6a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5zm0 3a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1h-3zm0 3a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1h-1z" />
                    </svg>
                    <div>{sortingTypes[sortingTypeIndex].name}</div>
                </button>
                <div className="separator"></div>
                <button className={"sort-order" + (inverseSorting ? " inverted" : "")} onClick={() => setInverseSorting((prev) => !prev)}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1z" />
                    </svg>
                </button>
                {sortTypeSelection && (
                    <div className="sort-type-selection-wrapper" onClick={(e) => (e.currentTarget == e.target ? setSortTypeSelection(false) : null)}>
                        <div className="sort-type-selection">
                            {sortingTypes.map((sortT, i) => (
                                <button className={"sort-type-option" + (sortingTypeIndex === i ? " selected" : "")} key={i} onClick={() => setSortingTypeIndex(i)}>
                                    {sortT.name}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
