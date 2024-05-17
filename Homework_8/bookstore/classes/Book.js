// Book Class to represent individual books
class Book {
    constructor(title, author, isbn, price, availability) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
        this.price = price;
        this.availability = availability; // true if the book is available, false otherwise
    }

    // Getters and Setters
    getTitle() {
        return this.title;
    }

    setTitle(value) {
        this.title = value;
    }

    getAuthor() {
        return this.author;
    }

    setAuthor(value) {
        this.author = value;
    }

    getIsbn() {
        return this.isbn;
    }

    setIsbn(value) {
        this.isbn = value;
    }

    getPrice() {
        return this.price;
    }

    setPrice(value) {
        this.price = value;
    }

    getAvailability() {
        return this.availability;
    }

    setAvailability(value) {
        this.availability = value;
    }

    // Method to check if the book is available
    isAvailable() {
        return this.availability;
    }

    // Method to update availability
    setAvailabilityStatus(status) {
        this.availability = status;
    }
}

module.exports = Book;
