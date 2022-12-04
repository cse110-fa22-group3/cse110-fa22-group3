/**
 * @jest-environment jsdom
 */

// import functions
const functionAPIs = require("../../testSupportFiles/billDividerTests/unit-test-billDividerAPI.js");
const mainAPIs = require("../../testSupportFiles/billDividerTests/unit-test-main.js");
const roommateFunctionAPIs = require("../../testSupportFiles/roommateListTests/unit-test-roommateListAPI");

//getRoommateArray
test("check if getRoommateArray returns an empty array when there are no Roommates",() =>{
    //call to our getRoommateArray
    const empty = functionAPIs.getRoommateArray();
    const tempArray = [];
    expect(empty).toStrictEqual(tempArray);
    window.localStorage.clear();
});

test("check if getRoommateArray initializes fields correctly when there are no roommates",() =>{
    
    const billDataTest = {
        Roommates: [],
        History: [],
      };

    functionAPIs.getRoommateArray();

    const localStorageData = JSON.parse(
        window.localStorage.getItem("BillDividerData")
      );

    console.log("local storage:", localStorageData);
    console.log("supposed data:", billDataTest);

    expect(localStorageData).toStrictEqual(billDataTest);
    window.localStorage.clear();
});

test("check if getRoommateArray creates a non-empty roommateArray",() =>{
    functionAPIs.getRoommateArray();
    const temp_roommate = {
        id: 1,
        isOwed: 0.0,
        paid: 0.0,
      };
    functionAPIs.initializeRoommate(1);
    
    const localStorageData = JSON.parse(
        window.localStorage.getItem("BillDividerData")
      );
    
    const roommates = localStorageData.Roommates;
    console.log("local storage:", roommates[0]);
    console.log("supposed data:", temp_roommate);    

    expect(roommates[0]).toStrictEqual(temp_roommate);
    window.localStorage.clear();
});

//getHistoryArray
test("check if getHistoryArray returns an empty array when there is no History",() =>{
    //call to our getHistoryArray
    const empty = functionAPIs.getHistoryArray();
    const tempArray = [];
    expect(empty).toStrictEqual(tempArray);
    window.localStorage.clear();
});

test("check if getHistoryArray initializes fields correctly when there is no History",() =>{
    const billDataTest = {
        Roommates: [],
        History: [],
      };

    functionAPIs.getHistoryArray();

    const localStorageData = JSON.parse(
        window.localStorage.getItem("BillDividerData")
      );

    console.log("local storage:", localStorageData);
    console.log("supposed data:", billDataTest);

    expect(localStorageData).toStrictEqual(billDataTest);
    window.localStorage.clear();
});

test("check if getHistoryArray creates a non-empty historyArray",() =>{
    functionAPIs.getHistoryArray();
    functionAPIs.addTransaction(1,2.00,2);

    const temp_transaction = {
        from: 1,
        amount: 2.00,
        to: 2,
    };

    const localStorageData = JSON.parse(
        window.localStorage.getItem("BillDividerData")
      );
    
    const history = localStorageData.History;
    console.log("local storage:", history[0]);
    console.log("supposed data:", temp_transaction);

    expect(history[0]).toStrictEqual(temp_transaction);
    window.localStorage.clear();
});

//getRoommate
test("check getRoommate returns null when cant find roommate in empty roommatelist",() =>{
    let roommates = roommateFunctionAPIs.readRoommate();
    const tempRoommate = mainAPIs.getRoommate(1);

    expect(tempRoommate).toStrictEqual(null);
    window.localStorage.clear();
});

test("checks to make sure that getRoommate returns null when cant find roommate in non-empty roommatelist",() =>{
    let roommates = roommateFunctionAPIs.readRoommate();

    const formData = {
        name: "Xun Liu",
        birthday: "12/19/2000",
        hobbies: "playing guitar",
        notes: "",
      };
    roommateFunctionAPIs.createRoommate(formData);
    const tempRoommate = mainAPIs.getRoommate(2);

    expect(tempRoommate).toStrictEqual(null);
    window.localStorage.clear();
});

test("checks to makes sure that getRoommate returns roommate when it is present in roommateList",() =>{
    const formData0 = {
        name: "Xun Liu",
        birthday: "12/19/2000",
        hobbies: "playing guitar",
        notes: "",
      };
      const formData1 = {
        name: "John Doe",
        birthday: "12/12/1212",
        hobbies: "playing bass",
        notes: "",
      };

    roommateFunctionAPIs.createRoommate(formData0);
    roommateFunctionAPIs.createRoommate(formData1);
    let roommates = roommateFunctionAPIs.readRoommate();

    const tempRoommate = mainAPIs.getRoommate(0);    

    console.log("getRoommate:", mainAPIs.getRoommate(0));
    console.log("form data:", formData0);
    expect(tempRoommate).toStrictEqual(formData0);
    window.localStorage.clear();
});

