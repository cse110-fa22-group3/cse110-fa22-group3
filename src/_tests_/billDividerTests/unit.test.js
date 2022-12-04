/**
 * @jest-environment jsdom
 */

// import functions
const functionAPIs = require("../../testSupportFiles/billDividerTests/unit-test-billDividerAPI");
const mainAPIs = require("../../testSupportFiles/billDividerTests/unit-test-main");

test("what are you testing?", () => {
    //functionAPIs.getHistoryArray();
    //expect(...).toStrictEqual(...);
});

//setRoommateArray
test("checks if setRoommateArray successfully replaces the roommate array in local storage", () => {
    const roommate = {
        id: 2,
        isOwed: 50.0,
        paid: 25.0,
    };

    const roommate2 = {
        id: 4,
        isOwed: 20.0,
        paid: 10.0,
    };

    const newRoommates = [roommate, roommate2];

    functionAPIs.setRoommateArray(newRoommates);

    const localStorageData = JSON.parse(window.localStorage.getItem("BillDividerData"));

    expect(localStorageData["Roommates"]).toStrictEqual(newRoommates);
});

//setHistoryArray
test("checks if setHistoryArray successfully replaces the roommate array in local storage", () => {
    const transaction = ["transfer", 7, 23, 9];

    const transaction2 = ["payment", 7, 354, "Groceries"];

    const newHistory = [transaction, transaction2];

    functionAPIs.setHistoryArray(newHistory);

    const localStorageData = JSON.parse(window.localStorage.getItem("BillDividerData"));

    expect(localStorageData["History"]).toStrictEqual(newHistory);
});

//processPayment
//reevaluateDebt
//transfer
//processTransfer
//deleteHistory
//getRoommateIndex
//getRoommateId
//getRoommateName