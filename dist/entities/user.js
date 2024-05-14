class User {
    constructor(id, name, password, createdAt) {
        this.id = id;
        this.name = name;
        this.password = password;
        this.createdAt = createdAt;
    }
    getId() {
        return this.id;
    }
    getName() {
        return this.name;
    }
    getPassword() {
        return this.password;
    }
    getCreatedAt() {
        return this.createdAt;
    }
    setName(name) {
        this.name = name;
    }
    setPassword(password) {
        this.password = password;
    }
    setCreatedAt(createdAt) {
        this.createdAt = createdAt;
    }
}
//# sourceMappingURL=user.js.map