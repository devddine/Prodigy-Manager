"use strict";
// TODO DARK/LIGHT MODE
// TODO GET TOTAL
// TODO CREATE PRODUCTS
// TODO SAVE TO LS
// TODO CLEAR AFTER CREATE
// TODO READ/SHOW DATA
// TODO MAKE LOOP FOR COUNT
// TODO Delete PRODUCTS
// TODO UPDATE
// TODO SEARCH
// TODO CLEAR DATA


//* Starting
var Products;
var errorMessage;
var editIndex = 0;
const themeToggle = document.getElementById("themeToggle");
const title = document.getElementById("title");
const price = document.getElementById("price");
const taxes = document.getElementById("taxes");
const ads = document.getElementById("ads");
const discount = document.getElementById("discount");
const total = document.getElementById("total");
const count = document.getElementById("count");
const category = document.getElementById("category");
const submit = document.getElementById("submit");
const search = document.getElementById("search");
const searchTitle = document.getElementById("searchTitle");
const searchCategory = document.getElementById("searchCategory");
const edit = document.getElementById("edit");
const remove = document.getElementById("remove");
const clear = document.getElementById("clear");

//* DARK/LIGHT MODE
const savedTheme = localStorage.getItem("theme");
if (savedTheme) {
	document.documentElement.setAttribute("data-theme", savedTheme);
}
themeToggle.addEventListener("click", () => {
	const currentTheme = document.documentElement.getAttribute("data-theme");
	const newTheme = currentTheme === "dark" ? "light" : "dark";

	document.documentElement.setAttribute("data-theme", newTheme);
	localStorage.setItem("theme", newTheme);
});

//* GET TOTAL
price.addEventListener("input", getTotal);
taxes.addEventListener("input", getTotal);
ads.addEventListener("input", getTotal);
discount.addEventListener("input", getTotal);
function getTotal() {
	let result = +price.value + +taxes.value + +ads.value - +discount.value;
	if (result > 0) {
		total.innerHTML = result;
		total.style.background = "#007F00";
	} else if (result < 0) {
		total.innerHTML = result;
		total.style.background = "#800000";
	} else {
		total.innerHTML = "0";
		total.style.background = "";
	}
}

//* CREATE PRODUCTS & SAVE TO LS & Update Products
submit.addEventListener("click", () => {
	let toggle = submit.innerHTML;
	if (
		validateTitle(title) &&
		validatePrice(price) &&
		validateTaxes(taxes) &&
		validateAds(ads) &&
		validateDiscount(discount) &&
		validateCategory(category)
	) {
		if (toggle === "Create") {
			let newProduct = {
				title: title.value,
				price: +price.value,
				taxes: +taxes.value,
				ads: +ads.value,
				discount: +discount.value,
				total: total.innerHTML,
				category: category.value,
			};
			+count.value <= 0 ? +(count.value = 1) : +count.value;
			+count.value > 100 ? +(count.value = 100) : +count.value;
			for (let i = 0; i < +count.value; i++) {
				Products.push(newProduct);
			}
		} else {
			Products[editIndex].title = title.value;
			Products[editIndex].price = +price.value;
			Products[editIndex].taxes = +taxes.value;
			Products[editIndex].ads = +ads.value;
			Products[editIndex].discount = +discount.value;
			Products[editIndex].total = total.innerHTML;
			Products[editIndex].category = category.value;
			submit.innerHTML = "Create";
			count.style.display = "";
			editIndex = 0;
		}
		localStorage.setItem("products", JSON.stringify(Products));
		readDB();
		clearDB();
	}
});

//* CLEAR AFTER CREATE
function clearDB() {
	title.value = "";
	price.value = "";
	taxes.value = "";
	ads.value = "";
	discount.value = "";
	count.value = "";
	category.value = "";
	getTotal();
}

//* READ/SHOW DATA
readDB();
function readDB() {
	let table = "";
	let savedProducts = localStorage.getItem("products");
	if (savedProducts) {
		Products = JSON.parse(savedProducts);
		clear.style.display = ""; /* FOR CLEAR ALL BTN STYLE*/
		clear.innerHTML = `Clear All Data !!! (${Products.length})`;
	} else {
		Products = [];
		clear.style.display = "none"; /* FOR CLEAR ALL BTN STYLE*/
		clear.innerHTML = ``;
	}
	console.log(Products);
	for (let i = 0; i < Products.length; i++) {
		table += generateContent(Products[i], i);
	}
	document.getElementById("tbody").innerHTML = table;
}

function generateContent(product, index) {
	return `
			<tr>
					<td>${index + 1}</td>
					<td>${product.title}</td>
					<td>${product.price}</td>
					<td>${product.taxes}</td>
					<td>${product.ads}</td>
					<td>${product.discount}</td>
					<td>${product.total}</td>
					<td>${product.category}</td>
					<td>
							<button class="edit" onclick="editDB(${index})"><i class="fa-solid fa-pen"></i></button>
							<button class="remove" onclick="removeDB(${index})"><i class="fa-solid fa-trash"></i></button>
					</td>
			</tr>`;
}

//* MAKE LOOP FOR COUNT
//// ADDED TO CREATE PRODUCTS PART

//* DELETE PRODUCTS
function removeDB(index) {
	Products.splice(index, 1);
	localStorage.setItem("products", JSON.stringify(Products));
	readDB();
}

