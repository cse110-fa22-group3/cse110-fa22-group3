import {
  readChores,
  queryChore,
  createChore,
  updateChore,
  closeChore,
  reOpenChore,
  clearArchive,
  checkDate,
  inCharge,
  removeFromChore,
} from "../../../../back-end/ChoresListAPI.js";

window.addEventListener("DOMContentLoaded", init);

const choresVar = [];

let currentId = 0;
let selectedChore = 0;

// The div that contains all the chores
const choresContainer = document.querySelector(".chores-container");

// The div that contains the edit popup, and the text fields for chore and roommate name
const editDiv = document.querySelector("#edit-background");
const editChoreName = document.querySelector("form#edit input#e-chore-name");
const editRoommateName = document.querySelector("form#edit input#e-roommate-name");

/**
 * init()
 */
function init() {
  initPage(choresVar);
  createFormHandler();
  editFormHandler();
}

function initPage(chores) {

  // Removes all chores from the page
  while (choresContainer.childElementCount > 1) {
    choresContainer.removeChild(choresContainer.firstElementChild);
  }

  // Creates a chore for each chore
  chores.forEach((chore) => {
    const card = document.createElement("chore-card");
    card.setAttribute("id", chore.id);
    card.data = chore;
    choresContainer.insertBefore(card, document.querySelector("#add-chore"));
  });

  // Gets all the chore boxes that were made
  const choreBoxes = document.querySelectorAll("chore-card");

  // Sets all the chore boxes to respond to "edit" clicking
  choreBoxes.forEach((card) => {
    card.addEventListener("click", (event) => {
      selectedChore = card.getAttribute("id");
      editDiv.style.display = "block";
      for (let i = 0; i < choresVar.length; i++) {
        if (choresVar[i].id == selectedChore) {
          editChoreName.value = choresVar[i].choreName;
          editRoommateName.value = choresVar[i].roommateName;
        }
      }
    });
  });
}

function createFormHandler() {
  
  // stores the form data
  let createData;

  // the "add" box
  const newBox = document.querySelector("#add-chore");

  // the divs with the create page 1 and 2 popups
  const createDiv = document.querySelector("#create-background");
  const assignDiv = document.querySelector("#assign-background");

  // the divs with the create page 1 and 2 close buttons
  const createClose = document.getElementById("create-close");
  const assignClose = document.getElementById("assign-close");

  // the divs with the create page 1 and 2 forms
  const createForm = document.getElementById("create");
  const assignForm = document.getElementById("assign");

  // ADD BUTTON functionality
  newBox.onclick = function show() {
    createDiv.style.display = "block";
  };

  // CLOSE BUTTON functionality (create page 1)
  createClose.onclick = function close() {
    createDiv.style.display = "none";
    createForm.reset();
  };

  // CLOSE BUTTON functionality (create page 2)
  assignClose.onclick = function close() {
    assignDiv.style.display = "none";
    assignForm.reset();
  };

  // SUBMIT BUTTON functionality (create page 1)
  createForm.addEventListener("submit", (event) => {
    event.preventDefault();

    createData = new FormData(createForm);

    createForm.reset();
    initPage(choresVar);
    createDiv.style.display = "none";
    assignDiv.style.display = "block";
  });

  // SUBMIT BUTTON functionality (create page 2)
  assignForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const assignData = new FormData(createForm);

    currentId++;
    const new_chore = {
      id: currentId,
      choreName: createData.get("choreName"),
      roommateName: createData.get("roommateName"),
    };

    choresVar.push(new_chore);

    assignForm.reset();
    initPage(choresVar);
    assignDiv.style.display = "none";
  });

}

function editFormHandler() {
  
  // the divs that contain the popup boxes for edit page 1 and 2
  const editDiv = document.querySelector("#edit-background");
  const editAssignDiv = document.querySelector("#edit-assign-background");

  // the close buttons for edit page 1 and 2
  const editClose = document.getElementById("edit-close");
  const editAssignClose = document.getElementById("edit-assign-close");

  // the forms for edit page 1 and 2
  const editForm = document.getElementById("edit");
  const editAssignForm = document.getElementById("edit-assign");

  // the delete button for edit page 1 and 2
  const editDelete = document.getElementById("delete-1");
  const editAssignDelete = document.getElementById("delete-2");

  // the form data
  let editData;

  // SUBMIT BUTTON for edit page 1
  editForm.addEventListener("submit", (event) => {
    event.preventDefault();
    // createChore(new FormData(form_create));

    editData = new FormData(editForm);

    editForm.reset();
    initPage(choresVar);
    editDiv.style.display = "none";
    editAssignDiv.style.display = "block";
  });

  // CLOSE BUTTON for edit page 1
  editClose.onclick = function editClosePress() {
    editDiv.style.display = "none";
    editForm.reset();
  };

  editDelete.onclick = function deletePress() {
    for (let i = 0; i < choresVar.length; i++) {
      if (choresVar[i].id == selectedChore) {
        choresVar.splice(i, 1);
        editDiv.style.display = "none";
        editAssignDiv.style.display = "none";
        editForm.reset();
        editAssignForm.reset();
        initPage(choresVar);
      }
    }
  };

  // SUBMIT BUTTON for edit page 2
  editAssignForm.addEventListener("submit", (event) => {
    event.preventDefault();
    // createChore(new FormData(form_create));

    const assignData = new FormData(editForm);

    const new_chore = {
      id: currentId,
      choreName: editData.get("choreName"),
      roommateName: editData.get("roommateName"),
    };

    for (let i = 0; i < choresVar.length; i++) {
      if (choresVar[i].id == selectedChore) {
        choresVar[i].choreName = editData.get("choreName");
        choresVar[i].roommateName = editData.get("roommateName");
      }
    }

    editAssignForm.reset();
    initPage(choresVar);
    editAssignDiv.style.display = "none";
  });

  editAssignClose.onclick = function close() {
    editAssignDiv.style.display = "none";
    editAssignForm.reset();
  };

  editAssignDelete.onclick = function deletePress() {
    for (let i = 0; i < choresVar.length; i++) {
      if (choresVar[i].id == selectedChore) {
        choresVar.splice(i, 1);
        editDiv.style.display = "none";
        editAssignDiv.style.display = "none";
        editForm.reset();
        editAssignForm.reset();
        initPage(choresVar);
      }
    }
  };

}