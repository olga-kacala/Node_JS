class Book {
  constructor(title, author, ISBN, price, availability) {
    this.title = title;
    this.author = author;
    this.ISBN = ISBN;
    this.price = price;
    this.availability = availability;
  }
}

class User {
  constructor(name, email, ID) {
    this.name = name;
    this.email = email;
    this.ID = ID;
  }
}

class Cart {
  constructor(user) {
    this.user = user;
    this.books = [];
  }

  addBook(book) {
    if (book.availability > 0) {
      this.books.push(book);
      book.availability--;
      console.log(`${book.title} was added to your cart`);
    } else {
      console.log(`${book.title} is out of stock`);
    }
  }

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

class Order {
  constructor(user, cart) {
    this.user = user;
    this.cart = cart;
  }

  userOrder() {
    const userTotalPrice = this.cart.totalPrice(false);
    const list = this.cart.books.map((book) => book.title).join(", ");
    console.log(
      `${this.user.name} email: ${this.user.email}, ID: ${this.user.ID}`
    );
    console.log(`${this.user.name} in card total price: ${userTotalPrice}`);
    console.log(`${this.user.name} ordered books: ${list}`);
  }
}

// Instantiate objects and simulate bookstore interactions
const user1 = new User("John Doe", "john@example.com", 1);
const user2 = new User("Jane Smith", "jane@example.com", 2);

const book1 = new Book(
  "The Great Gatsby",
  "F. Scott Fitzgerald",
  "9780743273565",
  10,
  5
);
const book2 = new Book(
  "To Kill a Mockingbird",
  "Harper Lee",
  "9780061120084",
  12,
  3
);

const cart1 = new Cart(user1);
const cart2 = new Cart(user2);

cart1.addBook(book1);
cart1.addBook(book2);
cart1.removeBook(book1);
cart1.totalPrice();

const order1 = new Order(user1, cart1);
order1.userOrder();
