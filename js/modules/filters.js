import { products } from "./constants";
import { generateContent } from "./utils.js";

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

export { searchData };
