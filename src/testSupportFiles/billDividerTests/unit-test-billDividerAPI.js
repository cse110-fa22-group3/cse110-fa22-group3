module.exports = {
    initializeRoommate,
    deleteRoommateFromDivider,
    getRoommateArray,
    getHistoryArray,
    setRoommateArray,
    setHistoryArray,
    addTransaction,
    dataExist,
};

//import { readRoommate } from "../back-end/roommateListAPI.js";
const roommateAPI = require("../roommateListTests/unit-test-roommateListAPI.js");
  
  /**
   * Adds a new roommate into the Roommate Array. This will be called in the Roommate List API.
   * "Owes" and "transferred" arrays should all have a new pair added with the given ID and amount 0
   * Set "paid" to the average "paid" from the other roommates.
   * @param {Int} id
   */
  function initializeRoommate(id) {
    dataExist();
  
    const listOfPeople = roommateAPI.readRoommate();
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
  function deleteRoommateFromDivider(id) {
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
  function getRoommateArray() {
    dataExist();
  
    return JSON.parse(localStorage.getItem("BillDividerData"))["Roommates"];
  }
  
  /**
   * Returns the history array with all of the transactions.
   * @returns {Array<object>}
   */
  function getHistoryArray() {
    dataExist();
  
    return JSON.parse(localStorage.getItem("BillDividerData"))["History"];
  }
  
  /**
   * Replaces the old roommates list with the new one in local storage.
   * @param {Array<object>} newRoommates new roommates list
   */
  function setRoommateArray(newRoommates) {
    const billDividerData = JSON.parse(localStorage.getItem("BillDividerData"));
  
    //replace the old roommates array
    billDividerData["Roommates"] = newRoommates;
  
    localStorage.setItem("BillDividerData", JSON.stringify(billDividerData));
  }
  
  /**
   * Replaces the old history list with the new one in local storage.
   * @param {Array<object>} newHistory new history list
   */
  function setHistoryArray(newHistory) {
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
  function addTransaction(from, amount, to) {
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
  
      let roommates = roommateAPI.readRoommate();
  
      //adding it to local storage for the first time
      localStorage.setItem("BillDividerData", JSON.stringify(billDividerData));
  
      for (let r = 0; r < roommates.length; r++) {
        initializeRoommate(roommates[r].id);
      }
    }
  }
  