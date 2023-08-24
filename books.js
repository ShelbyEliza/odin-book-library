const addBtn = document.querySelector(".add");
const dialogEl = document.querySelector(".modal");
const cancelBtn = document.querySelector(".cancel");
const submitBtn = document.querySelector(".submit");
const inputEls = document.querySelectorAll(".input");
const shelfEl = document.querySelector(".shelf");

addBtn.addEventListener("click", (e) => {
	console.log(e);
	dialogEl.showModal();
});
// cancelBtn.addEventListener("click", dialogEl.close());
submitBtn.addEventListener("click", (e) => {
	handleSubmit(e);
});

const myLibrary = [];
let theHobbit = ["The Hobbit", "J.R.R. Tolkien", 295, "on"];
let theFellowship = [
	"The Fellowship of the Ring",
	"J.R.R. Tolkien",
	408,
	"off",
];
let kindred = ["Kindred", "Octavia Butler", 242, "on"];
let persuasion = ["Persuasion", "Jane Austen", 280, "on"];

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
	return this.author[0] + "-" + randomNumb;
};

function addBookToLibrary(book) {
	let newBook = new Book(...book);

	myLibrary.push(newBook);
	return newBook;
}

addBookToLibrary(theHobbit);
// addBookToLibrary(theFellowship);
// addBookToLibrary(kindred);
// addBookToLibrary(persuasion);

console.log(myLibrary);

function handleSubmit(e) {
	e.preventDefault();
	let newBook = [];
	inputEls.forEach((el) => {
		newBook.push(el.value);
	});
	console.log(newBook);
	let bookObj = addBookToLibrary(newBook);
	buildCard(bookObj);
	dialogEl.close();
}

function handleDelete(e, bookToDelete) {
	// console.log(bookToDelete.id);
	myLibrary.filter((book) => {
		let res;
		if (book.id !== bookToDelete.id) {
			res = book;
		}
		return res;
	});
	// myLibrary.filter((book) => book.id != bookToDelete.id);
	console.log(myLibrary);
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
	cardDiv.dataset.id = book.id;

	deleteBtn.textContent = "X";
	titleH3.textContent = book.title;
	byP.textContent = "by";
	authorP.textContent = book.author;
	pagesP.textContent = book.pages + " pages";
	readP.textContent = book.read;

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
