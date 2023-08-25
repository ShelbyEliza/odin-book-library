/** Array to store Data: */
const myLibrary = [];

/** Dummy Data: */
let theHobbit = ["The Hobbit", "J.R.R. Tolkien", 295, "on"];
let theFellowship = ["Women Talking", "Miriam Toews", 408, "on"];
let kindred = ["Kindred", "Octavia Butler", 242, "on"];
let persuasion = ["Persuasion", "Jane Austen", 280, "on"];

/** Book Object: */
function Book(title, author, pages, read) {
	this.title = title;
	this.author = author;
	this.pages = pages;
	this.read = read;
	this.id = this.getRandomID();
	this.reportBook = function () {
		let readRes;
		read === "on" ? (readRes = "read") : (readRes = "not yet read");
		let res = `${title} by ${author}, ${pages}, ${readRes}`;
		return res;
	};
}

Book.prototype.getRandomID = function () {
	let randomNumb = Math.floor(Math.random() * (500 - 1 + 1)) + 1;
	return this.title[0] + this.author[0] + "-" + randomNumb;
};

/** Select HTML Elements: */
const addNewBtn = document.querySelector(".add");
const dialogEl = document.querySelector(".modal");
const cancelBtn = document.querySelector(".cancel");
const submitBtn = document.querySelector(".submit");
const inputEls = document.querySelectorAll(".input");
const shelfEl = document.querySelector(".shelf");
const formEl = document.querySelector("#form");
const invalidEl = document.querySelector(".invalid-input");

/** Add Event Listeners: */
addNewBtn.addEventListener("click", (e) => {
	dialogEl.showModal();
});

submitBtn.addEventListener("click", (e) => {
	handleSubmit(e);
});

cancelBtn.addEventListener("click", () => {
	invalidEl.textContent = "";

	dialogEl.close();
});

/** Add Dummy Data to myLibrary Array: */
addBookToLibrary(theHobbit);
addBookToLibrary(theFellowship);
addBookToLibrary(kindred);
addBookToLibrary(persuasion);
myLibrary.forEach((book) => buildCard(book));

function addBookToLibrary(book) {
	let newBook = new Book(...book);

	myLibrary.push(newBook);

	return newBook;
}

function handleSubmit(e) {
	e.preventDefault();
	let newBook = [];
	let validForm = true;

	inputEls.forEach((el) => {
		if (el.type !== "checkbox" && validForm === true) {
			/** Check if inputs have content: */
			if (el.value.length >= 1) {
				newBook.push(el.value);
			} else {
				invalidEl.textContent = "Please enter valid input!";
				validForm = false;
				return;
			}
		} else if (el.type === "checkbox" && validForm === true) {
			newBook.push(el.checked);
		}
	});

	if (validForm === true) {
		invalidEl.textContent = "";

		let bookObj = addBookToLibrary(newBook);
		buildCard(bookObj);
		dialogEl.close();
	} else {
		return;
	}
}

function handleDelete(e, bookToDelete) {
	const cardsArray = [...document.querySelectorAll(".card")];

	let elToDelete = cardsArray.find((el) => el.id === bookToDelete.id);
	let indexToDelete = myLibrary.findIndex(
		(book) => book.id === bookToDelete.id
	);

	elToDelete.remove();
	myLibrary.splice(indexToDelete, 1);
}

function buildCard(book) {
	let cardDiv = document.createElement("div");
	let deleteBtn = document.createElement("button");
	let titleH3 = document.createElement("h3");
	let byP = document.createElement("p");
	let authorP = document.createElement("p");
	let pagesP = document.createElement("p");
	let readP = document.createElement("p");

	cardDiv.classList.add("card");
	byP.classList.add("author-line", "by");
	authorP.classList.add("author-line", "author-name");
	pagesP.classList.add("extra-info", "pages");
	readP.classList.add("extra-info", "read-bool");

	cardDiv.dataset.id = book.id;
	cardDiv.id = book.id;

	deleteBtn.textContent = "X";
	titleH3.textContent = book.title;
	byP.textContent = "by";
	authorP.textContent = book.author;
	pagesP.textContent = book.pages + " pages";

	if (book.read === true) {
		readP.textContent = "Read";
	} else {
		readP.textContent = "Not Read";
	}

	cardDiv.appendChild(deleteBtn);
	cardDiv.appendChild(titleH3);
	cardDiv.appendChild(byP);
	cardDiv.appendChild(authorP);
	cardDiv.appendChild(pagesP);
	cardDiv.appendChild(readP);

	shelfEl.appendChild(cardDiv);

	deleteBtn.addEventListener("click", (e) => {
		handleDelete(e, book);
	});
}

console.log(myLibrary);
