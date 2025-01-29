"use strict";
//TODO 
//!FIXME UPDATE PRODUCT BUG
//! PAGINATION SYSTEM / 

//* GLOBAL

let errorMessage = "";
let editId = "";

//* DOM /constants
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
const btn = document.getElementById("btn-scroll");

//* API /constants
const baseUrl = "http://localhost:3030/";
const defaultHeader = {
  "Content-type": "application/json; charset=UTF-8",
};

//* API FUNCTION /api
async function httpRequest(dataType, apiMethod, content) {
  let tempMsg;
  let requestMsg = "No message yet...";
  let requestOptions;
  if (dataType === "theme") {
    if (apiMethod === "PUT") {
      requestOptions = {
        method: apiMethod,
        headers: {
          defaultHeader,
        },
        body: JSON.stringify({
          website: content,
        }),
      };
      requestMsg = `The theme switched to ${content}`;
    }
  } else if (dataType === "products") {
    if (apiMethod === "POST" || apiMethod === "PUT") {
      requestOptions = {
        method: apiMethod,
        headers: {
          defaultHeader,
        },
        body: JSON.stringify(content),
      };
      if (apiMethod === "PUT") {
        dataType += "/" + content.id;
        requestMsg = `"${content.title}" has been successfully edited`;
      } else {
        requestMsg = `"${content.title}" added successfully`;
      }
    } else if (apiMethod === "DELETE") {
      requestOptions = {
        method: apiMethod,
      };
      dataType += "/" + content;
      requestMsg = `The product has been successfully deleted`;
    }
  }
  if (apiMethod === "GET") {
    requestOptions = {
      method: apiMethod,
      headers: {
        defaultHeader,
      },
    };
    content ? (dataType += "/" + content) : dataType;
    requestMsg = `Website refreshed`;
  }
  try {
    const response = await fetch(baseUrl + dataType, requestOptions);
    const data = await response.json();
    tempMsg = `${response.status} ${response.statusText} | ${requestMsg}`;
    if (apiMethod != "GET" && dataType != "theme") {
      tempMsg = `Product ID: ${data.id} | ${tempMsg}`;
    }
    console.log(tempMsg);
    return data;
  } catch (error) {
    console.error(`Something wrong happening: `, error);
  }
}

//* DARK/LIGHT MODE /theme
getTheme();
async function getTheme() {
  let savedTheme = await httpRequest("theme", "GET");
  if (savedTheme) {
    document.documentElement.setAttribute("data-theme", savedTheme.website);
  }
}

themeToggle.addEventListener("click", async () => {
  const currentTheme = document.documentElement.getAttribute("data-theme");
  const newTheme = currentTheme === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", newTheme);
  await httpRequest("theme", "PUT", newTheme);
});

//* CALC TOTAL /dom/utils
price.addEventListener("input", getTotal);
taxes.addEventListener("input", getTotal);
ads.addEventListener("input", getTotal);
discount.addEventListener("input", getTotal);

function getTotal() {
  let totalValue = Number(price.value) + Number(taxes.value) + Number(ads.value) - Number(discount.value);

  if (totalValue > 0) {
    total.innerHTML = totalValue;
    total.style.background = "#007F00";
  } else if (totalValue < 0) {
    total.innerHTML = totalValue;
    total.style.background = "#800000";
  } else {
    total.innerHTML = "0";
    total.style.background = "";
  }
}


//* CREATE/UPDATE PRODUCTS /products
submit.addEventListener("click", async () => {
  // let newProducts = [];
  if (
    validateInput(title, titleError, "Title", 3) &&
    validateInput(price, priceError, "Price", 0, true) &&
    validateInput(taxes, taxesError, "Taxes", 0, true) &&
    validateInput(ads, adsError, "Ads", 0, true) &&
    validateInput(discount, discountError, "Discount", 0, true) &&
    validateInput(category, categoryError, "Category", 3)
  ) {
    const productData = {
      title: title.value.trim(),
      price: Number(price.value),
      taxes: Number(taxes.value),
      ads: Number(ads.value),
      discount: Number(discount.value),
      total: total.textContent,
      category: category.value.trim(),
    };
    if (submit.textContent === "Create") {
      let counter = Number(count.value);
      counter <= 0 ? (counter = 1) : counter;
      counter > 100 ? (counter = 100) : counter;
      for (let i = 0; i < counter; i++) {
        await httpRequest("products", "POST", productData);
      }
    } else {
      productData.id = editId /* INCLUDE "ID" PROPERTY TO FIX UNDEFINED ISSUE WHEN UPDATING A PRODUCT*/
      await httpRequest("products", "PUT", productData);
      submit.innerHTML = "Create";
      count.style.display = "";
      editId = "";
    }

    clearInputs();
    getProducts();
  }
});

