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

export { validateInput };
