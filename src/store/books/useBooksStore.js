import { defineStore } from 'pinia';
import Storage from '../../utils/storage'
import data from '../../utils/data'

export const useBooksStore = defineStore('books', {
  state: () => ({
    books: Storage.getItem('books') || data,
    bookInputs: { title: '', author: '', year: '', genre: '' },
    searchInput: '',
  }),
  getters: {},
  actions: {
    setBookInputs(book) {
      this.bookInputs = { ...book, year: String(book.year) };
    },
    handleChangeInput(data) {
      this.bookInputs[data.name] = data.value;
    },
    clearBookInputsField() {
      this.bookInputs = { title: '', author: '', year: '', genre: '' };
    },
    addBook(newBook) {
      this.books.push(newBook);
      Storage.setItem('books', this.books);
    },
    updateBook(updateBook) {
      this.books = this.books.map((book) => (book.id == updateBook.id ? updateBook : book));
      Storage.setItem('books', this.books);
    },
    removeBook(bookId) {
      this.books = this.books.filter((book) => book.id != bookId);
      Storage.setItem('books', this.books);
    },
    handleSearchInput(value) {
      this.searchInput = value;
    },
    clearSearchInput() {
      this.searchInput = ""
    }
  },
});