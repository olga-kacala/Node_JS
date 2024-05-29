const Book = require('./Book');

/**
 * Represents a fiction book, which is a subtype of Book.
 */
class FictionBook extends Book {

    constructor(title, author, ISBN, price, availability, genre) {
        super(title, author, ISBN, price, availability);
        this.genre = genre;
    }

    // Getters and Setters
    getGenre() {
        return this.genre;
    }

    setGenre(value) {
        this.genre = value;
    }
}

module.exports = FictionBook;
