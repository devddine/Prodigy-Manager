/** @file important constants */


let global = {
  products : [],
  editId : "",
  errorMessage : "",
}


/**
 * API constants
 *
 * @type {{ baseUrl: string; defaultHeader: { "Content-type": string; }; }}
 */
const api = {
  baseUrl: "http://localhost:3030/",
  defaultHeader: {
    "Content-type": "application/json; charset=UTF-8",
  },
};

/**
 * DOM elements variables
 *
 * @type {{ themeToggle: any; title: any; price: any; taxes: any; ads: any; discount: any; total: any; count: any; category: any; submit: any; search: any; searchTitle: any; searchCategory: any; edit: any; remove: any; clear: any; btn: any; }}
 */
const domElements = {
  themeToggle: document.getElementById("themeToggle"),
  title: document.getElementById("title"),
  price: document.getElementById("price"),
  taxes: document.getElementById("taxes"),
  ads: document.getElementById("ads"),
  discount: document.getElementById("discount"),
  total: document.getElementById("total"),
  count: document.getElementById("count"),
  category: document.getElementById("category"),
  submit: document.getElementById("submit"),
  search: document.getElementById("search"),
  searchTitle: document.getElementById("searchTitle"),
  searchCategory: document.getElementById("searchCategory"),
  edit: document.getElementById("edit"),
  remove: document.getElementById("remove"),
  clear: document.getElementById("clear"),
  btn: document.getElementById("btn-scroll"),
  titleError: document.querySelector(".title-error"),
  priceError: document.querySelector(".price-error"),
  taxesError: document.querySelector(".taxes-error"),
  adsError: document.querySelector(".ads-error"),
  discountError: document.querySelector(".discount-error"),
  categoryError: document.querySelector(".category-error"),
};

export { global, api, domElements };
