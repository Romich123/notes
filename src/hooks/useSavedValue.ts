import { useEffect, useState } from "react"

export function useSavedValue<T>(defaultValue: T, key: string) {
    const [value, setValue] = useState<T>(JSON.parse(localStorage.getItem(key) ?? JSON.stringify(defaultValue)))

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value))
    }, [value])

    return [value, setValue] as const
}
