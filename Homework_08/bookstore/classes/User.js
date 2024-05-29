// User Class to represent users of the bookstore
class User {
    constructor(name, email, userId) {
        this.name = name;
        this.email = email;
        this.userId = userId;
    }

    // Getters and Setters
    getName() {
        return this.name;
    }

    setName(value) {
        this.name = value;
    }

    getEmail() {
        return this.email;
    }

    setEmail(value) {
        this.email = value;
    }

    getUserId() {
        return this.userId;
    }

    setUserId(value) {
        this.userId = value;
    }
}

module.exports = User;
