// import {roommate} from './roommate'
export function addCreateListeners(){
	let newBox=document.querySelector('#new.item')
	let div = document.getElementById('background')
	let btn_close = document.getElementById('close-button')
	let form = document.querySelector('form.create')

	newBox.onclick=function show() {
		div.style.display = "block";
	}
	btn_close.onclick = function close() {
		div.style.display = "none";
	}
	form.addEventListener('submit',create)
	function create(){
		let birthday = document.querySelector('form #birthday').value
		//TODO:create roommate element and save to backend
	}
}
 