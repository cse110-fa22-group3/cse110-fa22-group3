//roommateListAPI.js

/**
 * Reads formData from the form that creates a new rooomate.
 * Then stores this information within the localStorage API.
 * @param {Object} formData An object with form data regarding new roommate
 */
export function createRoomate(formData){
    //gather data inputted from form
    let roomateInfo = formData
    //check to see if this is the first time the user is attempting to add roomates
    if(localStorage.getItem("RoommateListData")  === null){
        let firstRoomate = {
            "Roommates" : [
                roomateInfo
            ]
        };
        localStorage.setItem("RoommateListData", JSON.stringify(firstRoomate));
    }
    else{
        let roomateList = JSON.parse(localStorage.getItem('RoommateListData'));
        roomateList["Roommates"].push(roomateInfo);
        localStorage.setItem("RoommateListData", JSON.stringify(roomateList))
    }
}

/**
 * Reads formData from the form that updates an existing rooomate.
 * Then stores this information within the localStorage API.
 * @param {Object} formData An object with form data regarding new roommate
 */
export function updateRoomate(formData){

}