/** @file manage theme operations */
import { httpRequest } from "./api.js";


async function getTheme() {
  let savedTheme = await httpRequest("theme", "GET");
  if (savedTheme) {
    document.documentElement.setAttribute("data-theme", savedTheme.website);
  }
}


async function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute("data-theme");
  const newTheme = currentTheme === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", newTheme);
  await httpRequest("theme", "PUT", newTheme);
}


export { getTheme, toggleTheme };