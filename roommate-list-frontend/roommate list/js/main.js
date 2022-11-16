import {createRoommate, readRoommate} from './roommateListAPI.js'

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
		const entry = document.createElement('roommate-card');
		entry.data = roommate;
		row.insertBefore(entry, document.querySelector('#new.item'));
	});
}	

// import {roommate} from './roommate'
export function initFormHandler(){
	let newBox=document.querySelector('#new.item')
	let div = document.getElementById('background')
	let btn_close = document.getElementById('close-button')
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