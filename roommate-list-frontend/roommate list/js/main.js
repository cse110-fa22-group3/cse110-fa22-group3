import {createRoommate, readRoommate, deleteRoommate, updateRoommate} from './roommateListAPI.js'

window.addEventListener('DOMContentLoaded', init);

function init() {
	initPage(readRoommate());
	initFormHandler();
}

function initPage(roommates){
	const row = document.querySelector('.row');

	while (row.childElementCount > 1)
	{
		row.removeChild(row.firstElementChild);
	}

	roommates.forEach(roommate => {
		const card = document.createElement('roommate-card');
		card.setAttribute('id', roommate["id"]);
		card.data = roommate;
		row.insertBefore(card, document.querySelector('#new.item'));
	});

	editDeleteHandler();
}	

// import {roommate} from './roommate'
function initFormHandler(){
	let newBox=document.querySelector('#new.item')
	//let div = document.getElementById('background')
	//let btn_close = document.getElementById('close-button')
	let div = document.querySelector('.back1')
	let btn_close = document.getElementById('close-button1')
	let form_create = document.querySelector('form.create')
	//let form_edit = document.querySelector('form.edit')

	form_create.addEventListener('submit', (event) =>
	{
		event.preventDefault();
		createRoommate(new FormData(form_create));
		initPage(readRoommate());
	});

	newBox.onclick=function show() {
		div.style.display = "block";
	}
	btn_close.onclick = function close() {
		div.style.display = "none";
	}


	//form_edit.addEventListener('submit',edit)

	//if we have an array, loop through the array to add edit and del event listener to each roommate
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

function editDeleteHandler(){
	let cards = document.querySelectorAll("roommate-card");

	let div = document.querySelector('.back2')
	let btn_close = document.getElementById('close-button2')
	let btn_del = document.getElementById('del-button')
	let btn2 = document.getElementById('btn2')
	let form_update = document.querySelector('form.update')

	cards.forEach(card => {
		card.addEventListener('click', (event) => {


			div.style.display = "block";
			
			btn_close.onclick = function close() {
				div.style.display = "none";
			}

			btn_del.onclick = function() {
				deleteRoommate(event.target.id);
				initPage(readRoommate());
			}
			btn2.onclick = function() {
				updateRoommate(new FormData(form_update), event.target.id);
				initPage(readRoommate());
		}
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