export const createUUID = () => Number(new Date().getTime().toString() + ~~(Math.random() * 1000).toString())
export const now = () => new Date().getTime()
