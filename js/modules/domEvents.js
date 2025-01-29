import { getTotal } from "./utils.js";
import { domElements } from "./constants.js";
import { toggleTheme } from "./theme.js";
import { createProduct, clearProducts } from "./products.js";
import { validateInput } from "./validation.js";
import { scrollTrigger,scrollTop } from "./scroll.js";

//* CALC TOTAL /dom/utils
function dom() {
  domElements.price.addEventListener("input", getTotal);
  domElements.taxes.addEventListener("input", getTotal);
  domElements.ads.addEventListener("input", getTotal);
  domElements.discount.addEventListener("input", getTotal);

  domElements.themeToggle.addEventListener("click", toggleTheme);

  domElements.submit.addEventListener("click", createProduct);
  domElements.clear.addEventListener("click", clearProducts);

  domElements.searchTitle.addEventListener("click", () => {
    domElements.search.placeholder = "Search By Title";
    searchData(domElements.search.value, domElements.search.placeholder);
  });
  domElements.searchCategory.addEventListener("click", () => {
    domElements.search.placeholder = "Search By Category";
    searchData(domElements.search.value, domElements.search.placeholder);
  });
  domElements.search.addEventListener("keyup", () => {
    searchData(domElements.search.value, domElements.search.placeholder);
  });

  domElements.title.addEventListener("input", () => validateInput(domElements.title, domElements.titleError, "Title", 3));
  domElements.price.addEventListener("input", () => validateInput(domElements.price, domElements.priceError, "Price", 0, true));
  domElements.taxes.addEventListener("input", () => validateInput(domElements.taxes, domElements.taxesError, "Taxes", 0, true));
  domElements.ads.addEventListener("input", () => validateInput(domElements.ads, domElements.adsError, "Ads", 0, true));
  domElements.discount.addEventListener("input", () => validateInput(domElements.discount, domElements.discountError, "Discount", 0, true));
  domElements.category.addEventListener("input", () => validateInput(domElements.category, domElements.categoryError, "Category", 3));

  window.addEventListener("scroll", scrollTrigger)
  domElements.btn.addEventListener("click", scrollTop)

}

export { dom };
