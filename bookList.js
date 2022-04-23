// Selecting my form elements

const nameField = document.querySelector('#nameField'),
    authorField = document.querySelector('#authorField'),
    isbnField = document.querySelector('#isbnField'),
    submitBtn = document.querySelector('#submitButton'),
    deleteField = document.querySelector('#deleteField'),
    deleteBtn = document.querySelector('#delete'),
    cardSelect = document.querySelector('.card');

submitBtn.addEventListener('click', createBook);
deleteBtn.addEventListener('click', deleteBook);
deleteField.addEventListener('click', clearField);
window.addEventListener('resize', pageDimensions);

// Selecting my collection elements

const collectionTitles = document.querySelector('#collectionTitles'),
    collectionAuthors = document.querySelector('#collectionAuthors'),
    collectionISBN = document.querySelector('#collectionISBN');

// Making an array to hold the collection of books

let bookCollection = [];

// Making an array of the fields to automate over
let inputFields = [nameField, authorField, isbnField]

class Book {
    constructor(name, author, isbn){
        this.name = name;
        this.author = author;
        this.isbn = isbn;
    }
}

function clearField(e){
    this.value = ''
}

function createBook(e){
    e.preventDefault();

    name = nameField.value;
    author = authorField.value;
    isbn = isbnField.value;

    console.log(name);
    console.log(typeof(author));
    console.log(isbn);

    console.log(author === '');

    if(isbn === '' || author === '' || name === ''){
        console.log('Check input fields.')
    } else {
        let someBook = new Book(name, author, isbn);

        inputFields.forEach(field => field.value = '');
    
        saveData(someBook);
        displayBook(someBook);  
    }

}

function displayBook(book){
    
    // title display

    const listTitle = document.createElement('li');
    const titleText = document.createTextNode(book.name);
    listTitle.appendChild(titleText);

    titleList = document.querySelector('#titleList');
    titleList.appendChild(listTitle);

    // Author display

    const listAuthor = document.createElement('li');
    const authorText = document.createTextNode(book.author);
    listAuthor.appendChild(authorText);
    
    authorList = document.querySelector('#authorList');
    authorList.appendChild(listAuthor);

    // isbn Display

    const isbn = document.createElement('li');
    const isbnText = document.createTextNode(book.isbn);
    isbn.appendChild(isbnText);

    isbnList = document.querySelector('#isbnList');
    isbnList.appendChild(isbn);
}

function saveData(someBook){
    title = someBook.name;
    author = someBook.author;
    isbn = someBook.isbn;

    forStorage = `${title},${author},${isbn}`;

    localStorage.setItem(title, forStorage);
}

function getData(){
    
    bookArray = Object.values(localStorage);

    bookArray.forEach((book) => {
        parsedBook = book.split(',');
        if(parsedBook[0] === undefined || parsedBook[1] === undefined|| parsedBook[2] === undefined){
    
        } else {
            newBook = new Book(parsedBook[0], parsedBook[1], parsedBook[2]);
        displayBook(newBook);
        }
    })
}

function deleteBook(e){
    e.preventDefault();
    bookTitle = deleteField.value;
    console.log(bookTitle);
    localStorage.removeItem(bookTitle);
    location.reload();
}

function pageDimensions(e){

    width = document.documentElement.clientWidth
    height = document.documentElement.clientHeight

    cardWidth = cardSelect.offsetWidth
    remaining = width - cardWidth
    margin = remaining/2;
    console.log(margin);
    cardSelect.style.marginLeft = `${margin}px`
    cardSelect.style.marginRight = `${margin}px`;

}

getData();
pageDimensions();
