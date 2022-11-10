//roommateListAPI.js
/**
 * Reads formData from the form that creates a new rooomate.
 * Then stores this information within the localStorage API.
 * @param {Object} formData An object with form data regarding new roommate
 */
export function createRoommate(formData){
    //gather data inputted from form
    let roommateInfo = formData
    //check to see if this is the first time the user is attempting to add roommates
    if(localStorage.getItem("RoommateListData")  === null){
        let firstRoommate = {
            "Roommates" : [
                roommateInfo
            ]
        };
        localStorage.setItem("RoommateListData", JSON.stringify(firstRoommate));
    }
    else{
        let roommateList = JSON.parse(localStorage.getItem('RoommateListData'));
        roommateList["Roommates"].push(roommateInfo);
        localStorage.setItem("RoommateListData", JSON.stringify(roommateList))
    }
}

/**
 * Reads formData from the form that updates an existing rooomate.
 * Then stores this information within the localStorage API.
 * @param {Object} formData An object with form data regarding new roommate
 */
export function updateRoommate(formData){

}
/**
 * Reads 'RoommateListData' data from local storage 
 * and returns an array of all the roommates information
 * found. If nothing in local storage returns empty array
 * @returns {Array<object>} An array of RoommateListData
 */
 export function readRoommate(){

    //check to see if this is the first time the user is attempting to add roommates
    if(localStorage.getItem("RoommateListData")  === null){
        let firstRoommate = {
            "Roommates" : [
                
            ]
        };
        localStorage.setItem("RoommateListData", JSON.stringify(firstRoomate));
        return JSON.parse(localStorage.getItem('RoommateListData'))["Roommates"];
    }else{

        let roommate = JSON.parse(localStorage.getItem('RoommateListData'));
        return roommate["Roommates"];
    }
}