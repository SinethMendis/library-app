document.addEventListener("DOMContentLoaded", function () {

    const myLibrary = [];
    const cardContainer = document.querySelector(".your-projects-body")



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


    function displayAllBooks() {
        for (const book of myLibrary) {
            const card = document.createElement("div");
            card.classList.add("card");
            cardContainer.appendChild(card)
            const verticalStroke = document.createElement("div")
            verticalStroke.classList.add("vertical-stroke")
            card.appendChild(verticalStroke)
            const actions = document.createElement("div")
            actions.classList.add("actions")
            card.appendChild(actions)
            const action1 = document.createElement("div")
            const action2 = document.createElement("div")
            const action3 = document.createElement("div")
            action1.classList.add("action1")
            action2.classList.add("action2")
            action3.classList.add("action3")
            actions.appendChild(action1)
            actions.appendChild(action2)
            actions.appendChild(action3)

            const cardHeading = document.createElement("div")
            cardHeading.classList.add("card-heading")
            card.appendChild(cardHeading)
            const cardPara = document.createElement("div")
            cardPara.classList.add("card-para")
            card.appendChild(cardPara)

            cardHeading.textContent = book.title;
            cardPara.innerHTML = `Author: ${book.author}<br>Pages: ${book.pageCount}<br>Published year: ${book.publishedYear}<br>Read: ${book.read}`;











        }
    }

    const Book1 = new Book(1, "A1", "B1", 30, 2000, "yes")
    const Book2 = new Book(2, "A2", "B2", 30, 2000, "yes")
    const Book3 = new Book(3, "A3", "B3", 30, 2000, "No")
    

    addBookToLibrary(Book1)
    addBookToLibrary(Book2)
    addBookToLibrary(Book3)

    displayAllBooks();


})


