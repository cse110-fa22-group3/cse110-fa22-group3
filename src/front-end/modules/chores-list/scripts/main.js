window.addEventListener("DOMContentLoaded", init);

const chores_var = [];

let currentId = 0;
let selectedChore = 0;

function init() {
  initPage(chores_var);
  initFormHandler();
}

function initPage(chores) {
  const chores_container = document.querySelector(".chores-container");

  while (chores_container.childElementCount > 1) {
    chores_container.removeChild(chores_container.firstElementChild);
  }

  chores.forEach((chore) => {
    const card = document.createElement("chore-card");
    card.setAttribute("id", chore.id);
    card.data = chore;
    chores_container.insertBefore(card, document.querySelector("#add-chore"));
  });

  const choreBoxes = document.querySelectorAll("chore-card");
  const edit_div = document.querySelector("#edit-background");
  const edit_chore_name = document.querySelector(
    "form#edit input#e-chore-name"
  );
  const edit_roommate_name = document.querySelector(
    "form#edit input#e-roommate-name"
  );

  choreBoxes.forEach((card) => {
    card.addEventListener("click", (event) => {
      selectedChore = card.getAttribute("id");
      edit_div.style.display = "block";

      for (let i = 0; i < chores_var.length; i++) {
        if (chores_var[i].id == selectedChore) {
          edit_chore_name.value = chores_var[i].choreName;
          edit_roommate_name.value = chores_var[i].roommateName;
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
  const create_div = document.querySelector("#create-background");
  const create_close = document.getElementById("create-close");
  const create_form = document.getElementById("create");

  const assign_div = document.querySelector("#assign-background");
  const assign_close = document.getElementById("assign-close");
  const assign_form = document.getElementById("assign");

  const edit_div = document.querySelector("#edit-background");
  const edit_close = document.getElementById("edit-close");
  const edit_form = document.getElementById("edit");
  const edit_delete = document.getElementById("delete-1");

  const edit_assign_div = document.querySelector("#edit-assign-background");
  const edit_assign_close = document.getElementById("edit-assign-close");
  const edit_assign_form = document.getElementById("edit-assign");
  const edit_assign_delete = document.getElementById("delete-2");
  // let form_edit = document.querySelector('form.edit')

  let createData;

  create_form.addEventListener("submit", (event) => {
    event.preventDefault();
    // createChore(new FormData(form_create));

    createData = new FormData(create_form);

    create_form.reset();
    initPage(chores_var);
    create_div.style.display = "none";
    assign_div.style.display = "block";
  });

  newBox.onclick = function show() {
    create_div.style.display = "block";
  };

  create_close.onclick = function close() {
    create_div.style.display = "none";
    assign_div.style.display = "none";
    create_form.reset();
    assign_form.reset();
  };

  assign_form.addEventListener("submit", (event) => {
    event.preventDefault();
    // createChore(new FormData(form_create));

    const assignData = new FormData(create_form);

    currentId++;
    const new_chore = {
      id: currentId,
      choreName: createData.get("choreName"),
      roommateName: createData.get("roommateName"),
    };

    chores_var.push(new_chore);

    assign_form.reset();
    initPage(chores_var);
    assign_div.style.display = "none";
  });

  assign_close.onclick = function close() {
    create_div.style.display = "none";
    assign_div.style.display = "none";
    create_form.reset();
    assign_form.reset();
  };

  edit_form.addEventListener("submit", (event) => {
    event.preventDefault();
    // createChore(new FormData(form_create));

    createData = new FormData(edit_form);

    edit_form.reset();
    initPage(chores_var);
    edit_div.style.display = "none";
    edit_assign_div.style.display = "block";
  });

  edit_close.onclick = function close() {
    edit_div.style.display = "none";
    edit_assign_div.style.display = "none";
    edit_form.reset();
    edit_assign_form.reset();
  };

  edit_delete.onclick = function close() {
    for (let i = 0; i < chores_var.length; i++) {
      if (chores_var[i].id == selectedChore) {
        chores_var.splice(i, 1);
        edit_div.style.display = "none";
        edit_assign_div.style.display = "none";
        edit_form.reset();
        edit_assign_form.reset();
        initPage(chores_var);
      }
    }
  };

  edit_assign_form.addEventListener("submit", (event) => {
    event.preventDefault();
    // createChore(new FormData(form_create));

    const assignData = new FormData(edit_form);

    const new_chore = {
      id: currentId,
      choreName: createData.get("choreName"),
      roommateName: createData.get("roommateName"),
    };

    for (let i = 0; i < chores_var.length; i++) {
      if (chores_var[i].id == selectedChore) {
        chores_var[i].choreName = createData.get("choreName");
        chores_var[i].roommateName = createData.get("roommateName");
      }
    }

    edit_assign_form.reset();
    initPage(chores_var);
    edit_assign_div.style.display = "none";
  });

  edit_assign_close.onclick = function close() {
    edit_div.style.display = "none";
    edit_assign_div.style.display = "none";
    edit_form.reset();
    edit_assign_form.reset();
  };

  edit_assign_delete.onclick = function close() {
    for (let i = 0; i < chores_var.length; i++) {
      if (chores_var[i].id == selectedChore) {
        chores_var.splice(i, 1);
        edit_div.style.display = "none";
        edit_assign_div.style.display = "none";
        edit_form.reset();
        edit_assign_form.reset();
        initPage(chores_var);
      }
    }
  };

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
  const btn_close = document.getElementById("close-button2");
  const btn_del = document.getElementById("del-button");
  const btn2 = document.getElementById("btn2");
  const form_update = document.querySelector("form.update");

  cards.forEach((card) => {
    card.addEventListener("click", (event) => {
      div.style.display = "block";

      btn_close.onclick = function close() {
        div.style.display = "none";
      };

      btn_del.onclick = function () {
        deleteRoommate(event.target.id);
        initPage(readRoommate());
      };
      btn2.onclick = function () {
        updateRoommate(new FormData(form_update), event.target.id);
        initPage(readRoommate());
      };
    });
  });
}

function close() {
  for (let i = 0; i < chores_var.length; i++) {
    if (chores_var[i].id == selectedChore) {
      chores_var.splice(i, 1);
      edit_div.style.display = "none";
      edit_assign_div.style.display = "none";
      edit_form.reset();
      edit_assign_form.reset();
      initPage(chores_var);
    }
  }
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
