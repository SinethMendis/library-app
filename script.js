const myLibrary = [];

class Book {
    constructor(ISBN, title, author, pageCount, publishedYear, read) {
        this.ISBN = ISBN;
        this.title = title;
        this.author = author;
        this.pageCount = pageCount;
        this.publishedYear = publishedYear;
        this.read = read;
    }
}

Book.prototype.aboutBook = function () {
    return `ISBN : ${this.ISBN}\nTitle : ${this.title}\nAuthor : ${this.author}\nPages : ${this.pageCount}\nPublished year : ${this.publishedYear}\nRead status : ${this.read}`
}

function addBookToLibrary(Book) {
    myLibrary.push(Book);
}

function displayBook(ISBN) {
    for (const book of myLibrary) {
        // to display a specified book 
        /* if (book.ISBN == ISBN) {
            console.log(book)
        } */
        console.log(book)

    }
}

const Book1 = new Book(1, "A1", "B1", 30, 2000, "yes")
const Book2 = new Book(2, "A2", "B2", 30, 2000, "yes")
const Book3 = new Book(3, "A3", "B3", 30, 2000, "yes")

addBookToLibrary(Book1)
addBookToLibrary(Book2)
addBookToLibrary(Book3)


// console.log(Book1.aboutBook());
// console.log(Book1);
// console.log(myLibrary)
displayBook();
