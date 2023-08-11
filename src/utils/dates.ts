import { leadingZeros } from "./leadingZeros"

export const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"] as const

export function sameDay(dateA: Date, dateB: Date) {
    return dateA.getFullYear() === dateB.getFullYear() && dateA.getMonth() === dateB.getMonth() && dateA.getDate() === dateB.getDate()
}

export function formatDate(date: Date) {
    const now = new Date()

    if (sameDay(now, date)) {
        return `${date.getHours()}:${leadingZeros(date.getMinutes(), 2)}`
    }

    if (date.getFullYear() === now.getFullYear()) {
        return `${date.getDate()} ${formatMonth(date.getMonth())}`
    }

    return `${date.getDate()} ${formatMonth(date.getMonth())} ${date.getFullYear()}`
}

export function formatDayMonth(date: Date) {
    return `${leadingZeros(date.getDate(), 2)}.${leadingZeros(date.getMonth() + 1, 2)}`
}

export function formatMonth(month: number) {
    let monthString: string = monthNames[month]

    /*
    if (monthString.length > 4) {
        monthString = monthString.substring(0, 3) + "."
    }
    */

    return monthString
}
