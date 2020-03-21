export const Empt2Undefined = str => {
    if (!str || str.trim() === '') {
        return undefined
    }
    return str
}