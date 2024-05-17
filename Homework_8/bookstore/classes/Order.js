const User = require('./User');
const Book = require('./Book');

// Order Class to represent a user's order
class Order {
    constructor(user, books) {
        this.user = user;
        this.books = books;
        this.totalPrice = this.calculateTotal();
    }

    // Getters and Setters
    getUser() {
        return this.user;
    }

    setUser(value) {
        this.user = value;
    }

    getBooks() {
        return this.books;
    }

    getTotalPrice() {
        return this.totalPrice;
    }

    // Method to calculate the total price of the order
    calculateTotal() {
        return this.books.reduce((total, book) => total + book.getPrice(), 0);
    }
}

module.exports = Order;
