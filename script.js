const myLibrary = [];

const form = document.getElementById('new-book-form');
const library = document.getElementById('library');

// ---------------FORM EVENT LISTENER---------------- //

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

// ----------LIBRARY CREATION AND DISPLAY-----------//

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

    let buttonsDiv = document.createElement('div');
    buttonsDiv.classList.add('.button-panel');

    let removeButton = document.createElement('button');
    removeButton.classList.add('remove-button', 'btn');
    removeButton.setAttribute('type', 'button');
    removeButton.setAttribute('data-index', `${indexNumber}`);
    removeButton.textContent = 'Remove Book';

    let readButton = document.createElement('button');
    readButton.classList.add('read-button', 'btn');
    readButton.setAttribute('type', 'button');
    readButton.setAttribute('data-index', `${indexNumber}`);
    if (bookObject['read'] == 'unread') {
        readButton.textContent = 'Change to Read';
    } else {
        readButton.textContent = 'Change to Unread';
    }

    newBookCard.appendChild(titleHeader);
    newBookCard.appendChild(authorHeader);
    newBookCard.appendChild(pagesHeader);
    newBookCard.appendChild(readHeader);
    newBookCard.appendChild(buttonsDiv);

        buttonsDiv.appendChild(removeButton);
        buttonsDiv.appendChild(readButton);
    
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

    let readButtons = library.querySelectorAll('.read-button');

    readButtons.forEach((button) => {
        button.addEventListener('click', toggleRead)
    })
}

// ------------_REMOVE BOOK ---------------- //

function removeBook(e) {
    let index = e.target.getAttribute('data-index');
    myLibrary.splice(index, 1);
    populateBooks();
}

// ------------ TOGGLE READ ----------------- //

function toggleRead (e) {
    let index = e.target.getAttribute('data-index');
    let currentBook = myLibrary[index];
    if (currentBook['read'] == 'read') {
        currentBook['read'] = 'unread';
    } else {
        currentBook['read'] = 'read';
    }

    populateBooks();
}