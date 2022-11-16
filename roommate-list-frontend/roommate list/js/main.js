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
		const card = document.createElement('roommate_card');
		card.setAttribute('id', roommate["id"]);
		card.data = roommate;
		row.insertBefore(card, document.querySelector('#new.item'));
	});

	//initialize the edit/delete functionality for when the card is clicked
	editDeleteHandler();
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

	//when submit button is clicked, submit the form and make a new roommate
	addForm.addEventListener('submit', (event) =>
	{
		event.preventDefault();
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
function editDeleteHandler(){
	//nodes for roommate cards, edit form, form popup, delete, save, and close buttons
	let cards = document.querySelectorAll('roommate_card');
	let editForm = document.querySelector('form.update');
	let editPopup = document.querySelector('#background.update');
	let delBtn = document.getElementById('delete_button');
	let saveBtn = document.getElementById('save_button');
	let closeBtn = document.getElementById('close_button_2');

	//creating an event listener for each card
	cards.forEach(card => {
		card.addEventListener('click', (event) => {

			//when the a card is clicked, show the popup
			editPopup.style.display = "block";
			
			//when the close button is clicked, hide the popup
			closeBtn.onclick = function close() {
				editPopup.style.display = "none";
			}

			//when the delete button is clicked, delete the roommate
			delBtn.onclick = function() {
				deleteRoommate(event.target.id);
				initPage(readRoommate());
			}

			//when the update button is clicked, update the roommate
			saveBtn.onclick = function() {
				updateRoommate(new FormData(editForm), event.target.id);
				initPage(readRoommate());
			}
		});
	});
}