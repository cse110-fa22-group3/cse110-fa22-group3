// choresListAPI.js
module.exports = {
  readChores,
  queryChore,
  createChore,
  updateChore,
  closeChore,
  reOpenChore,
  clearArchive,
  checkDate,
  inCharge,
  removeFromChore,
};
/**
 * Reads 'ChoresListData' data from local storage
 * and returns a JSON with all the chores information
 * found. If nothing in local storage returns JSON with
 * initialized fields
 * @returns {Object} A JSON object of ChoresListData
 */
function readChores() {
  if (localStorage.getItem("ChoresListData") === null) {
    const chores = {
      chores: [],
      archived: [],
      openChoresCount: 0,
      closedChoresCount: 0,
      choresCountId: 1,
    };
    localStorage.setItem("ChoresListData", JSON.stringify(chores));
    return JSON.parse(localStorage.getItem("ChoresListData"));
  } else {
    checkDate();
    return JSON.parse(localStorage.getItem("ChoresListData"));
  }
}

/**
 * queryChore focuses on providing information on a specific chore,
 * to avoid the hassle of parsing through entire lists for information
 * on one chore. Takes in two parameters: listToQuery and id.
 * listToQuery handles which list to check for the chore: archived or open.
 * id specifies the id of the chore we are looking for.
 * @param {String} listToQuery A string indicating which list to check
 * for the chore, either 'open' or 'closed'
 * @param {Int} id An integer indicating chore id
 * @return {Object} A JSON object with specific info on a chore,
 * otherwise return an empty object
 */
function queryChore(listToQuery, id) {
  // call for all data from ChoresList feature
  const choresAPIData = JSON.parse(localStorage.getItem("ChoresListData"));

  // Check which list to search from, and do a linear search for object
  if (listToQuery === "archived") {
    for (let i = 0; i < choresAPIData.archived.length; i++) {
      if (choresAPIData.archived[i].id == id) {
        return choresAPIData.archived[i];
      }
    }
    // not found therefore return empty JSON object
    return {};
  } else {
    for (let i = 0; i < choresAPIData.chores.length; i++) {
      if (choresAPIData.chores[i].id == id) {
        return choresAPIData.chores[i];
      }
    }
    // not found therefore return empty JSON object
    return {};
  }
}

/**
 * createChore focues on creating a chore object to add to the chores(open) list.
 * It requires data from a form to fill out the fields for the chores. Updates the id
 * counter to maintain unique ids for chores and updates the amount of open chores.
 * @param {Object} formData contains the Object info for the new chore
 */
function createChore(formData) {
  let choresAPIData = JSON.parse(localStorage.getItem("ChoresListData"));
  let newChore = {
    id: choresAPIData["choresCountId"],
    title: formData["title"],
    description: formData["description"],
    assignee: formData["assignee"],
    assignedDate: formData["assignedDate"],
    status: "open",
    currRoommate: formData["assignee"][0],
  };
  choresAPIData.choresCountId += 1;
  choresAPIData.openChoresCount += 1;
  choresAPIData.chores.push(newChore);
  localStorage.setItem("ChoresListData", JSON.stringify(choresAPIData));
}

/**
 * updateChore focues on updating the information for a given chore. This function allows
 * a whole remap of a chore, therefore can be used for small and big changes. Only field
 * that does not change is the id field, as it remains unique. We take three paramaeters:
 * @param {Int} id An integer indicating chore id
 * @param {String} listToQuery A string indicating which list to check
 * for the chore, either 'open' or 'closed'
 * @param {Object} formData contains the Object info for the chore
 */
function updateChore(id, listToQuery, formData) {
  const choresAPIData = JSON.parse(localStorage.getItem("ChoresListData"));
  // setup flags so that we can ensure if we change status, it will put the chore
  // in the correct list: chores(open) or archived.
  let switchToOpen = false;
  let switchToClosed = false;

  // Do a check to see which list we should iterate through
  if (listToQuery === "archive") {
    for (let i = 0; i < choresAPIData.archived.length; i++) {
      if (choresAPIData.archived[i].id === id) {
        // set flag to indicate we need to put the chore in the other list
        if (
          formData.status === "open" &&
          choresAPIData.chores[i].status === "closed"
        ) {
          choresAPIData.archived[i].status = formData.open;
          switchToOpen = true;
        }
        //update our chore
        choresAPIData["archived"][i]["title"] = formData["title"];
        choresAPIData["archived"][i]["description"] = formData["description"];
        choresAPIData["archived"][i]["assignee"] = formData["assignee"];
        choresAPIData["archived"][i]["assignedDate"] = formData["assignedDate"];
        choresAPIData["archived"][i]["status"] = formData["status"];
        choresAPIData["archived"][i]["currRoommate"] = formData["assignee"][0];
        break;
      }
    }
  } else {
    for (let i = 0; i < choresAPIData.chores.length; i++) {
      if (choresAPIData.chores[i].id == id) {
        // set flag to indicate we need to put the chore in the other list
        if (
          formData.status === "closed" &&
          choresAPIData.chores[i].status === "open"
        ) {
          choresAPIData.chores[i].status = formData.open;
          switchToClosed = true;
        }
        //update our chore
        choresAPIData["chores"][i]["title"] = formData["title"];
        choresAPIData["chores"][i]["description"] = formData["description"];
        choresAPIData["chores"][i]["assignee"] = formData["assignee"];
        choresAPIData["chores"][i]["assignedDate"] = formData["assignedDate"];
        choresAPIData["chores"][i]["status"] = formData["status"];
        choresAPIData["chores"][i]["currRoommate"] = formData["assignee"][0];
        break;
      }
    }
  }
  // handle switching lists utilizing helper functions
  if (switchToClosed === true) {
    closeChore(id);
  }
  if (switchToOpen === true) {
    reOpenChore(id);
  }
  // update our localStorage
  localStorage.setItem("ChoresListData", JSON.stringify(choresAPIData));
}