//* UPDATE
function editDB(index) {
	title.value = Products[index].title;
	price.value = Products[index].price;
	taxes.value = Products[index].taxes;
	ads.value = Products[index].ads;
	discount.value = Products[index].discount;
	category.value = Products[index].category;
	getTotal();
	count.style.display = "none";
	submit.innerHTML = "Update";
	readDB();
	editIndex = index;
	scroll({ top: 0, left: 0, behavior: "smooth" });
}

//* SEARCH
searchTitle.addEventListener("click", () => {
	search.placeholder = "Search By Title";
	searchData(search.value, search.placeholder);
});
searchCategory.addEventListener("click", () => {
	search.placeholder = "Search By Category";
	searchData(search.value, search.placeholder);
});
search.addEventListener("keyup", () => {
	searchData(search.value, search.placeholder);
});

function searchData(value, placeholder) {
	let table = "";
	for (let i = 0; i < Products.length; i++) {
		if (
			(placeholder === "Search By Title" &&
				Products[i].title
					.toLowerCase()
					.trim()
					.includes(value.toLowerCase().trim())) ||
			(placeholder === "Search By Category" &&
				Products[i].category
					.toLowerCase()
					.trim()
					.includes(value.toLowerCase().trim()))
		) {
			table += generateContent(Products[i], i);
		}
	}
	document.getElementById("tbody").innerHTML = table;
}

//* CLEAR DATA
clear.addEventListener("click", () => {
	if (confirm("Are you sure???")) {
		localStorage.removeItem("products");
		readDB();
	}
});

//* DATA VALIDATION
const titleError = document.querySelector(".title-error");
const priceError = document.querySelector(".price-error");
const taxesError = document.querySelector(".taxes-error");
const adsError = document.querySelector(".ads-error");
const discountError = document.querySelector(".discount-error");
const categoryError = document.querySelector(".category-error");

title.addEventListener("input", () => {
	validateTitle(title);
});
price.addEventListener("input", () => {
	validatePrice(price);
});
taxes.addEventListener("input", () => {
	validateTaxes(taxes);
});
ads.addEventListener("input", () => {
	validateAds(ads);
});
discount.addEventListener("input", () => {
	validateDiscount(discount);
});
category.addEventListener("input", () => {
	validateCategory(category);
});
function validateTitle(e) {
	if (e.value.trim() == null || e.value.trim() == "") {
		errorMessage = "Title can't be blank!";
		errorFunc(e, errorMessage, titleError);
		return false;
	} else if (e.value.trim().length < 3) {
		errorMessage = "Title must be at least 3 characters long!";
		errorFunc(e, errorMessage, titleError);
		return false;
	} else {
		errorClear(e, titleError);
		return true;
	}
}
function validatePrice(e) {
	if (e.value == null || e.value == "") {
		errorMessage = "Price can't be blank!";
		e.value = 0;
		return true;
	} else if (e.value < 0) {
		errorMessage = "Price must be 0 or greater!";
		errorFunc(e, errorMessage, priceError);
		return false;
	} else {
		errorClear(e, priceError);
		return true;
	}
}
function validateTaxes(e) {
	if (e.value == null || e.value == "") {
		errorMessage = "Taxes can't be blank!";
		e.value = 0;
		return true;
	} else if (e.value < 0) {
		errorMessage = "Taxes must be 0 or greater!";
		errorFunc(e, errorMessage, taxesError);
		return false;
	} else {
		errorClear(e, taxesError);
		return true;
	}
}
function validateAds(e) {
	if (e.value == null || e.value == "") {
		errorMessage = "Ads can't be blank!";
		e.value = 0;
		return true;
	} else if (e.value < 0) {
		errorMessage = "Ads must be 0 or greater!";
		errorFunc(e, errorMessage, adsError);
		return false;
	} else {
		errorClear(e, adsError);
		return true;
	}
}
function validateDiscount(e) {
	if (e.value == null || e.value == "") {
		errorMessage = "Discount can't be blank!";
		e.value = 0;
		return true;
	} else if (e.value < 0) {
		errorMessage = "Discount must be 0 or greater!";
		errorFunc(e, errorMessage, discountError);
		return false;
	} else {
		errorClear(e, discountError);
		return true;
	}
}
function validateCategory(e) {
	if (e.value.trim() == null || e.value.trim() == "") {
		errorMessage = "Category can't be blank!";
		errorFunc(e, errorMessage, categoryError);
		return false;
	} else if (e.value.trim().length < 3) {
		errorMessage = "Category must be at least 3 characters long!";
		errorFunc(e, errorMessage, categoryError);
		return false;
	} else {
		errorClear(e, categoryError);
		return true;
	}
}

function errorFunc(element, message, messageBox) {
	element.style.border = "1px solid red";
	messageBox.getElementsByTagName("p")[0].innerHTML = message;
	messageBox.style.display = "flex";
}

function errorClear(element, messageBox) {
	element.style.border = "";
	messageBox.getElementsByTagName("p")[0].innerHTML = "";
	messageBox.style.display = "";
}

//* ScrollToTOP
let btn = document.getElementById("btn-scroll");

window.onscroll = () => {
	if (scrollY > 400) {
		btn.style.display = "block";
	} else {
		btn.style.display = "";
	}
};

btn.addEventListener("click", () => {
	scroll({ top: 0, left: 0, behavior: "smooth" });
});
//! scroll behavior not working until enable the smooth scrolling flag in chrome
//! chrome://flags/#smooth-scrolling
