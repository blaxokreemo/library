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


const form = document.getElementById('new-book-form');
const library = document.getElementById('library');

form.addEventListener('submit', function (event) {

    event.preventDefault();

    let title = form.elements['title'].value
    let author = form.elements['author'].value;
    let pages = form.elements['pages'].value;
    let read = form.elements['read'].value;

    const newBook = new Book(title, author, pages, read);
    addBookToLibrary(newBook);

    form.elements['title'].value = '';
    form.elements['author'].value = '';
    form.elements['pages'].value = '';

    populateBooks();

})

function newBookTest(title, author, pages, read) {
    const newBook = new Book(title, author, pages, read);
    addBookToLibrary(newBook);
    console.log(myLibrary);
}

function createBookCard(bookObject, indexNumber) {

    let newBookCard = document.createElement('div');
    newBookCard.classList.add('book');
    
    let titleHeader = document.createElement('h3');
    titleHeader.classList.add('title-header');
    titleHeader.textContent = bookObject['title'];

    let authorHeader = document.createElement('h3');
    authorHeader.classList.add('author-header');
    authorHeader.textContent = `by ${bookObject['author']}`;

    let pagesHeader = document.createElement('h4');
    pagesHeader.classList.add('pages-header');
    pagesHeader.textContent = `${bookObject['pages']} pages`;

    let readHeader = document.createElement('h4');
    readHeader.classList.add('read-header');
    readHeader.textContent = bookObject['read'];

    let removeButton = document.createElement('button');
    removeButton.classList.add('remove-button', 'btn');
    removeButton.setAttribute('type', 'button');
    removeButton.setAttribute('data-index', `${indexNumber}`);
    removeButton.textContent = 'Remove Book';

    newBookCard.appendChild(titleHeader);
    newBookCard.appendChild(authorHeader);
    newBookCard.appendChild(pagesHeader);
    newBookCard.appendChild(readHeader);
    newBookCard.appendChild(removeButton);
    
    library.appendChild(newBookCard);
}

function populateBooks() {
    let bookCards = library.querySelectorAll('.book');
    bookCards.forEach((card) => {
        library.removeChild(card);
    })

    myLibrary.forEach((book, index) => {
        createBookCard(book, index);
    })

    let removeButtons = library.querySelectorAll('.remove-button');

    removeButtons.forEach((button) => {
        button.addEventListener('click', removeBook)
    })
}

function removeBook(e) {
    let index = e.target.getAttribute('data-index');
    myLibrary.splice(index, 1);
    populateBooks();
}