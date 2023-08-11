import type { AppearanceStyle } from "./types"

export const styles: AppearanceStyle[] = [
    {
        name: "Grid (small)",
        className: "grid small",
        previewLinesClamp: Infinity,
        nameClamp: 35,
    },
    {
        name: "Grid (medium)",
        className: "grid medium",
        previewLinesClamp: Infinity,
        nameClamp: 40,
    },
    {
        name: "Grid (big)",
        className: "grid big",
        previewLinesClamp: Infinity,
        nameClamp: 45,
    },
    {
        name: "List",
        className: "list",
        previewLinesClamp: 6,
        nameClamp: Infinity,
    },
    {
        name: "List (compact)",
        className: "list compact",
        previewLinesClamp: 10,
        nameClamp: Infinity,
    },
]
