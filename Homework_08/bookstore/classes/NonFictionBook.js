const Book = require('./Book');

/**
 * Represents a non-fiction book, which is a subtype of Book.
 */
class NonFictionBook extends Book {
   
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

module.exports = NonFictionBook;
