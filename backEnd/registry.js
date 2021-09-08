class Registry{
    constructor() {
        this.users = new Map()
        this.projects = new Map()
        this.tasks = new Map()
    }
}

module.exports = new Registry()