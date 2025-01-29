import { getTotal } from "./utils.js";
import { domElements } from "./constants.js";
import { toggleTheme } from "./theme.js";
import { createProduct, clearProducts } from "./products.js";

//* CALC TOTAL /dom/utils
function dom() {
  domElements.price.addEventListener("input", getTotal);
  domElements.taxes.addEventListener("input", getTotal);
  domElements.ads.addEventListener("input", getTotal);
  domElements.discount.addEventListener("input", getTotal);
  domElements.themeToggle.addEventListener("click", toggleTheme);
  domElements.submit.addEventListener("click", createProduct);
  domElements.clear.addEventListener("click", clearProducts);
}

export { dom };
