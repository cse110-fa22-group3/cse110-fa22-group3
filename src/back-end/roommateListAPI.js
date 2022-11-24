//roommateListAPI.js
/**
 * Reads formData from the form that creates a new rooomate.
 * Then stores this information within the localStorage API.
 * @param {Object} formData An object with form data regarding new roommate
 */
export function createRoommate(formData) {
  //Check if the RoommateListData key is contained within local storage
  //If not then create it, otherwise just append to roommates list and update id
  if (localStorage.getItem("RoommateListData") === null) {
    formData["id"] = 0;
    let firstRoommate = {
      Roommates: [formData],
      idCount: 1,
    };
    localStorage.setItem("RoommateListData", JSON.stringify(firstRoommate));
  } else {
    let apiData = JSON.parse(localStorage.getItem("RoommateListData"));
    let roommate = {};

    roommate["id"] = apiData["idCount"];
    apiData["idCount"] += 1;

    for (let [key, value] of formData) {
      roommate[key] = value;
    }

    apiData["Roommates"].push(roommate);

    localStorage.setItem("RoommateListData", JSON.stringify(apiData));
  }
}

/**
 * Reads formData from the form that updates an existing rooomate.
 * Then stores this information within the localStorage API.
 * @param {Object} formData An object with form data regarding new roommate
 */
export function updateRoommate(formData, id) {
  //gather data inputted from form
  let roommate = {};

  roommate["id"] = id;
  for (let [key, value] of formData) {
    roommate[key] = value;
  }

  let roommateData = JSON.parse(localStorage.getItem("RoommateListData"));

  for (let i = 0; i < roommateData["Roommates"].length; i++) {
    if (roommateData["Roommates"][i]["id"] == id) {
      roommateData["Roommates"][i] = roommate;
    }
  }
  localStorage.setItem("RoommateListData", JSON.stringify(roommateData));
}

/**
 * Reads 'RoommateListData' data from local storage
 * and returns an array of all the roommates information
 * found. If nothing in local storage returns empty array
 * @returns {Array<object>} An array of RoommateListData
 */
export function readRoommate() {
  //check to see if this is the first time the user is attempting to add roommates
  if (localStorage.getItem("RoommateListData") === null) {
    let firstRoommate = {
      Roommates: [],
      idCount: 0,
    };
    localStorage.setItem("RoommateListData", JSON.stringify(firstRoommate));
    return JSON.parse(localStorage.getItem("RoommateListData"))["Roommates"];
  } else {
    let roommate = JSON.parse(localStorage.getItem("RoommateListData"));
    return roommate["Roommates"];
  }
}

/**
 * Reads 'RoommateListData' from local storage and removes the instance
 * of a specified roommate based on id from the list of roommates array.
 * No change is made to the array if the id is not found.
 * @param {Int} id Id of the roommate to remove
 */
export function deleteRoommate(id) {
  //get the RoommateListData from local storage
  const roommateListData = JSON.parse(localStorage.getItem("RoommateListData"));
  //get the list of roommates from RoommateListData
  const roommates = roommateListData["Roommates"];

  //iterate through the list of roommates
  for (let i = 0; i < roommates.length; i++) {
    //check if the name matches our query
    if (roommates[i]["id"] == id) {
      //remove the roommate from the list of roommates
      roommates.splice(i, 1);
      break;
    }
  }

  //replace the old list of roommates
  roommateListData["Roommates"] = roommates;

  //replace the RoommateListData in local storage
  localStorage.setItem("RoommateListData", JSON.stringify(roommateListData));
}
