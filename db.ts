import { Database } from 'bun:sqlite';

export interface Book {
  id?: number;
  name: string;
  author: string;
}

export class BooksDatabase {
  private db: Database;

  constructor() {
    this.db = new Database('books.db');
    // Initialize the Database
    this.init()
        .then(() => console.log('Database initialized'))
        .catch(console.error);
  }

  // get all the books
  async getBooks() {
    return this.db.query('SELECT * FROM books').all();
  }

  // Add a book
  async addBook(book: Book) {
    // q: Get id type safely
    return this.db.qquery(`INSERT INTO books (name, author) VALUES (?,?) RETURNING id`).get(book.name, book.author) as Book;
  }

  //delete a book
  async deleteBook(id: number) {
    return this.db.run(`DELETE FROM books WHERE id = ${id}`)
  }

  // initialize the Database
  async init() {
    return this.db.run('CREATE TABLE IF NOT EXISTS books (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, author TEXT');
  }
}
