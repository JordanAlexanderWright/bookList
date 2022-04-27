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

const isbnList = document.querySelector('#isbnList'),
    authorList = document.querySelector('#authorList'),
    deleteCollection = document.querySelector('#deleteBtns');

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

        let inputFields = [nameField, authorField, isbnField];
        inputFields.forEach(field => field.value = '');
    
        saveData(someBook);
        displayBook(someBook);  
        showAlert('success');
    }
}

function displayBook(book){

    // Creating all the elements
    const listTitle = document.createElement('li'),
        titleText = document.createTextNode(book.name),
        deleteBtn = document.createElement('a'),
        listAuthor = document.createElement('li'),
        authorText = document.createTextNode(book.author),
        isbn = document.createElement('li'),
        isbnText = document.createTextNode(book.isbn);

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

    listAuthor.appendChild(authorText);
    authorList.appendChild(listAuthor);

    // isbn Display

    isbn.appendChild(isbnText);
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
    bookTitle = e.target.parentElement.dataValue;
    localStorage.removeItem(bookTitle);
    location.reload();
}

// Created this function to add auto sizing to my ui

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