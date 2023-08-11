import { useEffect, useState } from "react"
import { v4 as uuidv4 } from "uuid"

export type SearchQueue = {
    queue: string
    date: string
    id: string
}

export default function useSearchHistory() {
    const [searchHistory, setSearchHistory] = useState<SearchQueue[]>([])

    useEffect(() => {
        setSearchHistory(JSON.parse(localStorage.getItem("searchHistory") || "[]"))
    }, [])

    function addToSearchHistory(queue: string) {
        if (searchHistory.some((q) => q.queue === queue)) {
            return
        }

        const newHistory = [
            ...searchHistory,
            {
                queue,
                date: new Date().toISOString(),
                id: uuidv4(),
            },
        ]

        setSearchHistory(newHistory)
        localStorage.setItem("searchHistory", JSON.stringify(newHistory))
    }

    function removeFromSearchHistory(id: string) {
        const newHistory = searchHistory.filter((que) => (que.id === id ? false : true))

        setSearchHistory(newHistory)
        localStorage.setItem("searchHistory", JSON.stringify(newHistory))
    }

    return { searchHistory, addToSearchHistory, removeFromSearchHistory }
}
