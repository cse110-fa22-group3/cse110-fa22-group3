//roommateListAPI.js
import { removeFromChore } from "../back-end/choresListAPI.js";

/**
 * Reads formData from the form that creates a new rooomate.
 * Then stores this information within the local storage.
 * @param {Object} formData data for the new roommate
 */
export function createRoommate(formData) {
  //make sure RoommateListData exists in local storage
  dataExist();

  //get the RoommateListData from local storage
  const roommateListData = JSON.parse(localStorage.getItem("RoommateListData"));
  //empty roommate template
  const roommate = {};

  //set data inputted from form and set the id
  for (let [key, value] of formData) {
    roommate[key] = value;
  }
  roommate["id"] = roommateListData["idCount"];

  //increment idCount to get the next unique id
  roommateListData["idCount"] += 1;

  //add the roommate to the roommates list
  roommateListData["Roommates"].push(roommate);

  //replace the RoommateListData in local storage
  localStorage.setItem("RoommateListData", JSON.stringify(roommateListData));
}

/**
 * Reads 'RoommateListData' data from local storage and returns
 * an array of all the roommates information found. If nothing is
 * found in local storage, an empty array is returned.
 * @returns {Array<object>} an array of roommates
 */
export function readRoommate() {
  //make sure RoommateListData exists in local storage
  dataExist();

  //returning the Roommates array within RoommateListData
  return JSON.parse(localStorage.getItem("RoommateListData"))["Roommates"];
}

/**
 * Reads 'RoommateListData' from local storage and removes the instance
 * of a specified roommate based on id from the list of roommates array.
 * No change is made to the array if the id is not found.
 * @param {Int} id id of the roommate to remove
 */
export function deleteRoommate(id) {
  //make sure RoommateListData exists in local storage
  dataExist();

  //get the RoommateListData from local storage
  const roommateListData = JSON.parse(localStorage.getItem("RoommateListData"));
  //get the list of roommates from RoommateListData
  const roommates = roommateListData["Roommates"];

  //iterate through the list of roommates
  for (let i = 0; i < roommates.length; i++) {
    // check if the name matches our query
    if (roommates[i].id == id) {
      // remove the roommate from the list of roommates
      roommates.splice(i, 1);
      break;
    }
  }

  //replace the old list of roommates
  roommateListData["Roommates"] = roommates;

  //remove the roommate from any chores
  removeFromChore(id);

  //replace the RoommateListData in local storage
  localStorage.setItem("RoommateListData", JSON.stringify(roommateListData));
}

/**
 * Reads formData from the form that updates an existing roommate.
 * Then updates the roommates list within the local storage.
 * @param {Object} formData updated data for the roommate
 * @param {Int} id id of the roommate to update
 */
export function updateRoommate(formData, id) {
  //make sure RoommateListData exists in local storage
  dataExist();

  //get the RoommateListData from local storage
  const roommateListData = JSON.parse(localStorage.getItem("RoommateListData"));
  //get the list of roommates from RoommateListData
  const roommates = roommateListData["Roommates"];

  //iterate through the list of roommates
  for (let i = 0; i < roommates.length; i++) {
    //check we find the roommate with the matching id
    if (roommates[i]["id"] == id) {
      //update data inputted from form
      for (let [key, value] of formData) {
        roommates[i][key] = value;
      }
    }
  }

  //replace the old list of roommates
  roommateListData["Roommates"] = roommates;

  //replace the RoommateListData in local storage
  localStorage.setItem("RoommateListData", JSON.stringify(roommateListData));
}

/**
 * Helper function that checks if the RoommateListData exists in local storage.
 * If it exists, nothing is done.
 * If it does not exist, then it is created with an empty list of roommates and idCount of 0.
 * This function is called at the start of each CRUD function to ensure nothing breaks.
 */
function dataExist() {
  //check to see if RoommateListData does not exist in local storage
  if (localStorage.getItem("RoommateListData") === null) {
    //creating a new RoommateListData
    const roommateListData = {
      Roommates: [],
      idCount: 0,
    };

    //adding it to local storage for the first time
    localStorage.setItem("RoommateListData", JSON.stringify(roommateListData));
  }
}
