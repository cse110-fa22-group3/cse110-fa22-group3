/**
 * @jest-environment jsdom
 */

// import functions
const functionAPIs = require("../../testSupportFiles/billDividerTests/unit-test-billDividerAPI");
const mainAPIs = require("../../testSupportFiles/billDividerTests/unit-test-main");
const roommatesAPIs = require("../../testSupportFiles/roommateListTests/unit-test-roommateListAPI");

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
    window.localStorage.clear();
});

//setHistoryArray
test("checks if setHistoryArray successfully replaces the roommate array in local storage", () => {
    const transaction = ["transfer", 7, 23, 9];

    const transaction2 = ["payment", 7, 354, "Groceries"];

    const newHistory = [transaction, transaction2];

    functionAPIs.setHistoryArray(newHistory);

    const localStorageData = JSON.parse(window.localStorage.getItem("BillDividerData"));

    expect(localStorageData["History"]).toStrictEqual(newHistory);
    window.localStorage.clear();
});

//getRoommate (only works if let roommates = roommateAPI.readRoommate(); is in the function)
test("checks if getRoommate is able to identify if a roommate exists or not", () => {
    const formData = {
        name: "Xun Liu",
        birthday: "12/19/2000",
        hobbies: "playing guitar",
        notes: "",
      };
      
    const reference = {
        name: "Xun Liu",
        birthday: "12/19/2000",
        hobbies: "playing guitar",
        notes: "",
        id: 0,
      };

    roommatesAPIs.createRoommate(formData);

    expect(reference).toStrictEqual(mainAPIs.getRoommate(0));
    window.localStorage.clear();
});

//reevaluateDebt (doesn't work because this function does not replace local storage data)
test("checks if reevaluateDebt correctly assigns the right debt to each roommate", () => {
    const roommate = {
        id: 2,
        isOwed: 0.0,
        paid: 75.0,
    };

    const roommate2 = {
        id: 4,
        isOwed: 0.0,
        paid: 25.0,
    };

    const newRoommates = [roommate, roommate2];

    functionAPIs.setRoommateArray(newRoommates);

    mainAPIs.reevaluateDebt();

    const localStorageData = JSON.parse(window.localStorage.getItem("BillDividerData"));
    const roommates = localStorageData["Roommates"];

    console.log(roommates);

    expect(roommates[0].isOwed).toStrictEqual(25);
    expect(roommates[1].isOwed).toStrictEqual(-25);
    window.localStorage.clear();
});