/**
 * closeChore focues on closing out a chore or otherwise putting a given chore
 * into the archived array, so we can track completetion.
 * @param {Int} id An integer indicating chore id
 */
function closeChore(id) {
  const choresAPIData = JSON.parse(localStorage.getItem("ChoresListData"));
  for (let i = 0; i < choresAPIData.chores.length; i++) {
    if (choresAPIData.chores[i].id == id) {
      const archivedChore = choresAPIData.chores[i];
      archivedChore.status = "closed";
      choresAPIData.chores.splice(i, 1);
      choresAPIData.archived.push(archivedChore);
      choresAPIData.closedChoresCount += 1;
      choresAPIData.openChoresCount -= 1;
      break;
    }
  }
  localStorage.setItem("ChoresListData", JSON.stringify(choresAPIData));
}

/**
 * reOpenChore focues on reOpening a chore or otherwise putting a given chore
 * into the chores(open) array, so we can track completetion.
 * @param {Int} id An integer indicating chore id
 */
function reOpenChore(id) {
  const choresAPIData = JSON.parse(localStorage.getItem("ChoresListData"));
  for (let i = 0; i < choresAPIData.archived.length; i++) {
    if (choresAPIData.archived[i].id === id) {
      const reOpenChore = choresAPIData.archived[i];
      choresAPIData.archived.splice(i, 1);
      choresAPIData.chores.push(reOpenChore);
      choresAPIData.closedChoresCount -= 1;
      choresAPIData.openChoresCount += 1;
      break;
    }
  }
  localStorage.setItem("ChoresListData", JSON.stringify(choresAPIData));
}

/**
 * clearArchive focues on reinitializing the archived array with a new empty
 * array, so that we can clear out our backlog of issues.
 */
function clearArchive() {
  const choresAPIData = JSON.parse(localStorage.getItem("ChoresListData"));
  choresAPIData.archived = [];
  choresAPIData.closedChoresCount = 0;
  localStorage.setItem("ChoresListData", JSON.stringify(choresAPIData));
}
// TO DO IF SPECIFIC DATA IS NEEDED
function updateChoreCounterForRoommate(roommateId) {}
// TO DO IF SPECIFIC DATA IS NEEDED
function updateChoreStatus(id, status) {}
// TO DO IF SPECIFIC DATA IS NEEDED
function updateChoreOwner(choreId, oldOwnerID, newOwnerId) {}

/**
 * checkDate will change the dates assigned if needed and change the assigned
 * roommates when called from readChores
 */
