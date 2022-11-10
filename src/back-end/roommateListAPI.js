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
    //gather data inputted from form
    let roommateInfo = formData
    let roommateList = JSON.parse(localStorage.getItem('RoommateListData'))["Roommates"];
    for(let i = 0; i < roommateList.length; i++){
        if(roommateList[i]["name"] == roommateInfo["name"]){
            roommateList[i] = roommateInfo;
        }
    }
    localStorage.setItem("RoommateListData", JSON.stringify(roommateList))
}