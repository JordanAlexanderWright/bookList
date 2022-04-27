// Selecting my form elements

const nameField = document.querySelector('#nameField'),
    bookForm = document.querySelector('#addBook'),
    authorField = document.querySelector('#authorField'),
    isbnField = document.querySelector('#isbnField'),
    submitBtn = document.querySelector('#submitButton'),
    deleteField = document.querySelector('#deleteField'),
    deleteBtns = document.querySelector('#delete'),
    cardSelect = document.querySelector('.card');

submitBtn.addEventListener('click', createBook);
window.addEventListener('resize', pageDimensions);

// Selecting my collection elements

const collectionTitles = document.querySelector('#collectionTitles'),
    collectionAuthors = document.querySelector('#collectionAuthors'),
    collectionISBN = document.querySelector('#collectionISBN'),
    deleteCollection = document.querySelector('#deleteBtns');

// Making an array to hold the collection of books

let bookCollection = [];

// Making an array of the fields to automate over
let inputFields = [nameField, authorField, isbnField];

class Book {
    constructor(name, author, isbn){
        this.name = name;
        this.author = author;
        this.isbn = isbn;
    }
}

function createBook(e){
    e.preventDefault();

    name = nameField.value;
    author = authorField.value;
    isbn = isbnField.value;

    if(isbn === '' || author === '' || name === ''){
    
        showAlert('error');

    } else {
        let someBook = new Book(name, author, isbn);

        inputFields.forEach(field => field.value = '');
    
        saveData(someBook);
        displayBook(someBook);  
        showAlert('success');
    }

}

function testFunc(e){
    console.log('hello');
    parentText = e.target.parentElement.textContent;
    parsedText = parentText.split('Delete');
    console.log(parsedText[1]);
    newDeleteBook(parsedText[1]);
    
}

function displayBook(book){

    const listTitle = document.createElement('li'),
        titleText = document.createTextNode(book.name),
        deleteBtn = document.createElement('a');

    // title display
    listTitle.appendChild(titleText);
    titleList = document.querySelector('#titleList');
    titleList.appendChild(listTitle);

    // Delete Icon creation
    deleteBtn.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
    deleteBtn.href = '#';
    deleteBtn.id = 'DELETE';
    deleteBtn.dataValue = book.name;
    deleteBtn.addEventListener('click', deleteBook);

    deleteCollection.appendChild(deleteBtn);

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

function newDeleteBook(bookTitle){
    localStorage.removeItem(bookTitle);
    location.reload();
}

function deleteBook(e){
    e.preventDefault();
    bookTitle = e.target.parentElement.dataValue;
    localStorage.removeItem(bookTitle);
    location.reload();
}

function pageDimensions(e){

    width = document.documentElement.clientWidth
    height = document.documentElement.clientHeight

    cardWidth = cardSelect.offsetWidth
    remaining = width - cardWidth
    margin = remaining/2;
    cardSelect.style.marginLeft = `${margin}px`
    cardSelect.style.marginRight = `${margin}px`;

}

function showAlert(type){
    errorMessage = 'Please ensure that all fields are filled';
    successMessage = 'Saved your book!';

    if(type === 'error'){
        console.log('there was an error');

        newError = document.createElement('p');
        newError.innerHTML = errorMessage;
        newError.classList.add('error');

        cardSelect.insertBefore(newError, bookForm);

        sleep(3000).then(() => {document.querySelector('.error').remove()})

        // bookForm
    }else if(type === 'success'){
        newSuccess = document.createElement('p');
        newSuccess.innerHTML = successMessage;
        newSuccess.classList.add('success');

        cardSelect.insertBefore(newSuccess, bookForm);

        sleep(3000).then(() => {document.querySelector('.success').remove()})
    }
}

const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
  }

getData();
pageDimensions();