//getRoommateName
test("checks that getRoommateName returns deleted if searched for non-existent roommate in empty list",() =>{
    let roommates = roommateFunctionAPIs.readRoommate();
    const tempRoommate = mainAPIs.getRoommateName(1);

    expect(tempRoommate).toStrictEqual("[deleted]");
    window.localStorage.clear();
});

test("checks that getRoommateName returns deleted if searched for non-existent roommate in non-empty list",() =>{
    let roommates = roommateFunctionAPIs.readRoommate();

    const formData = {
        name: "Xun Liu",
        birthday: "12/19/2000",
        hobbies: "playing guitar",
        notes: "",
      };
    roommateFunctionAPIs.createRoommate(formData);
    const tempRoommate = mainAPIs.getRoommateName(2);

    expect(tempRoommate).toStrictEqual("[deleted]");
    window.localStorage.clear();
});

test("checks that getRoommateName returns correct name in a 1 person roommatelist",() =>{
    let roommates = roommateFunctionAPIs.readRoommate();

    const formData = {
        name: "Xun Liu",
        birthday: "12/19/2000",
        hobbies: "playing guitar",
        notes: "",
      };
    roommateFunctionAPIs.createRoommate(formData);
    const tempRoommate = mainAPIs.getRoommateName(0);

    expect(tempRoommate).toStrictEqual("Xun Liu");
    window.localStorage.clear();

});

test("checks that getRoommateName returns correct name in a multi-person roommatelist",() =>{
    let roommates = roommateFunctionAPIs.readRoommate();

    const formData0 = {
        name: "Xun Liu",
        birthday: "12/19/2000",
        hobbies: "playing guitar",
        notes: "",
      };
      const formData1 = {
        name: "John Doe",
        birthday: "12/12/1212",
        hobbies: "playing bass",
        notes: "",
      };

    roommateFunctionAPIs.createRoommate(formData0);
    roommateFunctionAPIs.createRoommate(formData1);
    const tempRoommate = mainAPIs.getRoommateName(0);

    expect(tempRoommate).toStrictEqual("Xun Liu");
    window.localStorage.clear();
});

//getRoommateId
test("checks that getRoommateId returns correct id in a multi-person roommatelist",() =>{
    functionAPIs.getRoommateArray();
    functionAPIs.initializeRoommate(1);
    functionAPIs.initializeRoommate(2);
    functionAPIs.initializeRoommate(3);
    const tempRoommate = mainAPIs.getRoommateId(0);
    expect(tempRoommate).toStrictEqual(1);
    window.localStorage.clear();
});

test("checks that getRoommateId returns correct id in a 1-person roommatelist",() =>{
    functionAPIs.getRoommateArray();
    functionAPIs.initializeRoommate(1);
    const tempRoommate = mainAPIs.getRoommateId(0);
    expect(tempRoommate).toStrictEqual(1);
    window.localStorage.clear();
});

test("checks that getRoommateId returns -1 in an empty roommatelist",() =>{
    functionAPIs.getRoommateArray();
    const tempRoommate = mainAPIs.getRoommateId(0);
    expect(tempRoommate).toStrictEqual(-1);
    window.localStorage.clear();
});

test("checks that getRoommateId returns -1 in a non-empty roommatelist",() =>{
    functionAPIs.getRoommateArray();
    functionAPIs.initializeRoommate(1);
    const tempRoommate = mainAPIs.getRoommateId(1);
    expect(tempRoommate).toStrictEqual(-1);
    window.localStorage.clear();
});


//getRoommateIndex

test("checks that getRoommateIndex returns -1 in a non-empty roommatelist",() =>{
    functionAPIs.getRoommateArray();
    functionAPIs.initializeRoommate(1);
    const tempRoommate = mainAPIs.getRoommateIndex(0);
    expect(tempRoommate).toStrictEqual(-1);
    window.localStorage.clear();
});

test("checks that getRoommateIndex returns -1 in an empty roommatelist",() =>{
    functionAPIs.getRoommateArray();
    const tempRoommate = mainAPIs.getRoommateIndex(1);
    expect(tempRoommate).toStrictEqual(-1);
    window.localStorage.clear();
});

test("checks that getRoommateIndex returns correct index in a 1-person roommatelist",() =>{
    functionAPIs.getRoommateArray();
    functionAPIs.initializeRoommate(1);
    const tempRoommate = mainAPIs.getRoommateIndex(1);
    expect(tempRoommate).toStrictEqual(0);
    window.localStorage.clear();
});

test("checks that getRoommateIndex returns correct index in a multi-person roommatelist",() =>{
    functionAPIs.getRoommateArray();
    functionAPIs.initializeRoommate(1);
    functionAPIs.initializeRoommate(2);
    functionAPIs.initializeRoommate(3);
    const tempRoommate = mainAPIs.getRoommateIndex(1);
    expect(tempRoommate).toStrictEqual(0);
    window.localStorage.clear();
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

    roommateFunctionAPIs.createRoommate(formData);

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