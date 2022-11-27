//main.js
import {
    createPassword,
    readPasswords,
    deletePassword,
    updatePassword,
  } from "../../../../back-end/passwordHolderAPI.js";
  window.addEventListener("DOMContentLoaded", init);

let passwordArray = [];

function init(){
    initPage(passwordArray);
    // initCreateForm();
};

function initPage(array){
    array = readPasswords();
    let passwordList = document.getElementById("passwordList");
    if(array.length == 0){
        let noPasswordsMessage = document.createElement("p");
        noPasswordsMessage.textContent = "No passwords to show";
        noPasswordsMessage.className = "no-data-message"
        passwordList.appendChild(noPasswordsMessage);
    }
    else{
        for(let i = 0; i < array.length; i++){
            let card = document.createElement("passwordHolderCard");
            card.setAttribute("id", array[i]["id"]);
            card.data = array[i];
            // console.log(card.data);
            passwordList.appendChild(card);
        }
    }
};

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
}