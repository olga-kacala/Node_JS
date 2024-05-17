const Book = require('./Book');
const User = require('./User');

// Cart Class to simulate a shopping cart
class Cart {
    constructor(user) {
        this.user = user;
        this.books = [];
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

    // Method to add a book to the cart
    addBook(book) {
        if (book.isAvailable()) {
            this.books.push(book);
            console.log(`${book.getTitle()} has been added to the cart.`);
        } else {
            console.log(`${book.getTitle()} is not available.`);
        }
    }

    // Method to remove a book from the cart
    removeBook(isbn) {
        this.books = this.books.filter(book => book.getIsbn() !== isbn);
        console.log(`Book with ISBN ${isbn} has been removed from the cart.`);
    }

    // Method to calculate the total price of the books in the cart
    calculateTotal() {
        return this.books.reduce((total, book) => total + book.getPrice(), 0);
    }
}

module.exports = Cart;
