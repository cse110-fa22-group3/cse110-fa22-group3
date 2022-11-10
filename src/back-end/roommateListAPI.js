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
    
/**
 * Reads 'RoommateListData' from local storage and removes all instances
 * of a specified name from the list of roommates array. No change is made
 * to the array if the name is not found.
 * @param {String} name Name of the roommate to remove
 */
export function deleteRoommate(name)
{
    //get the RoommateListData from local storage
    const roommateList = JSON.parse(localStorage.getItem('RoommateListData'));
    //get the list of roommates from RoommateListData
    const roommates = roommateList['Roommates'];

    //iterate through the list of roommates
    for (let i = 0; i < roommates.length; i++)
    {
        //check if the name matches our query
        if (roommates[i]['name'] === name)
        {
            //remove the roommate from the list of roommates
            roommates.splice(i, 1);
            //decrement to make sure we don't skip a roommate
            i--;
        }
    }

    //replace the old list of roommates
    roommateList["Roommates"] = roommates;
    //replace the RoommateListData in local storage
    localStorage.setItem("RoommateListData", JSON.stringify(roommateList));
}
