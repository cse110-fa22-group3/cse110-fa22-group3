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

// empty password array for initialization
let passwordArray = [];

/**
 * init handles implementing the javascript code on start
 */
function init(){
    initPage(passwordArray);
};

/**
 * initPage handles the creation of the cards on the page when loaded.
 * @param {Array} array provided by the initialization of the page
 */
function initPage(array){
    // initialize array with data from localstorage
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

/**
 * createNoPasswordsMessage handles adding a placeholder text if there are no
 * passwords that have been created by the user.
 */
function createNoPasswordsMessage(){
    let passwordList = document.getElementById("passwordList");
    let noPasswordsMessage = document.createElement("p");
    noPasswordsMessage.setAttribute("id","no-elements-present");
    noPasswordsMessage.textContent = "No passwords to show";
    noPasswordsMessage.className = "no-data-message"
    passwordList.appendChild(noPasswordsMessage);
};

/**
 * deleteNoPasswordsMessage handles removing the placeholdertext if there were
 * no passwords present.
 */
function deleteNoPasswordsMessage(){
    let noPasswordsMessage = document.getElementById("no-elements-present");
    if(noPasswordsMessage == null){
        return;
    }
    noPasswordsMessage.remove();
};

/**
 * createCard handles the creation of a card on the password holder page.
 * It takes care of all button functionalities and data presentation throughout
 * the card element.
 * @param {Object} data which has the information for what should be put in the card
 * through the API
 */
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
};

/**
 * passIdToEditButton handles the event in where the edit button is pressed
 * for a specific card. In this situation the edit button will pass the card
 * id to the modal's edit button so we can edit the specific card we are working
 * on.
 */
function passIdToEditButton(){
    let buttonEdit = document.getElementById("edit-password-button");
    buttonEdit.setAttribute("data-passwordId",this.dataset['passwordid']);
};

/**
 * openInfoPasswordClick handles the event where we press on the card.
 * We then serve the user a modal with the information regarding the username
 * and password credentials for a given shared account.
 */
function openInfoPasswordClick(){
    let info = queryPasswordInfo(this["dataset"]["value"]);
    let modalUsernameField = document.getElementById("insert-username-modal");
    let modalPasswordField = document.getElementById("insert-password-modal");
    console.log(info.password)
    modalUsernameField.innerText = info.username;
    modalPasswordField.innerText = info.password; 
};

/**
 * deletePasswordClick handles the event where we press the delete button
 * for a specific card. In this scenario we take the id associated with the
 * card we pressed the delete for and respond by removing the card from the 
 * dom and its information from localStorage.
 */
function deletePasswordClick(){
    let cardToBeDeleted = document.getElementById("password-card-div-"+ this.dataset['passwordid'])
    deletePassword(this.dataset['passwordid']);
    cardToBeDeleted.remove();
    if(readPasswords().length == 0){
        createNoPasswordsMessage();
    }
};

document.getElementById("edit-password-button").addEventListener("click",editPasswordForm);

/**
 * editPasswordForm handles the event where we confirm the edit in the edit modal
 * for a given card. This will communicate with the back end update API to fix the
 * localStorage accordingly and update the card to have the proper account name.
 */
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
    document.getElementById("edit-account-field").value = '';
    document.getElementById("edit-username-field").value = '';
    document.getElementById("edit-password-field").value = '';
};

document.getElementById("create-password-button").addEventListener("click", createPasswordForm);

/**
 * createPasswordForm handles the event where we press on the create 
 * modal's create button. We will then create a new card and attach it to 
 * the DOM aswell as update the localStorage with the new information.
 */
function createPasswordForm(){
    // gather form information
    let account = document.getElementById("create-account-field").value;
    let username =  document.getElementById("create-username-field").value;
    let password =  document.getElementById("create-password-field").value;
    let newPassword = {
        "key" : account,
        "username" : username,
        "password" : password
    };
    // call api to update local storage with new creation
    createPassword(newPassword);
    newPassword["id"] = readIdCount()-1;

    // dynamically create a new card
    createCard(newPassword);

    // clear fields for next button press
    document.getElementById("create-account-field").value = '';
    document.getElementById("create-username-field").value = '';
    document.getElementById("create-password-field").value = '';
};
