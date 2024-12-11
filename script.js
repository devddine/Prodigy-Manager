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
let Products;
let editIndex = 0;
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
let savedTheme = localStorage.getItem("theme");
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
		total.style.background = "#040";
	} else {
		total.innerHTML = "0";
		total.style.background = "";
	}
}

//* CREATE PRODUCTS & SAVE TO LS & Update Products
submit.addEventListener("click", () => {
	let toggle = submit.innerHTML;
	let newProduct = {
		title: title.value,
		price: price.value,
		taxes: taxes.value,
		ads: ads.value,
		discount: discount.value,
		total: total.innerHTML,
		category: category.value,
	};
	if (toggle === "Create") {
		count.value <= 0 ? (count.value = 1) : count.value;
		for (let i = 0; i < +count.value; i++) {
			Products.push(newProduct);
		}
	} else if (toggle === "Update") {
		Products[editIndex].title = title.value;
		Products[editIndex].price = price.value;
		Products[editIndex].taxes = taxes.value;
		Products[editIndex].ads = ads.value;
		Products[editIndex].discount = discount.value;
		Products[editIndex].total = total.innerHTML;
		Products[editIndex].category = category.value;
		submit.innerHTML = "Create";
		count.style.display = "";
		editIndex = 0;
	}
	localStorage.setItem("products", JSON.stringify(Products));
	readDB();
	clearDB();
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
function readDB() {
	let savedProducts = localStorage.getItem("products");
	if (savedProducts) {
		Products = JSON.parse(savedProducts);
		clear.style.display = ""; /* FOR CLEAR ALL BTN STYLE*/
	} else {
		Products = [];
		clear.style.display = "none"; /* FOR CLEAR ALL BTN STYLE*/
	}
	let table = "";
	for (let i = 0; i < Products.length; i++) {
		table += `
		<tr>
			<td>${i + 1}</td>
			<td>${Products[i].title}</td>
			<td>${Products[i].price}</td>
			<td>${Products[i].taxes}</td>
			<td>${Products[i].ads}</td>
			<td>${Products[i].discount}</td>
			<td>${Products[i].total}</td>
			<td>${Products[i].category}</td>
			<td><button class="edit" onclick="editDB(${i})"><i class="fa-solid fa-pen"></i></button>
			<button class="remove" onclick="removeDB(${i})" ><i class="fa-solid fa-trash"></i></button></td>
		</tr>`;
	}
	document.getElementById("tbody").innerHTML = table;
}
readDB();

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
			placeholder === "Search By Title" &&
			Products[i].title.includes(value)
		) {
			table += `
					<tr>
						<td>${i + 1}</td>
						<td>${Products[i].title}</td>
						<td>${Products[i].price}</td>
						<td>${Products[i].taxes}</td>
						<td>${Products[i].ads}</td>
						<td>${Products[i].discount}</td>
						<td>${Products[i].total}</td>
						<td>${Products[i].category}</td>
						<td><button class="edit" onclick="editDB(${i})"><i class="fa-solid fa-pen"></i></button>
						<button class="remove" onclick="removeDB(${i})" ><i class="fa-solid fa-trash"></i></button></td>
					</tr>`;
		}
		if (
			placeholder === "Search By Category" &&
			Products[i].category.includes(value)
		) {
			table += `
						<tr>
						<td>${i + 1}</td>
						<td>${Products[i].title}</td>
						<td>${Products[i].price}</td>
						<td>${Products[i].taxes}</td>
						<td>${Products[i].ads}</td>
						<td>${Products[i].discount}</td>
						<td>${Products[i].total}</td>
						<td>${Products[i].category}</td>
						<td><button class="edit" onclick="editDB(${i})"><i class="fa-solid fa-pen"></i></button>
						<button class="remove" onclick="removeDB(${i})" ><i class="fa-solid fa-trash"></i></button></td>
					</tr>`;
		}
	}
	document.getElementById("tbody").innerHTML = table;
}

//* CLEAR DATA
clear.addEventListener("click", () => {
	localStorage.removeItem("products");
	readDB();
});
