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
};

function initPage(array){
    array = readPasswords();
    let select = document.getElementById('password-selector');
    for(let i = 0; i < array.length; i++){
        let account = array[i]["key"];
        let tempOption = document.createElement("option");
        tempOption.value = account;
        tempOption.textContent = account;
        select.appendChild(tempOption);
    }

};