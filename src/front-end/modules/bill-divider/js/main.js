import { readRoommate } from "../../../../back-end/roommateListAPI.js";
import {
  initializeRoommate,
  deleteRoommateFromDivider,
  getRoommateArray,
  getHistoryArray,
  setRoommateArray,
  setHistoryArray,
  addTransaction,
} from "../../../../back-end/billDividerAPI.js";

/**
 * Gets a given roommate with their ID
 * @param {number} id The ID of the roommate
 * @returns The roommate object
 */
function getRoommate(id) {
  let roommates = readRoommate();
  for (let i = 0; i < roommates.length; i++) {
    if (roommates[i].id == id) return roommates[i];
  }
  return null;
}

window.addEventListener("DOMContentLoaded", init);

/**
 * init()
 */
function init() {
  reevaluateDebt();
  initializeList();
  pay();
  transfer();
  deleteHistory();
  populateHistory();
}

let cardBox = document.querySelectorAll(".card");
let array = getRoommateArray(); //array containing data objects
let history_array = getHistoryArray();

/**
 * create a roommate card using information in the input data object
 * @param {Object} data The data for the roommate
 */
function createRoommateCard(data) {
  // CREATES THE WRAPPER FOR A GIVEN ROOMMATE

  let wrapper = document.createElement("li");
  wrapper.innerHTML = `<h3 id=roommate-${data.id}>${getRoommateName(
    data.id
  )}</h3>`;

  // ADDS THE DEBT/OWED TEXT

  if (data.isOwed > 0)
    wrapper.insertAdjacentHTML(
      "beforeend",
      `<span class="is-owed" id="owed-${data.id}">is owed $${data.isOwed}</span>`
    );
  else if (data.isOwed < 0)
    wrapper.insertAdjacentHTML(
      "beforeend",
      `<span class="in-debt" id="owes-${data.id}">owes $${-data.isOwed}</span>`
    );

  // APPENDS WRAPPER TO PAGE

  let list = document.querySelector('ul[class="list mb-3"]');
  list.append(wrapper);
}

/**
 * initialize a sample data object array
 * and create the roommate cards and their corresponding radio buttons
 */
function initializeList() {
  let radioList = document.querySelectorAll(".select-name");
  //create roommates and their corresponding radio buttons
  array.forEach((data) => {
    createRoommateCard(data);
    // create radio buttons for this roommate
    let radioTransferFrom = document.createElement("div");
    let radioTransferTo = document.createElement("div");
    let radioPay = document.createElement("div");
    radioTransferFrom.innerHTML = `<input type="radio" id="radio-transfer-from-${
      data.id
    }" name="transfer-from" form="transfer" data-roommate="${data.id}" required>
      <label>${getRoommateName(data.id)}</label>`;
    radioTransferTo.innerHTML = `<input type="radio" id="radio-transfer-to-${
      data.id
    }" name="transfer-to" form="transfer" data-roommate="${data.id}" required>
      <label>${getRoommateName(data.id)}</label>`;
    radioPay.innerHTML = `<input type="radio" id="radio-pay-${
      data.id
    }" name="roommate" form="pay" data-roommate="${
      data.id
    }" required><label>${getRoommateName(data.id)}</label>`;
    radioList[1].append(radioTransferFrom);
    radioList[2].append(radioTransferTo);
    radioList[0].append(radioPay);
  });
}

/**
 * Populates history list with data from history_array
 */
function populateHistory() {
  // ITERATES THROUGH FULL HISTORY

  for (let i = 0; i < history_array.length; i++) {
    // FOR PAYMENTS:

    if (history_array[i][0] == "payment") {
      // GETS THE 3 VALUES

      let id = history_array[i][1];
      let amount = history_array[i][2];
      let purpose = history_array[i][3];

      // FINDS THE ROOMMATE INDEX

      let index = getRoommateIndex(id);

      // ADDS ELEMENT TO HISTORY LIST

      let record = document.createElement("li");
      record.className = "mb-3";
      record.innerHTML = `
              <input type="checkbox" form="del-history">
              <span>${getRoommateName(id)} paid ${amount} for ${purpose}</span>
          `;
      let historyList = document.querySelector("ul.history-list");
      historyList.insertBefore(record, historyList.firstChild);
    }

    // FOR TRANSFERS:
    else if (history_array[i][0] == "transfer") {
      // GETS THE 3 VALUES

      let from_id = history_array[i][1];
      let amount = history_array[i][2];
      let to_id = history_array[i][3];

      // GETS ROOMMATE INDECES

      let from_index = getRoommateIndex(from_id);
      let to_index = getRoommateIndex(to_id);

      // ADDS RECORD TO HISTORY LIST

      let record = document.createElement("li");
      record.className = "mb-3";
      record.innerHTML = `
              <input type="checkbox" form="del-history">
              <span>${getRoommateName(
                from_id
              )} transferred ${amount} to ${getRoommateName(to_id)}</span>
          `;
      let historyList = document.querySelector("ul.history-list");
      historyList.insertBefore(record, historyList.firstChild);
    }
  }
}

