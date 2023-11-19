export const fcnt = () => {

}

export function clearParamsObject(obj: Record<string, any>) {
    for (let prop in obj) {
        if (obj[prop] === null || obj[prop] === undefined || obj[prop] === '') {
            delete obj[prop];
        }
    }
    return obj
}