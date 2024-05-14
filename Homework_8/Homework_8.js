/**
 * Represents a generic book.
 */
class Book {
  /**
   * Creates an instance of Book.
   * @param {string} title - The title of the book.
   * @param {string} author - The author of the book.
   * @param {string} ISBN - The ISBN of the book.
   * @param {number} price - The price of the book.
   * @param {number} availability - The availability of the book.
   */
  constructor(title, author, ISBN, price, availability) {
    this.title = title;
    this.author = author;
    this.ISBN = ISBN;
    this.price = price;
    this.availability = availability;
  }
}

/**
 * Represents a fiction book, which is a subtype of Book.
 */
class FictionBook extends Book {
  /**
   * Creates an instance of FictionBook.
   * @param {string} title - The title of the fiction book.
   * @param {string} author - The author of the fiction book.
   * @param {string} ISBN - The ISBN of the fiction book.
   * @param {number} price - The price of the fiction book.
   * @param {number} availability - The availability of the fiction book.
   * @param {string} genre - The genre of the fiction book.
   */
  constructor(title, author, ISBN, price, availability, genre) {
    super(title, author, ISBN, price, availability);
    this.genre = genre;
  }
}

/**
 * Represents a non-fiction book, which is a subtype of Book.
 */
class NonFictionBook extends Book {
  /**
   * Creates an instance of NonFictionBook.
   * @param {string} title - The title of the non-fiction book.
   * @param {string} author - The author of the non-fiction book.
   * @param {string} ISBN - The ISBN of the non-fiction book.
   * @param {number} price - The price of the non-fiction book.
   * @param {number} availability - The availability of the non-fiction book.
   * @param {string} genre - The genre of the non-fiction book.
   */
  constructor(title, author, ISBN, price, availability, genre) {
    super(title, author, ISBN, price, availability);
    this.genre = genre;
  }
}

/**
 * Represents a user of the bookstore.
 */
class User {
  /**
   * Creates an instance of User.
   * @param {string} name - The name of the user.
   * @param {string} email - The email of the user.
   * @param {number} ID - The unique ID of the user.
   */
  constructor(name, email, ID) {
    this.name = name;
    this.email = email;
    this.ID = ID;
  }
}

/**
 * Represents a shopping cart.
 */
class Cart {
  /**
   * Creates an instance of Cart.
   * @param {User} user - The user associated with the cart.
   */
  constructor(user) {
    this.user = user;
    this.books = [];
  }

  /**
   * Adds a book to the cart.
   * @param {Book} book - The book to be added to the cart.
   */
  addBook(book) {
    if (book.availability > 0) {
      this.books.push(book);
      book.availability--;
      console.log(`${book.title} was added to your cart`);
    } else {
      console.log(`${book.title} is out of stock`);
    }
  }

  /**
   * Removes a book from the cart.
   * @param {Book} book - The book to be removed from the cart.
   */
  removeBook(book) {
    const index = this.books.indexOf(book);
    if (index !== -1) {
      this.books.splice(index, 1);
      book.availability++;
      console.log(`${book.title} removed from cart`);
    } else {
      console.log(`${book.title} is not in the cart`);
    }
  }

  /**
   * Calculates the total price of all books in the cart.
   * @param {boolean} log - Whether to log the total price to the console.
   * @returns {number} - The total price of all books in the cart.
   */
  totalPrice(log = true) {
    let total = 0;
    this.books.forEach((element) => {
      total += element.price;
    });
    if (log) {
      console.log(`Total price: ${total}`);
    } else {
      return total;
    }
  }
}

/**
 * Represents an order placed by a user.
 */
class Order {
  /**
   * Creates an instance of Order.
   * @param {User} user - The user who placed the order.
   * @param {Cart} cart - The cart containing the books to be ordered.
   */
  constructor(user, cart) {
    this.user = user;
    this.cart = cart;
  }

  /**
   * Displays order details including user information, total price, and ordered books.
   */
  userOrder() {
    const userTotalPrice = this.cart.totalPrice(false);
    const bookAmount = this.cart.books.length;
    const list = this.cart.books.map((book) => book.title).join(", ");
    console.log(
      `${this.user.name} email: ${this.user.email}, ID: ${this.user.ID}`
    );
    console.log(`${this.user.name} in card total price: ${userTotalPrice}`);
    console.log(
      `${this.user.name} ordered ${bookAmount} ${
        bookAmount === 1 ? "book" : "books"
      }: ${bookAmount > 0 ? list : "none"}`
    );
  }
}
// Instantiate users
const user1 = new User("John Doe", "john@example.com", 1); // Creating user John Doe
const user2 = new User("Jane Smith", "jane@example.com", 2); // Creating user Jane Smith

// Instantiate books

// Creating a fiction book "The Great Gatsby"
const book1 = new FictionBook(
  "The Great Gatsby",
  "F. Scott Fitzgerald",
  "9780743273565",
  10,
  5,
  "Classic"
); 

// Creating a non-fiction book "To Kill a Mockingbird"
const book2 = new NonFictionBook(
  "To Kill a Mockingbird",
  "Harper Lee",
  "9780061120084",
  12,
  3,
  "History"
);

// Creating a generic book "I am boring"
const book3 = new Book("I am boring", "Anna May", "6680061120084", 1200, 3000); 

// User 1 interaction
const cart1 = new Cart(user1); // Creating a cart for user John Doe
cart1.addBook(book1); // Add "The Great Gatsby" to cart
cart1.addBook(book2); // Add "To Kill a Mockingbird" to cart
cart1.addBook(book3); // Add "I am boring" to cart

// User 2 interaction
const cart2 = new Cart(user2); // Creating a cart for user Jane Smith
cart2.addBook(book1); // Add "The Great Gatsby" to cart

// User 1 places an order
const order1 = new Order(user1, cart1); // Creating an order for user John Doe with the cart contents
order1.userOrder(); // Place order for User 1
//Changing the order by removing books
cart1.removeBook(book3); // Removed "I am boring" from cart
cart1.removeBook(book2); // Removed "To Kill a Mockingbird" from cart
cart1.removeBook(book1); // Removed "The Great Gatsby" from cart
order1.userOrder(); // Rendering order details

// User 2 places an order
const order2 = new Order(user2, cart2); // Creating an order for user Jane Smith with the cart contents
order2.userOrder(); // Place order for User 2
//Changing the order by adding a book
cart2.addBook(book3); // Add "I am boring" to cart
order2.userOrder(); // Rendering order details
