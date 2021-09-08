const createUUID = () => Number(new Date().getTime().toString() + ~~(Math.random() * 1000).toString())
const now = () => new Date().getTime()

module.exports ={createUUID: createUUID,now: now}