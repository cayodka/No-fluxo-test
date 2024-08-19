class LocalDatabaseManager {
    constructor() {
        this.idCounter = 0;
    }
    createDatabase(databaseName, data, dataType) {
        if (typeof databaseName != "string") {
            throw Error("DatabaseName must be of type string")
        }
        const canCreate = !this.databaseExists(databaseName);
        if (!canCreate) {
            throw Error("Database " + databaseName + " already exists.")
        }
        dataType === "json" && localStorage.setItem(databaseName, JSON.stringify(data))
        dataType === undefined && localStorage.setItem(databaseName, data)
        //did this because I was lazy and didn't want to find a better way to do it
        if (this.idCounter === 0) {
            Object.keys(data).forEach((item, index) => this.idCounter = index)
        } else {
            Object.keys(data).forEach((item, index) => this.idCounter++)
        }
    }
    updateDatabase(databaseName, data, dataType) {
        if (typeof databaseName != "string") {
            throw Error("DatabaseName must be of type string")
        }
        const canUpdate = this.databaseExists(databaseName);
        if (!canUpdate) {
            throw Error("Database " + databaseName + " doesn't  exist, therefore it can't be updated.")
        }
        dataType === "json" && localStorage.setItem(databaseName, JSON.stringify(data))
        dataType === undefined && localStorage.setItem(databaseName, data)
        //did this because I was lazy and didn't want to find a better way to do it
        Object.keys(data).forEach((patient, index) => this.idCounter = index)
    }
    #getDatabase(databaseName) {
        if (typeof databaseName != "string") {
            throw Error("DatabaseName must be of type string")
        }
        const database =
            JSON.parse(localStorage.getItem(databaseName)) || {};
        return database;
    }
    databaseExists(databaseName) {
        const trueOrFalse = Object.keys(this.#getDatabase(databaseName)).length > 0;
        return trueOrFalse;
    }
    #dataExists(databaseName, id) {
        if (typeof databaseName !== "string") {
            throw Error("DatabaseName must be of string type!")
        }
        if (typeof id !== "number") {
            throw Error("Id must be of number type!")
        }
        const database = this.#getDatabase(databaseName);
        return database[id] !== undefined;
    }
    insertOnDatabase(databaseName, data) {
        if (typeof databaseName !== "string") {
            throw Error("DatabaseName must be of string type!")
        }
        if (typeof data !== "object" || Array.isArray(data) || typeof data === 'function') {
            throw new Error("Data must be an object and not an array or a function");
        }
        if (!this.databaseExists(databaseName)) {
            throw Error("Tried updating a database that doesn't exist.")
        }
        const database = this.#getDatabase(databaseName);
        const canCreate = !this.#dataExists(databaseName, this.idCounter);
        if (!canCreate) {
            throw Error(`Couldn't create item "${this.idCounter}" because it already exists in "${databaseName}".`);
        }
        data.id = this.idCounter;
        database[this.idCounter] = data;
        this.createDatabase(databaseName, JSON.stringify(database))
        this.idCounter++;
    }
    readById(databaseName, id) {
        if (typeof databaseName !== "string") {
            throw Error("DatabaseName must be of string type!")
        }
        if (typeof id !== "number") {
            throw Error("Id must be of number type!")
        }
        const database = this.#getDatabase(databaseName);

        return database[id];
    }
    readAll(databaseName) {
        if (typeof databaseName !== "string") {
            throw Error("DatabaseName must be of string type!")
        }
        const database = this.#getDatabase(databaseName);

        return database;
    }
    updateById(databaseName, data, id) {
        if (typeof databaseName !== "string") {
            throw Error("DatabaseName must be of string type!")
        }
        if (typeof data !== "object" || Array.isArray(data) || typeof data === 'function') {
            throw new Error("Data must be an object and not an array or a function");
        }
        if (typeof id !== "number") {
            throw Error("Id must be of number type!")
        }
        const database = this.#getDatabase(databaseName);
        const cantUpdate = this.#dataExists(databaseName, id);
        if (cantUpdate) {
            throw Error(`Couldn't update item ${data.id} because it doesn't exist in "${databaseName}".`);
        }
        database[id] = data;
        localStorage.setItem(databaseName, JSON.stringify(database));
    }
    delete(databaseName, id) {
        if (typeof databaseName !== "string") {
            throw Error("DatabaseName must be of string type!")
        }
        if (typeof id !== "number") {
            throw Error("Id must be of number type!")
        }
        const database = this.#getDatabase(databaseName);
        delete database[id];
    }
}
export default LocalDatabaseManager;