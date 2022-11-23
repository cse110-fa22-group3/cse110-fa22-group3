window.addEventListener("DOMContentLoaded", init);

const choresVar = [];

let currentId = 0;
let selectedChore = 0;

function init() {
  initPage(choresVar);
  initFormHandler();
}

function initPage(chores) {
  const choresContainer = document.querySelector(".chores-container");

  while (choresContainer.childElementCount > 1) {
    choresContainer.removeChild(choresContainer.firstElementChild);
  }

  chores.forEach((chore) => {
    const card = document.createElement("chore-card");
    card.setAttribute("id", chore.id);
    card.data = chore;
    choresContainer.insertBefore(card, document.querySelector("#add-chore"));
  });

  const choreBoxes = document.querySelectorAll("chore-card");
  const editDiv = document.querySelector("#edit-background");
  const editChoreName = document.querySelector("form#edit input#e-chore-name");
  const editRoommateName = document.querySelector(
    "form#edit input#e-roommate-name"
  );

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

  editDeleteHandler();
}

// import {roommate} from './roommate'
function initFormHandler() {
  const newBox = document.querySelector("#add-chore");
  // let div = document.getElementById('background')
  // let btn_close = document.getElementById('close-button')
  const createDiv = document.querySelector("#create-background");
  const createClose = document.getElementById("create-close");
  const createForm = document.getElementById("create");

  const assignDiv = document.querySelector("#assign-background");
  const assignClose = document.getElementById("assign-close");
  const assignForm = document.getElementById("assign");

  const editDiv = document.querySelector("#edit-background");
  const editClose = document.getElementById("edit-close");
  const editForm = document.getElementById("edit");
  const editDelete = document.getElementById("delete-1");

  const editAssignDiv = document.querySelector("#edit-assign-background");
  const editAssignClose = document.getElementById("edit-assign-close");
  const editAssignForm = document.getElementById("edit-assign");
  const editAssignDelete = document.getElementById("delete-2");
  // const formEdit = document.querySelector('form.edit')

  let createData;

  createForm.addEventListener("submit", (event) => {
    event.preventDefault();
    // createChore(new FormData(form_create));

    createData = new FormData(createForm);

    createForm.reset();
    initPage(choresVar);
    createDiv.style.display = "none";
    assignDiv.style.display = "block";
  });

  newBox.onclick = function show() {
    createDiv.style.display = "block";
  };

  createClose.onclick = function close() {
    createDiv.style.display = "none";
    assignDiv.style.display = "none";
    createForm.reset();
    assignForm.reset();
  };

  assignForm.addEventListener("submit", (event) => {
    event.preventDefault();
    // createChore(new FormData(form_create));

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

  assignClose.onclick = function close() {
    createDiv.style.display = "none";
    assignDiv.style.display = "none";
    createForm.reset();
    assignForm.reset();
  };

  editForm.addEventListener("submit", (event) => {
    event.preventDefault();
    // createChore(new FormData(form_create));

    createData = new FormData(editForm);

    editForm.reset();
    initPage(choresVar);
    editDiv.style.display = "none";
    editAssignDiv.style.display = "block";
  });

  function editClosePress() {
    editDiv.style.display = "none";
    editAssignDiv.style.display = "none";
    editForm.reset();
    editAssignForm.reset();
  }

  editClose.onclick = editClosePress

  function deletePress() {
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
  }

  editDelete.onclick = deletePress

  editAssignForm.addEventListener("submit", (event) => {
    event.preventDefault();
    // createChore(new FormData(form_create));

    const assignData = new FormData(editForm);

    const new_chore = {
      id: currentId,
      choreName: createData.get("choreName"),
      roommateName: createData.get("roommateName"),
    };

    for (let i = 0; i < choresVar.length; i++) {
      if (choresVar[i].id == selectedChore) {
        choresVar[i].choreName = createData.get("choreName");
        choresVar[i].roommateName = createData.get("roommateName");
      }
    }

    editAssignForm.reset();
    initPage(choresVar);
    editAssignDiv.style.display = "none";
  });

  editAssignClose.onclick = editClosePress

  editAssignDelete.onclick = deletePress

  // form_edit.addEventListener('submit',edit)

  // if we have an array, loop through the array to add edit and del event listener to each roommate
  // demo for edit below

  // for(let roommate of roommates){
  // 	roommate.onclick=function displayForm(){
  // 		TODO: get the clicked roommate's data and display on the form
  // 		form.innerHTML=``//fill in
  // 		div.style.display = "block";//popup
  // 	}
  //
  // }
}

function editDeleteHandler() {
  const cards = document.querySelectorAll("roommate-card");

  const div = document.querySelector(".back2");
  const btnClose = document.getElementById("close-button2");
  const btnDel = document.getElementById("del-button");
  const btn2 = document.getElementById("btn2");
  const formUpdate = document.querySelector("form.update");

  cards.forEach((card) => {
    card.addEventListener("click", (event) => {
      div.style.display = "block";

      btnClose.onclick = function close() {
        div.style.display = "none";
      };

      btnDel.onclick = function () {
        deleteRoommate(event.target.id);
        initPage(readRoommate());
      };
      btn2.onclick = function () {
        updateRoommate(new FormData(formUpdate), event.target.id);
        initPage(readRoommate());
      };
    });
  });
}

/*
		// TODO:stringify and store to backend
		// below is directly inserting to DOM for showing how it works.
		// Maybe we want all the to be in an array and display the array
		document.querySelector('.row').insertBefore(roommate,document.querySelector('#new'))
	}
	function edit(e){
		//TODO: read updated data from form submission
		// e.preventDefault()
		// let formdata=new FormData(form);
		//TODO: store updated data to backend
	}
	function del(e){
*/
