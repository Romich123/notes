export type File = SaveFile & {
    selected: boolean
}

export type SaveFile = {
    name: string
    content: string
    id: string
    createdAt: string
    changedAt?: string
    favourite?: boolean
    folderId?: string
}

export type PreFile = Partial<SaveFile> & {
    name: string
    content: string
}

export type Folder = {
    name: string
    id: string
    color?: string
}

export type SortingType = {
    name: string
    compare: (a: File, b: File) => number
}

export type AppearanceStyle = {
    name: string
    className: string
    previewLinesClamp: number
    nameClamp: number
}
