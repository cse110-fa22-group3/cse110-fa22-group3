////////////////////////////////////////OLD BILL DIVIDER SPECS//////////////////////////////////////////////////
/**
 * Helper function that checks if the BillDividerData exists in local storage.
 * If it exists, nothing is done.
 * If it does not exist, then it is created with an empty array of contributions
 * and an empty array of logs.
 */
/*function dataExist()
 {
     //check to see if BillDividerData does not exist in local storage
     if (localStorage.getItem("BillDividerData") === null)
     {
         //creating a new BillDividerData
         const billDividerData = {
           contributions: [],
           log: [],
         };
     
         //adding it to local storage for the first time
         localStorage.setItem("BillDividerData", JSON.stringify(billDividerData));
     }
 }*/
//This is a helper function if you need it; checks to make sure the local storage data
//is initialized

/**
 * Gets the contribution of the roommate with the matching id by accessing
 * local storage.
 * @param {Int} id id of the roommate
 * @returns {Float} contribution of the roommate with matching id
 */
export function getContribution(id) {
  //get the BillDividerData from local storage
  const billDividerData = JSON.parse(localStorage.getItem("BillDividerData"));
  //get the list of contributions from BillDividerData
  const contributions = billDividerData["contributions"];

  //iterate through the list of contributions
  for (let i = 0; i < contributions.length; i++) {
    //check if we find the contribution (roommate) with the matching id
    if (contributions[i]["id"] == id) {
      //return that contribution
      return contributions[i]["contribution"];
    }
  }
}

/**
 * Gets the debt of the roommate with the matching id by subtracting their
 * contribution from the average contribution.
 * @param {Int} id
 * @returns The debt for the roommate with the id given
 */
export function getDebt(id) {
  return getAvgContribution() - getContribution(id);
}

/**
 * Adjusts the contribution of the giver (increase) and adjusts the contribution
 * of the recipient (decrease) if they exist. Also adds the transaction information
 * (text, giver, recipient, amount) to the log in local storage.
 * @param {String} text
 * @param {Int} giver
 * @param {Int} recipient
 * @param {Float} amount
 */
export function addPayment(text, giver, recipient, amount) {
  //giver/recipient is -1 (this is checked)
  //giver/recipient is not in roommatelist (this is not checked)

  //get the BillDividerData from local storage
  const billDividerData = JSON.parse(localStorage.getItem("BillDividerData"));
  //get the list of contributions from BillDividerData
  const contributions = billDividerData["contributions"];
  //get the list of logs from BillDividerData
  const log = billDividerData["log"];

  //check if the giver exists (does not have a negative id)
  if (!(giver < 0)) {
    //iterate through the list of contributions
    for (let i = 0; i < contributions.length; i++) {
      //check if we find the contribution (giver) with the matching id
      if (contributions[i]["id"] == giver) {
        //adjust the giver's contribution
        contributions[i]["contribution"] += amount;
      }
    }
  }
  //check if the recipient exists (does not have a negative id)
  if (!(recipient < 0)) {
    //iterate through the list of contributions
    for (let i = 0; i < contributions.length; i++) {
      //check if we find the contribution (recipient) with the matching id
      if (contributions[i]["id"] == recipient) {
        //adjust the recipient's contribution
        contributions[i]["contribution"] -= amount;
      }
    }
  }

  //add the transaction to the log
  log.push({ text: text, giver: giver, recipient: recipient, amount: amount });

  //save contributions and logs to local storage
  billDividerData["contributions"] = contributions;
  billDividerData["log"] = log;
  localStorage.setItem(JSON.stringify(billDividerData));
}

/**
 * Returns the log array holding the list of transactions
 * @returns {Array<object>} the array holding the transactions
 */
export function getLog() {
  return JSON.parse(localStorage.getItem("BillDividerData"))["log"];
}

/**
 * Gets the contribution of all roommates from local storage, adds them, and
 * returns it.
 * @returns {Float} the total contributions from all roommates
 */
export function getTotalContributions() {
  //get the BillDividerData from local storage
  const billDividerData = JSON.parse(localStorage.getItem("BillDividerData"));
  //get the list of contributions from BillDividerData
  const contributions = billDividerData["contributions"];
  //initializing the total
  let total = 0;

  //adding each roommate's contribution to the total
  for (let i = 0; i < contributions.length; i++) {
    total += contributions[i]["contribution"];
  }

  return total;
}

/**
 * Gets the total contributions and divides it by the number of roommates, then
 * returns the value.
 * @returns {Float} the average contribution
 */
export function getAvgContribution() {
  //get the BillDividerData from local storage
  const billDividerData = JSON.parse(localStorage.getItem("BillDividerData"));
  //get the list of contributions from BillDividerData
  const contributions = billDividerData["contributions"];

  //return the average (total / # of roommates)
  return getTotalContributions() / contributions.length;
}

