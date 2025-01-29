import { domElements } from "./constants.js";

//* SCROLL TO TOP /scroll
function scrollTrigger() {
  domElements.btn.style.display = scrollY > 400 ? "block" : "";
}

function scrollTop() {
  scroll({ top: 0, left: 0, behavior: "smooth" });
}

export { scrollTrigger, scrollTop };
