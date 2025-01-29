import { getTotal, clearInputs, generateContent } from "./utils.js";
import { httpRequest } from "./api.js";
import { domElements, global } from "./constants.js";

//* READ/SHOW DATA /products
async function getProducts() {
  let table = "";
  global.products = await httpRequest("products", "GET");
  if (global.products.length > 0) {
    domElements.clear.style.display = "";
    domElements.clear.innerHTML = `Clear All Data !!! (${global.products.length})`;
  } else {
    domElements.clear.style.display = "none";
    domElements.clear.innerHTML = ``;
  }

  for (let product of global.products) {
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
      title: domElements.title.value.trim(),
      price: Number(domElements.price.value),
      taxes: Number(domElements.taxes.value),
      ads: Number(domElements.ads.value),
      discount: Number(domElements.discount.value),
      total: domElements.total.textContent,
      category: domElements.category.value.trim(),
    };
    if (domElements.submit.textContent === "Create") {
      let counter = Number(domElements.count.value);
      counter <= 0 ? (counter = 1) : counter;
      counter > 100 ? (counter = 100) : counter;
      for (let i = 0; i < counter; i++) {
        await httpRequest("products", "POST", productData);
      }
    } else {
      productData.id = global.editId;
      await httpRequest("products", "PUT", productData);
      domElements.submit.innerHTML = "Create";
      domElements.count.style.display = "";
      global.editId = "";
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
