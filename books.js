/** Array to store Data: */
const myLibrary = [];

/** Dummy Data: */
let theHobbit = ['The Hobbit', 'J.R.R. Tolkien', 295, 'Read'];
let theFellowship = ['Women Talking', 'Miriam Toews', 408, 'Unread'];
let kindred = ['Kindred', 'Octavia Butler', 242, 'Read'];
let persuasion = ['Persuasion', 'Jane Austen', 280, 'Read'];

/** Book Object: */
function Book(title, author, pages, read) {
	this.title = title;
	this.author = author;
	this.pages = pages;
	this.read = read;
	this.id = this.getRandomID();
}
Book.prototype.toggleRead = function (status) {
	if (status === true) {
		this.read = 'Read';
	} else {
		this.read = 'Unread';
	}
};

Book.prototype.getRandomID = function () {
	let randomNumb = Math.floor(Math.random() * (500 - 1 + 1)) + 1;
	return this.title[0] + this.author[0] + '-' + randomNumb;
};

/** Select HTML Elements: */
const addNewBtn = document.querySelector('.add');
const dialogEl = document.querySelector('.modal');
const cancelBtn = document.querySelector('.cancel');
const submitBtn = document.querySelector('.submit');
const inputEls = document.querySelectorAll('.input');
const shelfEl = document.querySelector('.shelf');
const formEl = document.querySelector('form');
const invalidEl = document.querySelector('.invalid-input');
const title = document.getElementById('title');
const author = document.getElementById('author');
const pages = document.getElementById('pages');
const titleError = document.getElementById('title-error');
const authorError = document.getElementById('author-error');
const pagesError = document.getElementById('pages-error');
// console.log(titleError, authorError, pagesError);

/** Add Event Listeners: */
title.addEventListener('input', (event) => {
	if (title.validity.valid) {
		titleError.textContent = '';
		titleError.className = 'error';
	} else {
		showError(title, titleError);
	}
});
author.addEventListener('input', (event) => {
	if (author.validity.valid) {
		authorError.textContent = '';
		authorError.className = 'error';
	} else {
		showError(author, authorError);
	}
});

pages.addEventListener('input', (event) => {
	if (pages.validity.valid) {
		pagesError.textContent = '';
		pagesError.className = 'error';
	} else {
		showError(pages, pagesError);
	}
});

formEl.addEventListener('submit', (event) => {
	if (!title.validity.valid) {
		showError(title, titleError);
		event.preventDefault();
	}
	if (!author.validity.valid) {
		showError(author, authorError);
		event.preventDefault();
	}
	if (!pages.validity.valid) {
		showError(pages, pagesError);
		event.preventDefault();
	}
	if (formEl.checkValidity()) {
		event.preventDefault();
		handleSubmit();
	}
});

addNewBtn.addEventListener('click', (e) => {
	dialogEl.showModal();
});

cancelBtn.addEventListener('click', () => {
	invalidEl.textContent = '';

	dialogEl.close();
});

function showError(input, inputError) {
	if (input.validity.valueMissing) {
		inputError.textContent = 'You need to enter a value.';
	} else if (input !== pages && input.validity.tooShort) {
		inputError.textContent = `${input.id} should be at least ${input.minLength} characters; you entered ${input.value.length}.`;
	}
	inputError.className = 'error active';
}

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

function handleSubmit() {
	let newBook = [];
	let validForm = true;

	inputEls.forEach((el) => {
		if (el.type !== 'checkbox' && validForm === true) {
			/** Check if inputs have content: */
			if (el.value.length >= 1) {
				newBook.push(el.value);
			} else {
				invalidEl.textContent = 'Please enter valid input!';
				validForm = false;
				return;
			}
		} else if (el.type === 'checkbox' && validForm === true) {
			if (el.checked === true) {
				newBook.push('Read');
			} else {
				newBook.push('Unread');
			}
		}
	});

	if (validForm === true) {
		invalidEl.textContent = '';

		let bookObj = addBookToLibrary(newBook);
		buildCard(bookObj);
		dialogEl.close();
	} else {
		return;
	}
}

function handleDelete(e, bookToDelete) {
	const cardsArray = [...document.querySelectorAll('.card')];

	let elToDelete = cardsArray.find((el) => el.id === bookToDelete.id);
	let indexToDelete = myLibrary.findIndex(
		(book) => book.id === bookToDelete.id
	);

	elToDelete.remove();
	myLibrary.splice(indexToDelete, 1);
}

function buildCard(book) {
	let cardDiv = document.createElement('div');
	let titleDiv = document.createElement('div');
	let deleteBtn = document.createElement('button');
	let titleH3 = document.createElement('h3');
	let byP = document.createElement('p');
	let authorP = document.createElement('p');
	let pagesP = document.createElement('p');
	let readDiv = document.createElement('div');
	let readP = document.createElement('p');
	let checkboxEl = document.createElement('input');

	checkboxEl.type = 'checkbox';

	cardDiv.classList.add('card');
	titleDiv.classList.add('title-div');
	byP.classList.add('author-line', 'by');
	authorP.classList.add('author-line', 'author-name');
	pagesP.classList.add('extra-info', 'pages');
	readDiv.classList.add('read-div');
	readP.classList.add('extra-info', 'read-bool');
	checkboxEl.classList.add('checkbox-el');

	cardDiv.dataset.id = book.id;
	cardDiv.id = book.id;

	deleteBtn.textContent = 'X';
	titleH3.textContent = book.title;
	byP.textContent = 'by';
	authorP.textContent = book.author;
	pagesP.textContent = book.pages + ' pages';
	readP.textContent = book.read;

	if (book.read === 'Read') {
		checkboxEl.checked = true;
	} else {
		checkboxEl.checked = false;
	}

	titleDiv.appendChild(titleH3);
	cardDiv.appendChild(titleDiv);
	readDiv.appendChild(readP);
	readDiv.appendChild(checkboxEl);

	cardDiv.appendChild(deleteBtn);
	cardDiv.appendChild(byP);
	cardDiv.appendChild(authorP);
	cardDiv.appendChild(pagesP);
	cardDiv.appendChild(readDiv);

	shelfEl.appendChild(cardDiv);

	deleteBtn.addEventListener('click', (e) => {
		handleDelete(e, book);
	});

	checkboxEl.addEventListener('click', (e) => {
		book.toggleRead(e.target.checked);
		readP.textContent = book.read;
		console.log(book);
	});
}
