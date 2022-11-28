//main.js
import {
    createPassword,
    readPasswords,
    deletePassword,
    updatePassword,
    queryPasswordInfo,
    readIdCount
  } from "../../../../back-end/passwordHolderAPI.js";
  window.addEventListener("DOMContentLoaded", init);

let passwordArray = [];

function init(){
    initPage(passwordArray);
    // initCreateForm();
};

function initPage(array){
    array = readPasswords();
    if(array.length == 0){
        createNoPasswordsMessage()
    }
    else{
        for(let i = 0; i < array.length; i++){
            createCard(array[i]);
        }
    }
};
function createNoPasswordsMessage(){
    let passwordList = document.getElementById("passwordList");
    let noPasswordsMessage = document.createElement("p");
    noPasswordsMessage.setAttribute("id","no-elements-present");
    noPasswordsMessage.textContent = "No passwords to show";
    noPasswordsMessage.className = "no-data-message"
    passwordList.appendChild(noPasswordsMessage);
}
function deleteNoPasswordsMessage(){
    let noPasswordsMessage = document.getElementById("no-elements-present");
    if(noPasswordsMessage == null){
        return;
    }
    noPasswordsMessage.remove();
}
function createCard(data){
            deleteNoPasswordsMessage();
            let passwordList = document.getElementById("passwordList");
            let cardButtonDiv = document.createElement("div");
            cardButtonDiv.setAttribute("class","input-group");

            let card = document.createElement("password-holder-card");
            let buttonsSpan = document.createElement("span");
            buttonsSpan.setAttribute("class","input-group-btn");

            let deleteButton = document.createElement("button");
            let editButton = document.createElement("button");

            editButton.setAttribute("class", "btn btn-md btn-outline-warning edit-button");
            editButton.setAttribute("id","password-card-edit-id-" + data["id"]);
            editButton.setAttribute("data-passwordId",data["id"]);
            editButton.setAttribute("data-bs-toggle","modal");
            editButton.setAttribute("data-bs-target", "#editModal");
            let editButtonText = document.createTextNode("Edit");
            editButton.appendChild(editButtonText);

            deleteButton.setAttribute("class", "btn btn-md btn-outline-danger delete-button");
            deleteButton.setAttribute("id","password-card-delete-id-" + data["id"]);
            deleteButton.setAttribute("data-passwordId",data["id"]);
            cardButtonDiv.setAttribute("id","password-card-div-" + data["id"]);
            let deleteButtonText = document.createTextNode("Delete");
            deleteButton.appendChild(deleteButtonText);

            card.setAttribute("id", "passwordCard" + data["id"]);
            card.setAttribute("data-value", data["id"]);
            card.setAttribute("data-bs-toggle","modal");
            card.setAttribute("data-bs-target", "#infoModal");
            card.data = data;
            
            buttonsSpan.appendChild(editButton);
            buttonsSpan.appendChild(deleteButton);
            cardButtonDiv.appendChild(card);
            cardButtonDiv.appendChild(buttonsSpan);
            passwordList.appendChild(cardButtonDiv);

            document.getElementById("password-card-delete-id-"+data["id"]).addEventListener("click", deletePasswordClick);
            document.getElementById("passwordCard" + data["id"]).addEventListener("click",openInfoPasswordClick);
            document.getElementById("password-card-edit-id-" + data["id"]).addEventListener("click",passIdToEditButton);
}

function passIdToEditButton(){
    let buttonEdit = document.getElementById("edit-password-button");
    buttonEdit.setAttribute("data-passwordId",this.dataset['passwordid']);
}

function openInfoPasswordClick(){
    let info = queryPasswordInfo(this["dataset"]["value"]);
    let modalUsernameField = document.getElementById("insert-username-modal");
    let modalPasswordField = document.getElementById("insert-password-modal");
    console.log(info.password)
    modalUsernameField.innerText = info.username;
    modalPasswordField.innerText = info.password; 
}

function deletePasswordClick(){
    let cardToBeDeleted = document.getElementById("password-card-div-"+ this.dataset['passwordid'])
    deletePassword(this.dataset['passwordid']);
    cardToBeDeleted.remove();
    if(readPasswords().length == 0){
        createNoPasswordsMessage();
    }
}
document.getElementById("edit-password-button").addEventListener("click",editPasswordForm);
function editPasswordForm(){
    let account = document.getElementById("edit-account-field").value;
    let username =  document.getElementById("edit-username-field").value;
    let password =  document.getElementById("edit-password-field").value;
    let updatedPassword = {
        "key" : account,
        "username" : username,
        "password" : password
    };
    updatePassword(this.dataset['passwordid'],updatedPassword);
    let card = document.getElementById("passwordCard" + this.dataset['passwordid']);
    card.data = queryPasswordInfo(this.dataset['passwordid']);
}

document.getElementById("create-password-button").addEventListener("click", createPasswordForm);
function createPasswordForm(){
    let account = document.getElementById("create-account-field").value;
    let username =  document.getElementById("create-username-field").value;
    let password =  document.getElementById("create-password-field").value;
    let newPassword = {
        "key" : account,
        "username" : username,
        "password" : password
    };
    createPassword(newPassword);
    newPassword["id"] = readIdCount()-1;
    createCard(newPassword);
}