/**
 * display the roommate cards list. used everytime any roommate data is modified (pay and transfer)
 */
function displayRoommateCards() {
  let list = document.querySelector('ul[class="list mb-3"]');
  while (list.firstChild) list.removeChild(list.firstChild);
  array.forEach((data) => {
    createRoommateCard(data);
  });
}

/**
 * Stores array and history_array in local storage
 */
function storeData() {
  setRoommateArray(array);
  setHistoryArray(history_array);
}

/**
 * pay functionality.
 * Any payment made is equally divided among all roommates.
 * If roommate A owes some money to roommate B, when roommate A pays a bill,
 * B's share (to be paid to A) will offset the money A owes B first.
 */
function pay() {
  // GETS PAYMENT FORM ELEMENTS

  let formPay = document.querySelector("form#pay");
  formPay.addEventListener("submit", submit);

  function submit(e) {
    e.preventDefault();

    if (array.length > 0) {
      // GETS ALL VALUES FROM THE FORM

      //get inputs from submitted form
      let inputs = formPay.elements;
      let radioLength = array.length;
      let cost = parseFloat(inputs[radioLength].value);
      let to = inputs[radioLength + 1].value;
      console.log(formPay.elements);
      //update Owes and is Owed
      let index = 0; //index of selected roommate's data in array
      //The first array.length inputs are radio buttons. Loop through to find which is selected
      for (let x = 0; x < array.length; x++)
        if (inputs[x].checked) index = inputs[x].dataset.roommate;
      for (let y = 0; y < array.length; y++)
        if (array[y].id == index) {
          index = y;
          break;
        }

      // PROCESSES THE PAYMENT

      processPayment(getRoommateId(index), cost);

      // RETURNS TO THE HOME PAGE AND CLEARS THE FORM

      // cardBox[0].classList.add("active");
      // cardBox[3].classList.remove("active");
      formPay.reset();

      // ADDS RECORD TO HISTORY

      history_array.push(["payment", getRoommateId(index), cost, to]);
      let record = document.createElement("li");
      record.className = "mb-3";
      record.innerHTML = `
              <input type="checkbox" form="del-history">
              <span>${getRoommateName(
                array[index].id
              )} paid ${cost} for ${to}</span>
          `;
      let historyList = document.querySelector("ul.history-list");
      historyList.insertBefore(record, historyList.firstChild);

      // STORES THE DATA

      storeData();
    }
  }
}

/**
 * Processes a payment given a roommate's ID and the amount paid
 * @param {number} id The ID of the roommate
 * @param {number} amount The amount paid
 */
function processPayment(id, amount) {
  // FINDS THE ARRAY INDEX OF THE ROOMMATE PAYING

  let index = getRoommateIndex(id);

  // ADDS THE AMOUNT PAID TO THE ROOMMATE'S BALANCE

  if (getRoommate(id) != null) array[index].paid += amount;

  // RECALCULATES DEBT

  reevaluateDebt();

  // DISPLAYS NEW VALUES

  displayRoommateCards();
}

/**
 * Re-evaluates debt/amount owed for each roommate
 */
function reevaluateDebt() {
  // CALCULATES THE TOTAL PAYMENTS AND AVERAGE PAYMENT ACROSS ALL THE ROOMMATES

  let total_paid = 0;
  array.forEach((data) => {
    total_paid += data.paid;
  });
  let average_paid = total_paid / array.length;

  // CALCULATES THE POSITIVE OR NEGATIVE DEBT FOR EACH ROOMMATE

  for (let x = 0; x < array.length; x++) {
    let debtor_excess = array[x].paid - average_paid;
    array[x].isOwed = debtor_excess;
    array[x].isOwed = Math.round(array[x].isOwed * 100) / 100; //round to 2 decimal places
  }
}

/**
 * transfer functionality
 * Any transfer from roommate A to roommate B will offset the money A owes B.
 * If extra amount is paid, B owes to A.
 */
