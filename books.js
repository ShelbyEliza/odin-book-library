/** Array to store Data: */

/** Dummy Data: */
let theHobbit = ["The Hobbit", "J.R.R. Tolkien", 295, "Read"];
let theFellowship = ["Women Talking", "Miriam Toews", 408, "Unread"];
let kindred = ["Kindred", "Octavia Butler", 242, "Read"];
let persuasion = ["Persuasion", "Jane Austen", 280, "Read"];

/** Book Object: */
class Shelf {
	shelf = [];
	constructor() {}
}

class Book {
	constructor(title, author, pages, read) {
		this.title = title;
		this.author = author;
		this.pages = pages;
		this.read = read;
		this.id = this.getRandomID();
	}
	toggleRead() {
		this.read === "Unread" ? (this.read = "Read") : (this.read = "Unread");
	}
	getRandomID() {
		let randomNumb = Math.floor(Math.random() * (500 - 1 + 1)) + 1;
		return this.title[0] + this.author[0] + "-" + randomNumb;
	}
}

class Card {
	cardDiv = document.createElement("div");
	titleDiv = document.createElement("div");
	deleteBtn = document.createElement("button");
	titleH3 = document.createElement("h3");
	byP = document.createElement("p");
	authorP = document.createElement("p");
	pagesP = document.createElement("p");
	readDiv = document.createElement("div");
	readP = document.createElement("p");
	checkboxEl = document.createElement("input");

	configCheckbox(book) {
		this.checkboxEl.type = "checkbox";
		book.read === "Read"
			? (this.checkboxEl.checked = true)
			: (this.checkboxEl.checked = false);
	}

	addToClassList() {
		this.cardDiv.classList.add("card");
		this.titleDiv.classList.add("title-div");
		this.byP.classList.add("author-line", "by");
		this.authorP.classList.add("author-line", "author-name");
		this.pagesP.classList.add("extra-info", "pages");
		this.readDiv.classList.add("read-div");
		this.readP.classList.add("extra-info", "read-bool");
		this.checkboxEl.classList.add("checkbox-el");
	}

	appendToDom() {
		this.titleDiv.appendChild(this.titleH3);
		this.cardDiv.appendChild(this.titleDiv);
		this.readDiv.appendChild(this.readP);
		this.readDiv.appendChild(this.checkboxEl);

		this.cardDiv.appendChild(this.deleteBtn);
		this.cardDiv.appendChild(this.byP);
		this.cardDiv.appendChild(this.authorP);
		this.cardDiv.appendChild(this.pagesP);
		this.cardDiv.appendChild(this.readDiv);

		display.shelfEl.appendChild(this.cardDiv);
	}
	bindEvents(book) {
		this.deleteBtn.addEventListener("click", this.handleDelete);

		this.checkboxEl.addEventListener("click", (e) => {
			book.toggleRead(e.target.checked);
			this.readP.textContent = book.read;
		});
	}

	handleDelete(bookToDelete) {
		// TODO: Also need to delete class instance!
		bookToDelete.target.parentNode.remove();
	}

	constructor(book) {
		this.cardDiv.dataset.id = book.id;
		this.cardDiv.id = book.id;
		this.titleH3.textContent = book.title;
		this.authorP.textContent = book.author;
		this.pagesP.textContent = book.pages + " pages";
		this.readP.textContent = book.read;
		this.deleteBtn.textContent = "X";
		this.byP.textContent = "by";

		this.configCheckbox(book);
		this.addToClassList();
		this.appendToDom();
		this.bindEvents(book);
	}
}

const newBook1 = new Book(
	"Bunnies in the Garden",
	"Angie Banks",
	140,
	"Unread"
);
const newBook2 = new Book(
	"Peonies in the Kitchen",
	"Bruce Bench",
	7340,
	"Read"
);
console.log(newBook1, newBook2);

/** Select HTML Elements: */
const display = (() => {
	const dialogEl = document.querySelector(".modal");
	const inputEls = document.querySelectorAll(".input");
	const invalidEl = document.querySelector(".invalid-input");
	const cancelBtn = document.querySelector(".cancel");
	const submitBtn = document.querySelector(".submit");

	const addNewBtn = document.querySelector(".add");
	const shelfEl = document.querySelector(".shelf");

	function handleCancel() {
		invalidEl.textContent = "";

		dialogEl.close();
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
				if (el.checked === true) {
					newBook.push("Read");
				} else {
					newBook.push("Unread");
				}
			}
		});

		if (validForm === true) {
			invalidEl.textContent = "";

			let bookObj = addBookToLibrary(newBook);
			new Card(bookObj);
			dialogEl.close();
		} else {
			return;
		}
	}

	/** Add Event Listeners: */
	addNewBtn.addEventListener("click", () => dialogEl.showModal());
	submitBtn.addEventListener("click", handleSubmit);
	cancelBtn.addEventListener("click", handleCancel);
	return {
		shelfEl,
		inputEls,
		dialogEl,
		invalidEl,
	};
})();

function addBookToLibrary(book) {
	let newBook = new Book(...book);

	return newBook;
}

/** Add Dummy Data to myLibrary Array: */
new Card(addBookToLibrary(theHobbit));
new Card(addBookToLibrary(theFellowship));
new Card(addBookToLibrary(kindred));
new Card(addBookToLibrary(persuasion));
