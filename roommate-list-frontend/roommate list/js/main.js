import {createRoommate, readRoommate, deleteRoommate, updateRoommate} from './roommateListAPI.js'

window.addEventListener('DOMContentLoaded', init);

/**
 * 
 */
function init() {
	//load the cards in the page with the current list of roommates
	initPage(readRoommate());

	//initialize the form if the user decides to add
	initFormHandler();
}

/**
 * 
 * @param {*} roommates 
 */
function initPage(roommates){
	//find the row element where all of the cards are
	const row = document.querySelector('.row');

	//remove all of the cards except the add button
	while (row.childElementCount > 1)
	{
		row.removeChild(row.firstElementChild);
	}

	//add a card for each roommate in the list
	roommates.forEach(roommate => {
		const card = document.createElement('roommate-card');
		card.setAttribute('id', roommate["id"]);
		card.data = roommate;
		row.insertBefore(card, document.querySelector('#new.item'));
	});

	//initialize the update/delete functionality for when the card is clicked
	updateDelHandler();
}	

/**
 * 
 */
function initFormHandler(){
	//nodes for the add form, form popup, add, and close buttons
	let addForm = document.querySelector('form.add');
	let addPopup = document.querySelector('#background.add');
	let addBtn = document.querySelector('#new.item');
	let closeBtn = document.getElementById('close_button_1');

	//when submit button is clicked, submit the form and make a new roommate, hide the popup
	addForm.addEventListener('submit', (event) =>
	{
		event.preventDefault();
		addPopup.style.display = "none";
		createRoommate(new FormData(addForm));
		initPage(readRoommate());
	});

	//when the add button is clicked, show the popup
	addBtn.onclick=function show() {
		addPopup.style.display = "block";
	}
	
	//when the close button is clicked, hide the popup
	closeBtn.onclick = function close() {
		addPopup.style.display = "none";
	}
}

/**
 * 
 */
function updateDelHandler(){
	//nodes for roommate cards, update form, form popup, delete, save, and close buttons
	let cards = document.querySelectorAll('roommate-card');
	let updateForm = document.querySelector('form.update');
	let updatePopup = document.querySelector('#background.update');
	let delBtn = document.getElementById('delete_button');
	let closeBtn = document.getElementById('close_button_2');

	//creating an event listener for each card
	cards.forEach(card => {
		card.addEventListener('click', (event) => {

			//when submit button is clicked, submit the form and update the roommate, hide the popup
			updateForm.addEventListener('submit', () => {
				updateRoommate(new FormData(updateForm), event.target.id);
				initPage(readRoommate());
			})

			//when the a card is clicked, show the popup
			updatePopup.style.display = "block";
			
			//when the close button is clicked, hide the popup
			closeBtn.onclick = function close() {
				updatePopup.style.display = "none";
			}

			//when the delete button is clicked, delete the roommate, hide the popup
			delBtn.onclick = function() {
				updatePopup.style.display = "none";
				deleteRoommate(event.target.id);
				initPage(readRoommate());
			}
		});
	});
}