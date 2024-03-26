document.addEventListener("DOMContentLoaded", function () {
    const myLibrary = [];           //Array to store the book objects
    const cardContainer = document.querySelector(".your-projects-body") //Selector to select the area to which the cards are added
    const newBookBtn = document.querySelector(".new-book") //This button is used to enable the form section
    const form = document.querySelector(".form") //Selector to select the form

    let elements = form.elements;                     // To disable the form elements intially when the page is loaded 
    for (let i = 0; i < elements.length; i++) {
        elements[i].disabled = true;
    }

    class Book {        // Constructor to create book objects
        constructor(ISBN, title, author, pageCount, publishedYear, read) {
            this.ISBN = ISBN;
            this.title = title;
            this.author = author;
            this.pageCount = pageCount;
            this.publishedYear = publishedYear;
            this.read = read;
        }
    }

    Book.prototype.aboutBook = function () { // A method added to the Book's prototype
        return `ISBN : ${this.ISBN}\nTitle : ${this.title}\nAuthor : ${this.author}\nPages : ${this.pageCount}\nPublished year : ${this.publishedYear}\nRead status : ${this.read}`
    }

    function addBookToLibrary(book) {  // To add a book to the myLibrary array
        myLibrary.push(book);
    }

    function displayAllBooks() {
        cardContainer.innerHTML = '';  // The cardContainer is emptied before the myLibrary array is looped and the cards are added with the book details populate on to them 

        myLibrary.forEach((book, index) => {
            const card = document.createElement("div");   //Creating the card and appending it to the cardContainer
            card.classList.add("card");
            cardContainer.appendChild(card)

            const verticalStroke = document.createElement("div") //Create and add the stroke 
            verticalStroke.classList.add("vertical-stroke")
            card.appendChild(verticalStroke)

            const actions = document.createElement("div") //Create and add the actions panel
            actions.classList.add("actions")
            card.appendChild(actions)

            const action1 = document.createElement("button")   //Creating the action1 button
            action1.dataset.index = index;
            // action1.dataset.code = index + 1;   //Assigning the index of the card (or we can say the book) to the dataset as data-index => for example here the key is index and the value is the relevant index of the item in the array
            // action1.dataset.code = index + 1;
            // action1.dataset.ID = index + 2;
            // action1.dataset.ID = `${book.title} => ${book.author}`;
            action1.addEventListener("click", deleteBook); //Adding an eventListener to each action1 element, the deleteBook function is invoked when the button is clicked
            action1.classList.add("action1") // Adding the neccasary styling and adding it to the actions panel
            actions.appendChild(action1)



            const action2 = document.createElement("button")  //Toggle read status button
            action2.dataset.book = index;
            action2.addEventListener("click", toogleReadStatus)
            action2.classList.add("action2")
            actions.appendChild(action2)


            const action3 = document.createElement("div")
            action3.classList.add("action3") // Extra action button
            actions.appendChild(action3)

            const cardHeading = document.createElement("div") //Create and add the card heading
            cardHeading.classList.add("card-heading")
            card.appendChild(cardHeading)

            const cardPara = document.createElement("div") //Create and add the card para
            cardPara.classList.add("card-para")
            card.appendChild(cardPara)

            cardHeading.textContent = book.title;  //Populating the individual cards with relevant book details
            cardPara.innerHTML = `<span>Author</span>: ${book.author}<br><span>Pages</span>: ${book.pageCount}<br><span>Published year</span>: ${book.publishedYear}<br><span>Read</span>: ${book.read}`;
            // console.log(action2.dataset)
        });
    }

    newBookBtn.addEventListener("click", function () {   //To enable the form elements when the page is clicked
        for (let i = 0; i < elements.length; i++) {
            elements[i].disabled = false;
        }
    })

    const titleInput = document.getElementById("title"); //Selectors to retrieving the input values
    const isbnInput = document.getElementById("isbn");
    const authorInput = document.getElementById("author");
    const pagesInput = document.getElementById("pages");
    const publishedYearInput = document.getElementById("publishedyear");
    const readStatusSelect = document.getElementById("readstatus")

    form.addEventListener("submit", function (event) {
        event.preventDefault(); //Preventing the default action of page reloading when the submit button is clicked, this is one of the properties of the submit event object 

        let title = titleInput.value.trim();  //Retrieving the input values
        let isbn = isbnInput.value.trim();
        let author = authorInput.value.trim();
        let pages = parseInt(pagesInput.value);
        let publishedYear = parseInt(publishedYearInput.value);
        let readStatus = readStatusSelect.value;

        if (title !== "" && author !== "" && readStatus !== "") { //Preventing the book addition if three details are missing
            addBookToLibrary(new Book(isbn, title, author, pages, publishedYear, readStatus))   //Creating the book object
            form.reset(); //Resetting the form
            displayAllBooks(); //displaying all the books including the new one
        } else {
            alert("Enter the Book title, Author & Read status to add the book") //Alert to the user

        }
    })

    function p() { //Sample book inputs
        const Book1 = new Book(1, "Marvel Comics", "Stan Lee", 1000, 2000, "Read");
        const Book2 = new Book(2, "DC Comics", "DC", 600, 1999, "Read");
        const Book3 = new Book(3, "Percy Jackson", "Rick Riordan", 500, 2019, "Not read");
        const Book4 = new Book(4, "Harry Potter", "J.K. Rowling", 800, 2005, "Read");
        const Book5 = new Book(5, "The Lord of the Rings", "J.R.R. Tolkien", 1200, 1954, "Not read");

        addBookToLibrary(Book1);
        addBookToLibrary(Book2);
        addBookToLibrary(Book3);
        addBookToLibrary(Book4);
        addBookToLibrary(Book5);
    }
    p()
    displayAllBooks()

    function deleteBook(event) { //Function to delete the books, triggered when the action1 button of the relevant card is clicked
        const index = event.target.dataset.index;   //Here the click event object is used, event.target is the relevant button clicked
        if (index !== undefined) {
            myLibrary.splice(index, 1);
            // console.log(event.target)               <= This gives the button relevant to the specific card, that was clicked
            // console.log(event.target.dataset)       <= This gives the DOMStringMap => the object having all the custom data attributes and values
            // console.log(event.target.dataset.index) <= This gives the relevant attribute's value => event.target.dataset.value (value can be any key eg => index , code , ID

            displayAllBooks(); //Used to show all the books after deleting the book
        }
    }

    function toogleReadStatus(event) {  //Used to change th toggle status,
        const index = event.target.dataset.book;
        const book = myLibrary[index];
        if (book !== undefined) {
            if (book.read === "Read") {
                book.read = "Not read";
            } else if (book.read === "Not read") {
                book.read = "Currently reading";
            } else {
                book.read = "Read";
            }

            // book.read = (book.read === "Yes") ? "No" : "Yes";

    
            displayAllBooks();
        }
    }
    
});
