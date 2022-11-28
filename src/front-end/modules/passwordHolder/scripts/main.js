//main.js
import {
  createPassword,
  readPasswords,
  deletePassword,
  updatePassword,
  queryPasswordInfo,
  readIdCount,
} from "../../../../back-end/passwordHolderAPI.js";
window.addEventListener("DOMContentLoaded", init);

let passwordArray = [];

function init() {
  initPage(passwordArray);
  // initCreateForm();
}

function initPage(array) {
  array = readPasswords();
  if (array.length == 0) {
    createNoPasswordsMessage();
  } else {
    for (let i = 0; i < array.length; i++) {
      createCard(array[i]);
    }
  }
}
function createNoPasswordsMessage() {
  let passwordList = document.getElementById("passwordList");
  let noPasswordsMessage = document.createElement("p");
  noPasswordsMessage.setAttribute("id", "no-elements-present");
  noPasswordsMessage.textContent = "No passwords to show";
  noPasswordsMessage.className = "no-data-message";
  passwordList.appendChild(noPasswordsMessage);
}
function deleteNoPasswordsMessage() {
  let noPasswordsMessage = document.getElementById("no-elements-present");
  if (noPasswordsMessage == null) {
    return;
  }
  noPasswordsMessage.remove();
}
function createCard(data) {
  deleteNoPasswordsMessage();
  let passwordList = document.getElementById("passwordList");
  let cardButtonDiv = document.createElement("div");
  cardButtonDiv.setAttribute("class", "input-group");

  let card = document.createElement("password-holder-card");

  let deleteButtonSpan = document.createElement("span");
  deleteButtonSpan.setAttribute("class", "input-group-btn");

  let deleteButton = document.createElement("button");
  deleteButton.setAttribute(
    "class",
    "btn btn-md btn-outline-danger delete-button"
  );
  deleteButton.setAttribute("id", "password-card-delete-id-" + data["id"]);
  deleteButton.setAttribute("data-passwordId", data["id"]);
  cardButtonDiv.setAttribute("id", "password-card-div-" + data["id"]);
  let deleteButtonText = document.createTextNode("Delete");

  deleteButton.appendChild(deleteButtonText);
  card.setAttribute("id", "passwordCard" + data["id"]);
  card.setAttribute("data-value", data["id"]);
  card.data = data;
  deleteButtonSpan.appendChild(deleteButton);
  cardButtonDiv.appendChild(card);
  cardButtonDiv.appendChild(deleteButtonSpan);
  passwordList.appendChild(cardButtonDiv);

  document
    .getElementById("password-card-delete-id-" + data["id"])
    .addEventListener("click", deletePasswordClick);
  document
    .getElementById("passwordCard" + data["id"])
    .addEventListener("click", openInfoPasswordClick);
}

function openInfoPasswordClick() {
  let info = queryPasswordInfo(this["dataset"]["value"]);
  alert(`username: ${info.username} \npassword: ${info.password}`);
}

function deletePasswordClick() {
  let cardToBeDeleted = document.getElementById(
    "password-card-div-" + this.dataset["passwordid"]
  );
  deletePassword(this.dataset["passwordid"]);
  cardToBeDeleted.remove();
  if (readPasswords().length == 0) {
    createNoPasswordsMessage();
  }
}
document
  .getElementById("create-password-button")
  .addEventListener("click", createPasswordForm);
function createPasswordForm() {
  let account = document.getElementById("create-account-field").value;
  let username = document.getElementById("create-username-field").value;
  let password = document.getElementById("create-password-field").value;
  let newPassword = {
    key: account,
    username: username,
    password: password,
  };
  createPassword(newPassword);
  newPassword["id"] = readIdCount() - 1;
  createCard(newPassword);
}
