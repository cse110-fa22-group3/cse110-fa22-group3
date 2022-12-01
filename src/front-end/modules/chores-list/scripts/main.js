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
} from "../../../../back-end/choresListAPI.js";

import {
  readRoommate,
} from "../../../../back-end/roommateListAPI.js";

window.addEventListener("DOMContentLoaded", init);

let selectedChore = 0;
let weekOffset = 0;

// The div that contains all the chores
const choresContainer = document.querySelector(".chores-container");

// The div that contains the edit popup, and the text fields for chore and roommate name
const editDiv = document.querySelector("#edit-background");
const editChoreName = document.querySelector("form#edit input#e-chore-name");
const editRoommateName = document.querySelector("form#edit select#e-roommate-name");
const editDescription = document.querySelector("form#edit textarea#e-description");

/**
 * init()
 */
function init() {
  initPage();
  setupPage(readChores().chores);
  createFormHandler();
  editFormHandler();
}

function initPage() {
  const lastWeekButton = document.getElementById('last-week-button');
  const nextWeekButton = document.getElementById('next-week-button');
  const thisWeekButton = document.getElementById('week-header');

  const weekHeader = document.getElementById('week-header')
  weekHeader.textContent = getCurrentWeek(weekOffset);

  lastWeekButton.addEventListener('click', () => {
    weekOffset--;
    weekHeader.textContent = getCurrentWeek(weekOffset);
    setupPage(readChores().chores);
  })

  nextWeekButton.addEventListener('click', () => {
    weekOffset++;
    weekHeader.textContent = getCurrentWeek(weekOffset);
    setupPage(readChores().chores);
  })

  thisWeekButton.addEventListener('click', () => {
    weekOffset = 0;
    weekHeader.textContent = getCurrentWeek(weekOffset);
    setupPage(readChores().chores);
  })
}