function checkDate() {
  let choresAPIData = JSON.parse(localStorage.getItem("ChoresListData"));

  const date = new Date();

  const day = date.getDate();

  const month = date.getMonth() + 1;

  const year = date.getFullYear();

  const nextWeek = new Date();

  nextWeek.setDate(nextWeek.getDate() + 7);

  const nextDay = date.getDate();

  const nextMonth = date.getMonth() + 1;

  const nextYear = date.getFullYear();

  const string = `${nextMonth}/${nextDay}/${nextYear}`;

  let nextRoommate = null;

  //loops inside of the archived chores
  for (let i = 0; i < choresAPIData["archived"].length; i++) {
    let archivedChore = choresAPIData["archived"][i];

    for (let j = 0; j < archivedChore["assignee"].length; j++) {
      if (archivedChore["assignee"][j] == archivedChore["currRoommate"]) {
        nextRoommate =
          archivedChore["assignee"][(j + 1) % archivedChore["assignee"].length];
      }
    }

    const currDate = archivedChore["assignedDate"].split("/").map(Number);

    if (currDate[2] > year) {
      archivedChore["assignedDate"] = string;
      archivedChore["currRoommate"] = nextRoommate;
    } else if (currDate < year) {
      //we are looking at an assigned year date
      //that is greater than our current year
      continue;
    } else {
      if (currDate[0] > month) {
        archivedChore["assignedDate"] = string;
        archivedChore["currRoommate"] = nextRoommate;
      } else if (currDate[0] < month) {
        //we are looking at an assigned month date
        //that is greater than the curr month
        continue;
      } else {
        if (currDate[1] > day) {
          if (7 >= currDate[1] - day) {
            //where we change the assigned date to be updated with new date

            archivedChore["assignedDate"] = string;
            archivedChore["currRoommate"] = nextRoommate;
          }
        } else if (currDate[1] < day) {
          //we are looking at an assigned day which is greater than the curr day
          continue;
        } else {
          //date is the same day so we dont care
          continue;
        }
      }
    }

    choresAPIData["archived"][i] = archivedChore;
  }

  //loops inside of the open chores
  for (let i = 0; i < choresAPIData["chores"].length; i++) {
    let openChore = choresAPIData["chores"][i];

    const currDate = openChore["assignedDate"].split("/").map(Number);

    let choreDate = new Date(currDate[2], currDate[0] - 1, currDate[1]);

    let dayOfWeek = date.getDay();
    let weekStart = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate()
    );
    weekStart.setDate(weekStart.getDate() - dayOfWeek);

    while (choreDate < weekStart) {
      choreDate.setDate(choreDate.getDate() + 7);
      let currIndex = openChore["assignee"].indexOf(openChore["currRoommate"]);
      openChore["currRoommate"] =
        openChore["assignee"][(currIndex + 1) % openChore["assignee"].length];
    }

    openChore["assignedDate"] =
      date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear();

    /*
  
      for (let j = 0; j < openChore["assignee"].length; j++) {
        if (openChore["assignee"][j] == openChore["currRoommate"]) {
          nextRoommate =
            openChore["assignee"][(j + 1) % openChore["assignee"].length];
        }
      }
  
      if (currDate[2] > year) {
        openChore["assignedDate"] = string;
        openChore["currRoommate"] = nextRoommate;
      } else if (currDate < year) {
        //we are looking at an assigned year date
        //that is greater than our current year
        continue;
      } else {
        if (currDate[0] > month) {
          openChore["assignedDate"] = string;
          openChore["currRoommate"] = nextRoommate;
        } else if (currDate[0] < month) {
          //we are looking at an assigned month date
          //that is greater than the curr month
          continue;
        } else {
          if (currDate[1] > day) {
            if (7 >= currDate[1] - day) {
              //where we change the assigned date to be updated with new date
  
              openChore["assignedDate"] = string;
              openChore["currRoommate"] = nextRoommate;
            }
          } else if (currDate[1] < day) {
            //we are looking at an assigned day which is greater than the curr day
            continue;
          } else {
            //date is the same day so we dont care
            continue;
          }
        }
      }*/

    choresAPIData["chores"][i] = openChore;
  }

  localStorage.setItem("ChoresListData", JSON.stringify(choresAPIData));
}

/**
 * Takes in the id of a chore returns the roommate currently in charge of that chore (based on time since assigned)
 * @param {*} id id of the chore
 * @returns the id of the current roommate in charge of the chore
 */
function inCharge(id) {
  //get ChoresListData from localStorage
  let choresAPIData = JSON.parse(localStorage.getItem("ChoresListData"));

  //check the chores list to see if the chore is there
  for (let i = 0; i < choresAPIData["chores"].length; i++) {
    if (choresAPIData["chores"][i]["id"] == id) {
      //return the current roommate in charge of the chore
      return choresAPIData["chores"][i]["currRoommate"];
    }
  }

  //check the archived list to see if the chore is there
  for (let i = 0; i < choresAPIData["archived"].length; i++) {
    if (choresAPIData["archived"][i]["id"] == id) {
      //return the current roommate in charge of the chore
      return choresAPIData["archived"][i]["currRoommate"];
    }
  }
}

/**
 * Takes in the id of the rooommate that was removed and removes that roommate from every chore they are assigned to
 * @param {*} id id of the roommate that was removed
 */
function removeFromChore(id) {
  //get ChoresListData from localStorage
  let choresAPIData = JSON.parse(localStorage.getItem("ChoresListData"));

  //iterate through the open chores list
  for (let i = 0; i < choresAPIData["chores"].length; i++) {
    let openChore = choresAPIData["chores"][i];

    //iterate through the assignees the chore
    for (let j = 0; j < openChore["assignee"].length; j++) {
      //if the deleted roommate's id is found, remove that roommate
      if (openChore["assignee"][j] == id) {
        openChore["assignee"].splice(j, 1);

        if (openChore["currRoommate"] == id) {
          if (openChore["assignee"].length > 0) {
            openChore["currRoommate"] = openChore["assignee"][0];
          } else {
            openChore["assignee"] = [-1];
            openChore["currRoommate"] = -1;
          }
        }
        break;
      }
    }
  }

  //iterate through the archived chores list
  for (let i = 0; i < choresAPIData["archived"].length; i++) {
    let archivedChore = choresAPIData["archived"][i];

    //iterate through the assignees the chore
    for (let j = 0; j < archivedChore["assignee"].length; j++) {
      //if the deleted roommate's id is found, remove that roommate
      if (archivedChore["assignee"][j] == id) {
        archivedChore["assignee"].splice(j, 1);
      }
    }
  }

  localStorage.setItem("ChoresListData", JSON.stringify(choresAPIData));
}
