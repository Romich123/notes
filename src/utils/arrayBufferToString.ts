export function arrayBufferToString(buffer: ArrayBuffer) {
    const decoder = new TextDecoder("utf-8")

    return decoder.decode(new Uint8Array(buffer))
}