//* CLEAR INPUTS /utils
function clearInputs() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  count.value = "";
  category.value = "";
  getTotal();
}

//* READ/SHOW DATA /products
getProducts();
async function getProducts() {
  let table = "";
  products = await httpRequest("products", "GET");
  if (products.length > 0) {
    clear.style.display = "";
    clear.innerHTML = `Clear All Data !!! (${products.length})`;
  } else {
    clear.style.display = "none";
    clear.innerHTML = ``;
  }

  for (let product of products) {
    table += generateContent(product);
  }
  document.getElementById("tbody").innerHTML = table;
}

function generateContent(product) { /* utils */
  return `
			<tr>
					<td>${product.id}</td>
					<td>${product.title}</td>
					<td>${product.price}</td>
					<td>${product.taxes}</td>
					<td>${product.ads}</td>
					<td>${product.discount}</td>
					<td>${product.total}</td>
					<td>${product.category}</td>
					<td>
					<button class="edit" id="${product.id}" onclick="editProduct('${product.id}')"><i class="fa-solid fa-pen"></i></button>
					<button class="remove" id="${product.id}" onclick="removeProduct('${product.id}')"><i class="fa-solid fa-trash"></i></button>
			</td>
			</tr>`;
}

// * DELETE PRODUCTS /products
async function removeProduct(id, multi) {
  await httpRequest("products", "DELETE", id);
  if (multi !== true) {
    getProducts();
  }
}

//* CLEAR DATA /products
clear.addEventListener("click", async () => {
  if (confirm("Are you sure?")) {
    for (let product of products) {
      await removeProduct(product.id, true);
    }
    getProducts();
  }
});

//* UPDATE /products
async function editProduct(id) {
  let product = await httpRequest("products", "GET", id);
  title.value = product.title;
  price.value = product.price;
  taxes.value = product.taxes;
  ads.value = product.ads;
  discount.value = product.discount;
  category.value = product.category;
  getTotal();
  count.style.display = "none";
  submit.innerHTML = "Update";
  editId = id;
  scroll({ top: 0, left: 0, behavior: "smooth" });
}
//
//* SEARCH /filter
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
  for (let product of products) {
    if (
      (placeholder === "Search By Title" && product.title.toLowerCase().trim().includes(value.toLowerCase().trim())) ||
      (placeholder === "Search By Category" &&
        product.category.toLowerCase().trim().includes(value.toLowerCase().trim()))
    ) {
      table += generateContent(product);
    }
  }
  document.getElementById("tbody").innerHTML = table;
}

//* VALIDATION FUNCTIONS /constants/dom/validation
const titleError = document.querySelector(".title-error");
const priceError = document.querySelector(".price-error");
const taxesError = document.querySelector(".taxes-error");
const adsError = document.querySelector(".ads-error");
const discountError = document.querySelector(".discount-error");
const categoryError = document.querySelector(".category-error");

title.addEventListener("input", () => validateInput(title, titleError, "Title", 3));
price.addEventListener("input", () => validateInput(price, priceError, "Price", 0, true));
taxes.addEventListener("input", () => validateInput(taxes, taxesError, "Taxes", 0, true));
ads.addEventListener("input", () => validateInput(ads, adsError, "Ads", 0, true));
discount.addEventListener("input", () => validateInput(discount, discountError, "Discount", 0, true));
category.addEventListener("input", () => validateInput(category, categoryError, "Category", 3));

function validateInput(element, errorBox, name, length, isNumber = false) {
  let errorMessage = "";
  if (element.value.trim() === "") {
    errorMessage = `${name} can't be blank!`;
  } else if (isNumber && element.value < 0) {
    errorMessage = `${name} must be 0 or greater!`;
  } else if (!isNumber && element.value.trim().length < length) {
    errorMessage = `${name} must be at least ${length} characters long!`;
  }
  if (errorMessage) {
    errorFunc(element, errorMessage, errorBox);
    return false;
  } else {
    errorClear(element, errorBox);
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

//* SCROLL TO TOP /scroll
window.onscroll = () => {
  btn.style.display = scrollY > 400 ? "block" : "";
};

btn.addEventListener("click", () => {
  scroll({ top: 0, left: 0, behavior: "smooth" });
});
