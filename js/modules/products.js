import { getTotal, clearInputs, generateContent } from "./utils.js";
import { httpRequest } from "./api.js";

let products = [];
let editId = "";

//* READ/SHOW DATA /products
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

//* CREATE/UPDATE PRODUCTS /products
async function createProduct() {
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
      productData.id = editId;
      await httpRequest("products", "PUT", productData);
      submit.innerHTML = "Create";
      count.style.display = "";
      editId = "";
    }

    clearInputs();
    getProducts();
  }
}

async function editProduct(id) {
  let product = await httpRequest("products", "GET", id);
  title.value = product.title;
  price.value = product.price;
  taxes.value = product.taxes;
  ads.value = product.ads;
  discount.value = product.discount;
  category.value = product.category;
  count.style.display = "none";
  submit.innerHTML = "Update";
  editId = id;
  getTotal();
  scroll({ top: 0, left: 0, behavior: "smooth" });
}

async function removeProduct(id, multi = false) {
  await httpRequest("products", "DELETE", id);
  if (multi !== true) {
    getProducts();
  }
}

async function clearProducts() {
  if (confirm("Are you sure?")) {
    for (let product of products) {
      await removeProduct(product.id, true);
    }
    getProducts();
  }
}

export { getProducts, createProduct, editProduct, removeProduct, clearProducts };
