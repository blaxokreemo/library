const myLibrary = [];

function Book(title, author, pages, read) {
    // the constructor
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}


function addBookToLibrary(book) {
    // do stuff here
    myLibrary.push(book);
}