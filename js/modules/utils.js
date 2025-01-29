import { domElements } from "./constants.js";

function getTotal() {
  let totalValue =
    Number(domElements.price.value) +
    Number(domElements.taxes.value) +
    Number(domElements.ads.value) -
    Number(domElements.discount.value);

  if (totalValue > 0) {
    domElements.total.innerHTML = totalValue;
    domElements.total.style.background = "#007F00";
  } else if (totalValue < 0) {
    domElements.total.innerHTML = totalValue;
    domElements.total.style.background = "#800000";
  } else {
    domElements.total.innerHTML = "0";
    domElements.total.style.background = "";
  }
}

//* CLEAR INPUTS /utils
function clearInputs() {
  domElements.title.value = "";
  domElements.price.value = "";
  domElements.taxes.value = "";
  domElements.ads.value = "";
  domElements.discount.value = "";
  domElements.count.value = "";
  domElements.category.value = "";
  getTotal();
}

function generateContent(product) {
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

export { getTotal, clearInputs, generateContent };
