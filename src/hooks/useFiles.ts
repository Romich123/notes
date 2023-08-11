import { useEffect, useState } from "react"
import type { SaveFile, File, PreFile } from "../types"
import { v4 as uuidv4 } from "uuid"

function toFullFile(pre: PreFile | SaveFile): File {
    return {
        id: uuidv4(),
        createdAt: new Date().toISOString(),
        selected: false,
        ...pre,
    }
}

export default function useFiles() {
    const [filesRef, setFilesRef] = useState<{ value: File[] }>({ value: (JSON.parse(localStorage.getItem("files") || "[]") as SaveFile[]).map((file) => ({ ...file, selected: false })) })

    useEffect(() => {
        saveFiles()
    }, [filesRef])

    function addFile(file: File) {
        filesRef.value.push(file)

        setFilesRef({
            value: filesRef.value,
        })
    }

    function saveFiles() {
        localStorage.setItem("files", JSON.stringify(filesRef.value))
    }

    function deleteFile(id: string) {
        setFilesRef((prev) => ({
            value: prev.value.filter((file: SaveFile) => file.id !== id),
        }))

        saveFiles()
    }

    function saveFile(f: File | SaveFile | PreFile) {
        const file = toFullFile(f)

        if (filesRef.value.some((f) => f.id === file.id)) {
            file.changedAt = new Date().toISOString()
            filesRef.value = filesRef.value.map((f) => (f.id === file.id ? file : f))
        } else {
            filesRef.value.push(file)
        }

        setFilesRef({
            value: filesRef.value,
        })

        saveFiles()
    }

    function setFiles(files: File[]) {
        setFilesRef({
            value: files.sort((a, b) => {
                return +new Date(b.createdAt) - +new Date(a.createdAt)
            }),
        })

        saveFiles()
    }

    function setSelected(file: File) {
        setFilesRef((prev) => ({
            value: prev.value.map((f) => (f.id === file.id ? { ...file, selected: true } : f)),
        }))
    }

    function setUnselected(file: File) {
        setFilesRef((prev) => ({
            value: prev.value.map((f) => (f.id === file.id ? { ...file, selected: false } : f)),
        }))
    }

    function toggleSelection(file: File) {
        setFilesRef((prev) => ({
            value: prev.value.map((f) => (f.id === file.id ? { ...file, selected: !file.selected } : f)),
        }))
    }

    function setFavourite(file: File) {
        setFilesRef((prev) => ({
            value: prev.value.map((f) => (f.id === file.id ? { ...file, favourite: true } : f)),
        }))

        saveFiles()
    }

    function unsetFavourite(file: File) {
        setFilesRef((prev) => ({
            value: prev.value.map((f) => (f.id === file.id ? { ...file, favourite: false } : f)),
        }))

        saveFiles()
    }

    function toggleFavourite(file: File) {
        setFilesRef((prev) => ({
            value: prev.value.map((f) => (f.id === file.id ? { ...file, favourite: !file.favourite } : f)),
        }))

        saveFiles()
    }

    function setSelectedAll(val: boolean) {
        setFilesRef({
            value: filesRef.value.map((file) => {
                file.selected = val
                return file
            }),
        })
    }

    function copyFile(file: File) {
        const copy = { ...file, createdAt: new Date().toISOString(), selected: false, id: uuidv4() }

        if (file.changedAt) {
            copy.changedAt = new Date().toISOString()
        }

        saveFile(copy)
    }

    return { files: filesRef.value, copyFile, addFile, deleteFile, saveFile, setFiles, saveFiles, setSelected, toggleSelection, setSelectedAll, setUnselected, setFavourite, unsetFavourite, toggleFavourite }
}
