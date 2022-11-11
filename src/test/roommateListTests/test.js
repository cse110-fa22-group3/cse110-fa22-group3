//test.js

//Supplies the information for the create API for roommateList
import { createRoommate, deleteRoommate } from "../../back-end/roommateListAPI.js";

const form  = document.getElementById('signup');

form.addEventListener('submit', (event) => {
    event.preventDefault();
    const roommateForm = document.getElementById('signup');
    const name = roommateForm.elements['name'].value;
    const email = roommateForm.elements['email'].value;
    const age = roommateForm.elements['age'].value;
    const formData = {
        "name" : name,
        "email" : email,
        "age" : age
    };
    console.log(formData)
    createRoommate(formData);
});

document.getElementById("delete-button").addEventListener('click', (event) =>{
    deleteRoommate(1);
})