function transfer() {
  // GETS TRANSFER TO/FROM & BUTTON

  let transferForm = document.querySelector("form#transfer");
  transferForm.addEventListener("submit", submit);

  // SETS BEHAVIOR FOR TRANSFER BUTTON CLICK

  function submit(e) {
    e.preventDefault();

    if (array.length > 0) {
      let inputs = transferForm.elements;

      // GETS TRANSFER FIELDS

      let radios_from_start = 1;
      let radios_to_start = array.length + 3;

      let radioLength = array.length;

      // GETS INDECES OF ROOMMATES IN TRANSFER

      let from_index = 0; //index of payer
      let to_index = 0; //index of receiver
      for (let x = 0; x < radioLength; x++) {
        if (inputs[radios_from_start + x].checked) from_index = x;
        if (inputs[radios_to_start + x].checked) to_index = x;
      }

      // GETS THE AMOUNT BEING TRANSFERRED

      let amount = parseFloat(inputs[radioLength + 1].value);

      // PROCESSES THE TRANSFER

      processTransfer(
        getRoommateId(from_index),
        amount,
        getRoommateId(to_index)
      );

      // RETURNS TO HOME PAGE AND CLEARS THE FORM

      // cardBox[0].classList.add("active");
      // cardBox[2].classList.remove("active");
      transferForm.reset();

      // ADDS TRANSFER TO HISTORY

      history_array.push([
        "transfer",
        getRoommateId(from_index),
        amount,
        getRoommateId(to_index),
      ]);
      let record = document.createElement("li");
      record.className = "mb-3";
      record.innerHTML = `
              <input type="checkbox" form="del-history">
              <span>${getRoommateName(
                array[from_index].id
              )} transferred ${amount} to ${getRoommateName(
        array[to_index].id
      )}</span>
          `;
      let historyList = document.querySelector("ul.history-list");
      historyList.insertBefore(record, historyList.firstChild);

      // STORES THE DATA

      storeData();
    }
  }
}

/**
 * Processes a transfer between 2 roommates given both IDs and the amount
 * @param {number} fromId The ID of the paying roommate
 * @param {number} amount The amount being transferred
 * @param {number} toId The ID of the recipient
 */
function processTransfer(fromId, amount, toId) {
  let fromIndex = getRoommateIndex(fromId);
  let toIndex = getRoommateIndex(toId);

  if (getRoommate(toId) != null) array[toIndex].paid -= amount;
  if (getRoommate(fromId) != null) array[fromIndex].paid += amount;

  // RECALCULATES DEBT

  reevaluateDebt();

  // DISPLAYS NEW VALUES

  displayRoommateCards();
}

/**
 * delete history functionality
 * check the checkboxes of the records you want to delete and click on delete button to delete them
 */
function deleteHistory() {
  // GETS DELETE FORM AND LIST

  let form_del_history = document.querySelector("form#del-history");
  let list = document.querySelector("ul.history-list");
  form_del_history.addEventListener("submit", submit);

  // UPON DELETION SUBMIT

  function submit(e) {
    e.preventDefault();

    // GETS THE ELEMENTS TO BE DELETED

    let inputs = form_del_history.elements;
    let to_del = []; //store elements to be deleted
    let to_del_idx = [];
    let to_del_array = [];
    for (let x = 0; x < inputs.length; x++) {
      if (inputs[x].checked) {
        to_del_idx.push(inputs.length - 2 - x);
        to_del.push(inputs[x]);
        to_del_array.push(x);
      }
    }

    // REVERSES EVERY DELETED TRANSACTION

    to_del_idx.forEach((idx) => {
      // FOR TRANSFERS:

      if (history_array[idx][0] == "transfer") {
        let [type, from_id, amount, to_id] = history_array[idx];
        processTransfer(to_id, amount, from_id); //from_index,-amount,to_index is incorrect for how transfer is implemented
      }

      // FOR PAYMENTS:
      else if (history_array[idx][0] == "payment") {
        let [type, id, amount, purpose] = history_array[idx];
        processPayment(id, -amount);
      }
    });

    // DELETES ALL DELETED TRANSACTIONS FROM HISTORY

    to_del.forEach((record) => {
      list.removeChild(record.parentElement);
    });

    for (let i = to_del_array.length - 1; i >= 0; i--) {
      history_array.splice(history_array.length - 1 - to_del_array[i], 1);
    }

    // //return to home page
    // cardBox[0].classList.add('active')
    // cardBox[1].classList.remove('active')

    // STORES THE DATA

    storeData();
  }
}

/**
 * Gets the index of a roommate given their ID
 * @param {number} id The ID of the roommate
 * @returns The index of the roommate
 */
function getRoommateIndex(id) {
  let array = getRoommateArray(); //array containing data objects
  for (let i = 0; i < array.length; i++) {
    if (array[i].id == id) return i;
  }

  return -1;
}

/**
 * Gets the ID of a roommate given their index in array
 * @param {number} index The index of the roommate
 * @returns The ID of the roommate or -1 if out of bounds
 */
function getRoommateId(index) {
  let array = getRoommateArray(); //array containing data objects
  if (index > array.length - 1) {
    return -1;
  } else {
    return array[index].id;
  }
}

/**
 * Gets the name of a roommate given their ID
 * @param {number} id The ID of the roommate
 * @returns The name of the roommate
 */
function getRoommateName(id) {
  if (getRoommate(id) != null) return getRoommate(id).name;
  else return "[deleted]";
}