////////////////////////////////////////NEW BILL DIVIDER SPECS//////////////////////////////////////////////////

import { readRoommate } from "../back-end/roommateListAPI.js";

/**
 * Adds a new roommate into the Roommate Array. This will be called in the Roommate List API.
 * "Owes" and "transferred" arrays should all have a new pair added with the given ID and amount 0
 * Set "paid" to the average "paid" from the other roommates.
 * @param {Int} id
 */
export function initializeRoommate(id) {
  dataExist();

  const listOfPeople = readRoommate();
  const billDividerData = JSON.parse(localStorage.getItem("BillDividerData"));
  const roommates = billDividerData["Roommates"];
  const roommate = {
    id: id,
    isOwed: 0.0,
    paid: 0.0,
  };
  let totalPaid = 0;

  //getting the average paid from other roommates (BEFORE THE NEW ONE IS ADDED)
  for (let i = 0; i < roommates.length; i++) {
    totalPaid += roommates[i]["paid"];
  }

  //assigning the average paid to the new roommate
  if (roommates.length > 0) roommate["paid"] = totalPaid / roommates.length;

  billDividerData["Roommates"].push(roommate);

  localStorage.setItem("BillDividerData", JSON.stringify(billDividerData));
}

/**
 * Removes a given roommate from the Roommate array.
 * Also removes all history of that roommate and all Owes/transferred references.
 * @param {Int} id
 */
export function deleteRoommateFromDivider(id) {
  dataExist();

  const billDividerData = JSON.parse(localStorage.getItem("BillDividerData"));
  const roommates = billDividerData["Roommates"];
  const history = billDividerData["History"];

  //removing the roommate from the owes and transferred list, and overall list
  for (let i = 0; i < roommates.length; i++) {
    if (roommates[i].id == id) {
      roommates.splice(i, 1);
      break;
    }
  }

  //removing the roommate from the history list
  for (let i = 0; i < history.length; i++) {
    if (history[i]["from"] == id || history[i]["to"] == id) {
      history.splice(i, 1);
      i--;
    }
  }

  localStorage.setItem("BillDividerData", JSON.stringify(billDividerData));
}

/**
 * Returns the roommate list with id, amount they're owed/owe/paid/transferred.
 * @returns {Array<object>} an array of roommates
 */
export function getRoommateArray() {
  dataExist();

  return JSON.parse(localStorage.getItem("BillDividerData"))["Roommates"];
}

/**
 * Returns the history array with all of the transactions.
 * @returns {Array<object>}
 */
export function getHistoryArray() {
  dataExist();

  return JSON.parse(localStorage.getItem("BillDividerData"))["History"];
}

/**
 * Replaces the old roommates list with the new one in local storage.
 * @param {Array<object>} newRoommates new roommates list
 */
export function setRoommateArray(newRoommates) {
  const billDividerData = JSON.parse(localStorage.getItem("BillDividerData"));

  //replace the old roommates array
  billDividerData["Roommates"] = newRoommates;

  localStorage.setItem("BillDividerData", JSON.stringify(billDividerData));
}

/**
 * Replaces the old history list with the new one in local storage.
 * @param {Array<object>} newHistory new history list
 */
export function setHistoryArray(newHistory) {
  const billDividerData = JSON.parse(localStorage.getItem("BillDividerData"));

  //replace the old history array (may not be needed if you use addTransaction)
  billDividerData["History"] = newHistory;

  //replace the old history array (may not be needed if you use addTransaction)
  billDividerData["History"] = newHistory;

  localStorage.setItem("BillDividerData", JSON.stringify(billDividerData));
}

/**
 * Adds a transaction (including from, amount, and to information). To
 * can be -1 if it is not sent to anyone.
 * @param {Int} from id of the roommate money is sent from
 * @param {Double} amount amount of money sent
 * @param {Int} to id of the roommate money is sent to
 */
export function addTransaction(from, amount, to) {
  const billDividerData = JSON.parse(localStorage.getItem("BillDividerData"));

  //initialize the transaction with argument data (to can be -1)
  const transaction = {
    from: from,
    amount: amount,
    to: to,
  };

  billDividerData["History"].push(transaction);

  localStorage.setItem("BillDividerData", JSON.stringify(billDividerData));
}

/**
 * Helper function that checks if the BillDividerData exists in local storage.
 * If it exists, nothing is done.
 * If it does not exist, then it is created with an empty array of roommates
 * and an empty array of transaction history.
 */
function dataExist() {
  //check to see if BillDividerData does not exist in local storage
  if (localStorage.getItem("BillDividerData") === null) {
    //creating a new BillDividerData
    const billDividerData = {
      Roommates: [],
      History: [],
    };

    let roommates = readRoommate();

    //adding it to local storage for the first time
    localStorage.setItem("BillDividerData", JSON.stringify(billDividerData));
    
    for (let r = 0; r < roommates.length; r++) {
      initializeRoommate(roommates[r].id);
    }
  }
}
