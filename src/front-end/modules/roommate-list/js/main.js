//main.js for roommateList

import {
  createRoommate,
  readRoommate,
  updateRoommate,
  deleteRoommate,
} from "../../../../back-end/roommateListAPI.js";

//page loads, calls init function
window.addEventListener("DOMContentLoaded", init);

/** Starts the program, all our function calls
 *  come from our init function
 */
function init() {
  //load the cards in the page with the current list of roommates
  loadCards(readRoommate());

  //initialize the add button
  addHandler();
}

/** loadCards, reads in our roommates from the local storage and
 *  creates a new element roommate-card for each roommate that will
 *  be present on the page when it is loaded in.
 * @param {Array<object>} roommates an array of roommates
 */
function loadCards(roommates) {
  //find the row element where all of the cards are
  const row = document.querySelector(".row");

  //remove all of the cards except the add button
  while (row.childElementCount > 1) {
    row.removeChild(row.firstElementChild);
  }

  //add a card for each roommate in the list
  roommates.forEach((roommate) => {
    //create the custom element roommate-card
    const card = document.createElement("roommate-card");
    //set the attribute as the roommate's unique id
    card.setAttribute("id", roommate["id"]);
    //set the data of the roommate
    card.data = roommate;
    //insert it as the first card in the row
    row.insertBefore(card, document.querySelector("#new.item"));
  });

  //initialize the update/delete buttons for when any of the cards are clicked
  updateDelHandler();
}

/** addHandler, provides the functionality for showing/hiding the
 *  popup, and submitting the new roommate data. This function should
 *  only be executed once, as there is only one add button.
 */
function addHandler() {
  //node for the add form
  const addForm = document.querySelector("form.add");
  //node for the popup showing the add form
  const addPopup = document.querySelector("#background-1");
  //node for the add button in the popup
  const addBtn = document.querySelector("#new.item");
  //node for the close button in the popup
  const closeBtn = document.getElementById("close-button-1");

  //when submit button is clicked, call the add function
  addForm.addEventListener("submit", add);

  function add(event) {
    //prevent refreshing the page
    event.preventDefault();
    //hide the popup
    addPopup.style.display = "none";
    //create a new roommate using the form data
    createRoommate(new FormData(addForm));
    //clear the entries in the form
    addForm.reset();
    //reload the cards with the new list of roommates
    loadCards(readRoommate());
  }

  //when the add button is clicked, show the popup
  addBtn.onclick = function show() {
    addPopup.style.display = "block";
  };

  //when the close button is clicked, hide the popup
  closeBtn.onclick = function close() {
    addPopup.style.display = "none";
  };
}

/** updateDelHandler, handles when a roommate-card gets deleted or updated. The function
 *  will add the updated roommate list to local storage. Provides the functionality to
 *  show/hide a popup where people can input information for updating or deleting
 *  a roommate. This function should be executed multiple times, occuring when any
 *  CRUD operations occur.
 */
function updateDelHandler() {
  //list of nodes for all of the roommate-card elements
  const cards = document.querySelectorAll("roommate-card");
  //node for the update form
  const updateForm = document.querySelector("form.update");
  //node for the popup showing the update form
  const updatePopup = document.querySelector("#background-2");
  //node for the delete button in the popup
  const delBtn = document.getElementById("delete-button");
  //node for the close button in the popup
  const closeBtn = document.getElementById("close-button-2");

  //creating an event listener for each card
  cards.forEach((card) => {
    card.addEventListener("click", (event) => {
      //getting the list of roommates
      const roommates = readRoommate();
      //getting the id from the element (must do it now before event gets replaced in a different event listener)
      const id = event.target.id;
      //roommate variable
      let roommate;

      //grabbing the roommate with the matching id
      for (let i = 0; i < roommates.length; i++) {
        if (roommates[i]["id"] == event.target.id) {
          roommate = roommates[i];
          break;
        }
      }

      //updating the form HTML to prefill it with the roommate's data
      updateForm.innerHTML = `<fieldset>
				<label for="name">
					Name:
					<input type="text" id="name"  name="name" value = "${roommate.name}" placeholder="First Last" required>
				</label>
			</fieldset>
			<fieldset>
				<label for="birthday">
					Birthday:
					<input type="text" id="birthday"  name="birthday" value = "${roommate.birthday}" placeholder="mm/dd/yyyy" pattern="\\d\\d/\\d\\d/\\d\\d\\d\\d" required>
				</label>
			</fieldset>
			<fieldset>
				<label for="hobbies">
					Hobbies:
					<input type="text" id="hobbies"  name="hobbies" value = "${roommate.hobbies}" placeholder="hobby, hobby, etc.">
				</label>
			</fieldset>
			<fieldset>
				<label for="notes">
					Notes:
					<input type="text" id="notes"  name="notes" value = "${roommate.notes}" placeholder="...">
				</label>
			</fieldset>
			<button type="submit" id="save_button">SAVE</button>`;

      //when submit button is clicked, call the submit function
      updateForm.addEventListener("submit", update);

      function update(event) {
        //prevent refreshing the page
        event.preventDefault();
        //remove this specific card's event listener (important, since all the cards use the same form for updating)
        updateForm.removeEventListener("submit", update);
        //hide the popup
        updatePopup.style.display = "none";
        //update a roommate using the form data and the roommate's id
        updateRoommate(new FormData(updateForm), id);
        //reload the cards with the new list of roommates
        loadCards(readRoommate());
      }

      //when a card is clicked, show the popup
      updatePopup.style.display = "block";

      //when the close button is clicked, hide the popup
      closeBtn.onclick = function close() {
        updatePopup.style.display = "none";
        //remove this specific card's event listener (important, since all the cards use the same form for updating)
        updateForm.removeEventListener("submit", update);
      };

      //when the delete button is clicked, hide the popup
      delBtn.onclick = function () {
        updatePopup.style.display = "none";
        //remove this specific card's event listener (not really necessary here, but just in case)
        updateForm.removeEventListener("submit", update);
        //delete the roommate with the matching id
        deleteRoommate(id);
        //reload the cards with the new list of roommates
        loadCards(readRoommate());
      };
    });
  });
}
