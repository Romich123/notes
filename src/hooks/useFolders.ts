import { useEffect, useState } from "react"
import type { File, Folder } from "../types"
import { v4 as uuidv4 } from "uuid"

const initialFolders: { [key: string]: Folder } = JSON.parse(localStorage.getItem("folders") ?? "{}")

const initialFilesCounts: { [key: string]: number } = {}

Object.values(initialFolders).forEach((folder) => {
    initialFilesCounts[folder.id] = 0
})

export function useFolders(files: File[]) {
    const [foldersRef, setFoldersRef] = useState<{ value: { [key: string]: Folder } }>({ value: initialFolders })

    const [filesCounts, setFilesCounts] = useState<{ [key: string]: number }>(initialFilesCounts)

    useEffect(() => {
        const newfilesCounts: { [key: string]: number } = {}

        for (const folder of Object.values(foldersRef.value)) {
            newfilesCounts[folder.id] = 0
        }

        newfilesCounts["undefined"] = 0

        for (const file of files) {
            newfilesCounts[file.folderId + ""]++
        }

        setFilesCounts(newfilesCounts)
    }, [files, foldersRef])

    function addFolder(folderName: string, color?: string) {
        const id = uuidv4()

        const folder = {
            name: folderName,
            id,
            color,
            filesCount: 0,
        }

        foldersRef.value[id] = folder

        setFoldersRef({
            value: foldersRef.value,
        })

        localStorage.setItem("folders", JSON.stringify(foldersRef.value))
    }

    function removeFolder(id: string) {
        files.forEach((file) => {
            if (file.folderId === id) {
                file.folderId = undefined
            }
        })

        delete foldersRef.value[id]

        setFoldersRef({
            value: foldersRef.value,
        })

        localStorage.setItem("folders", JSON.stringify(foldersRef.value))
    }

    return { folders: foldersRef.value, filesCounts, addFolder, removeFolder }
}
