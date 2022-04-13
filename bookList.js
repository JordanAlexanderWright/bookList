// Selecting my elements

const nameField = document.querySelector('#nameField'),
    authorField = document.querySelector('#authorField'),
    isbnField = document.querySelector('#isbnField'),
    submitBtn = document.querySelector('#submitButton');

submitBtn.addEventListener('click', createBook);

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

function createBook(e){
    e.preventDefault();

    name = nameField.value;
    author = authorField.value;
    isbn = isbnField.value;
    
    let someBook = new Book(name, author, isbn);
    bookCollection.push(someBook);

    inputFields.forEach(field => field.value = '');
}