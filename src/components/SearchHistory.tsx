import { Dispatch, SetStateAction } from "react"
import { SearchQueue } from "../hooks/useSearchHistory"

type SearchHistoryProps = {
    searchHistory: SearchQueue[]
    setSearchQueue: Dispatch<SetStateAction<string>>
    removeFromSearchHistory: (str: string) => void
}
export function SearchHistory({ searchHistory, setSearchQueue, removeFromSearchHistory }: SearchHistoryProps) {
    return (
        <>
            {searchHistory.length > 0 ? (
                <>
                    <div className="prev-searches">Previous searches:</div>
                    <div className="search-history">
                        {searchHistory.map((queue) => (
                            <div className="search-queue" key={queue.id} onClick={(e) => (e.currentTarget == e.target ? setSearchQueue(queue.queue) : null)}>
                                <span>{queue.queue}</span>
                                <button
                                    className="remove-button"
                                    onClick={() => {
                                        removeFromSearchHistory(queue.id)
                                    }}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                                        <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
                                    </svg>
                                </button>
                            </div>
                        ))}
                    </div>
                </>
            ) : (
                <div className="empty-files">
                    <div className="sub">No previous searches</div>
                </div>
            )}
        </>
    )
}
