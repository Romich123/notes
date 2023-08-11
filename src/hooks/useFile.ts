import { useState } from "react"
import type { SaveFile } from "../types"
import { v4 as uuidv4 } from "uuid"

export default function useFile() {
    const [fileRef, setFileRef] = useState<{ value: SaveFile }>({
        value: { name: "", content: "", id: uuidv4(), createdAt: new Date().toISOString() },
    })

    function setFile(file: SaveFile) {
        setFileRef({ value: file })
    }

    function setFileName(name: string) {
        fileRef.value.name = name

        setFileRef({
            value: fileRef.value,
        })
    }

    function setFileContent(content: string) {
        fileRef.value.content = content

        setFileRef({
            value: fileRef.value,
        })
    }

    return [fileRef.value, setFile, setFileName, setFileContent] as const
}