function setupPage(chores) {

  // Removes all chores from the page
  while (choresContainer.childElementCount > 1) {
    choresContainer.removeChild(choresContainer.firstElementChild);
  }

  // Creates a chore for each chore
  chores.forEach((chore) => {
    const card = document.createElement("chore-card");
    card.setAttribute("id", chore["id"]);

    // TODO getRoommate
    let roommateIndex = chore["assignee"].indexOf(chore["currRoommate"]);
    let totalAssignees = chore["assignee"].length;
    roommateIndex = (roommateIndex + (weekOffset % totalAssignees) + totalAssignees) % totalAssignees;

    card.data = {choreName: chore["title"], roommateName: getRoommate(chore["assignee"][roommateIndex]).name, description: chore["description"]};
    choresContainer.insertBefore(card, document.querySelector("#add-chore"));
  });

  // Gets all the chore boxes that were made
  const choreBoxes = document.querySelectorAll("chore-card");

  let roommates = readRoommate();

  const selectRoommate = document.getElementById("c-roommate-name");
  const selectRoommateEdit = document.getElementById("e-roommate-name");

  while (selectRoommate.firstChild) {
    selectRoommate.removeChild(selectRoommate.firstChild);
  }

  while (selectRoommateEdit.firstChild) {
    selectRoommateEdit.removeChild(selectRoommateEdit.firstChild);
  }

  for (let i = 0; i < roommates.length; i++) {
    const roommateSelect = document.createElement("option");
    roommateSelect.setAttribute("value", roommates[i]["id"]);
    roommateSelect.innerText = roommates[i]["name"]
    selectRoommate.appendChild(roommateSelect);
    
    const roommateSelectEdit = document.createElement("option");
    roommateSelectEdit.setAttribute("value", roommates[i]["id"]);
    roommateSelectEdit.innerText = roommates[i]["name"]
    selectRoommateEdit.appendChild(roommateSelectEdit);
  }

  // Sets all the chore boxes to respond to "edit" clicking
  choreBoxes.forEach((card) => {
    card.addEventListener("click", (event) => {
      selectedChore = card.getAttribute("id");
      editDiv.style.display = "block";
      for (let i = 0; i < chores.length; i++) {
        if (chores[i].id == selectedChore) {
          editChoreName.value = chores[i]['title'];
          editRoommateName.value = chores[i]['currRoommate'];
          editDescription.value = chores[i]['description'];
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

  // the select field for choosing a roommate
  const selectRoommate = document.getElementById("c-roommate-name");

  // ADD BUTTON functionality
  newBox.onclick = function show() {
    createDiv.style.display = "block";
    selectRoommate.selectedIndex = -1;
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
    initRoommateAssignment(parseInt(createData.get('roommateName')), 0, "create");
    
    createDiv.style.display = "none";
    assignDiv.style.display = "block";
  });

  // SUBMIT BUTTON functionality (create page 2)
  assignForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const assignData = new FormData(assignForm);

    createChore({
      title: createData.get("choreName"),
      description: createData.get("choreDescription"),
      assignee: getAssignees(assignData, parseInt(createData.get('roommateName'))),
      assignedDate: getTodaysDate(),
    });

    assignForm.reset();
    weekOffset = 0;
    setupPage(readChores().chores);
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
    initRoommateAssignment(parseInt(editData.get('roommateName')), selectedChore, 'edit');
    editDiv.style.display = "none";
    editAssignDiv.style.display = "block";
  });

  // CLOSE BUTTON for edit page 1
  editClose.onclick = function editClosePress() {
    editDiv.style.display = "none";
    editForm.reset();
  };

  // DELETE BUTTON for edit page 1
  editDelete.onclick = function deletePress() {
    editDiv.style.display = "none";
    editAssignDiv.style.display = "none";
    editForm.reset();
    editAssignForm.reset();
    closeChore(selectedChore);
    weekOffset = 0;
    setupPage(readChores().chores);
  };

  // SUBMIT BUTTON for edit page 2
  editAssignForm.addEventListener("submit", (event) => {
    event.preventDefault();
    // createChore(new FormData(form_create));

    const assignData = new FormData(editAssignForm);

    updateChore(selectedChore, "update", {
      title: editData.get('choreName'),
      description: editData.get('choreDescription'),
      assignee: getAssignees(assignData, parseInt(editData.get('roommateName'))),
      assignedDate: getTodaysDate(),
      status: 'open',
    })

    editAssignForm.reset();
    weekOffset = 0;
    setupPage(readChores().chores);
    editAssignDiv.style.display = "none";
  });

  // CLOSE BUTTON for edit page 2
  editAssignClose.onclick = function close() {
    editAssignDiv.style.display = "none";
    editAssignForm.reset();
  };

  // DELETE BUTTON for edit page 2
  editAssignDelete.onclick = function deletePress() {
    editDiv.style.display = "none";
    editAssignDiv.style.display = "none";
    editForm.reset();
    editAssignForm.reset();
    closeChore(selectedChore);
    weekOffset = 0;
    setupPage(readChores().chores);
  };

}

function getRoommate(id) {
  let roommates = readRoommate();

  for (let i = 0; i < roommates.length; i++) {
    if (roommates[i].id == id) return roommates[i];
  }

  return null;
}

function initRoommateAssignment(selectedRoommate, chore, popup) {
  let roommates = readRoommate();
  if (popup == "create") {
    const assignees = document.getElementById("assignees-list-create");
    while (assignees.firstChild) {
      assignees.removeChild(assignees.firstChild);
    }
    for (let i = 0; i < roommates.length; i++) {
      if (roommates[i].id != selectedRoommate) {
        let newDiv = document.createElement('div');
        newDiv.setAttribute('class', 'assignee-box-and-label');
        newDiv.innerHTML = `
        <input class="assignee-checkbox" type="checkbox" name="assignees" id="checkbox-${roommates[i].id}" value="${roommates[i].id}"><br>
        <label class="assignee-name" for="checkbox-${roommates[i].id}">${roommates[i].name}</label><br>
        `;
        assignees.append(newDiv);
      } else {
        let newDiv = document.createElement('div');
        newDiv.setAttribute('class', 'assignee-box-and-label');
        newDiv.innerHTML = `
        <input class="assignee-checkbox" type="checkbox" name="assignees" id="checkbox-${roommates[i].id}" value="${roommates[i].id}" onclick="return false;" checked><br>
        <label class="assignee-name" for="checkbox-${roommates[i].id}"><b>${roommates[i].name}</b></label><br>
        `;
        assignees.append(newDiv);
      }
    }
  } else if (popup == "edit") {
    const assignees = document.getElementById("assignees-list-edit");
    while (assignees.firstChild) {
      assignees.removeChild(assignees.firstChild);
    }
    for (let i = 0; i < roommates.length; i++) {
      if (roommates[i].id != selectedRoommate) {
        let isSelected = queryChore('open', chore)['assignee'].includes(roommates[i].id);
        let selectText = isSelected ? ' checked' : '';

        let newDiv = document.createElement('div');
        newDiv.setAttribute('class', 'assignee-box-and-label');
        newDiv.innerHTML = `
        <input class="assignee-checkbox" type="checkbox" name="assignees" id="checkbox-${roommates[i].id}" value="${roommates[i].id}"${selectText}><br>
        <label class="assignee-name" for="checkbox-${roommates[i].id}">${roommates[i].name}</label><br>
        `;
        assignees.append(newDiv);
      } else {
        let newDiv = document.createElement('div');
        newDiv.setAttribute('class', 'assignee-box-and-label');
        newDiv.innerHTML = `
        <input class="assignee-checkbox" type="checkbox" name="assignees" id="checkbox-${roommates[i].id}" value="${roommates[i].id}" onclick="return false;" checked><br>
        <label class="assignee-name" for="checkbox-${roommates[i].id}"><b>${roommates[i].name}</b></label><br>
        `;
        assignees.append(newDiv);
      }
    }
  }
}

function getAssignees(formData, selectedRoommate) {
  let roommates = readRoommate();
  let startList = []
  let endList = []
  let foundSelected = false;
  for (var pair of formData.entries()) {
    if (pair[1] == selectedRoommate) foundSelected = true;

    if (foundSelected) startList.push(parseInt(pair[1]));
    else endList.push(parseInt(pair[1]));
  }
  return startList.concat(endList);
}

function getCurrentWeek(offset) {
  let today = new Date();
  today.setDate(today.getDate() + (offset * 7));
  let dayOfWeek = today.getDay();

  let weekStart = new Date(today);
  weekStart.setDate(weekStart.getDate() - dayOfWeek);

  let weekEnd = new Date(weekStart);
  weekEnd.setDate(weekEnd.getDate() + 6);

  let weekStartText = (weekStart.getMonth() + 1) + '/' + weekStart.getDate() + '/' + (weekStart.getFullYear() + "").substring(2,4);
  let weekEndText = (weekEnd.getMonth() + 1) + '/' + weekEnd.getDate() + '/' + (weekEnd.getFullYear() + "").substring(2,4);

  if (offset != 0) return "Week of " + weekStartText + " to " + weekEndText + "";
  return "This Week";
}

function getTodaysDate() {
  let today = new Date();
  return (today.getMonth() + 1) + '/' + today.getDate() + '/' + today.getFullYear();
}