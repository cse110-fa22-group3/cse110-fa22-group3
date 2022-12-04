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

test("",() =>{

});


//createRoommateCard
test("",() =>{

});

test("",() =>{

});


//initalizeList
test("",() =>{

});

test("",() =>{

});


//populateHistory
test("",() =>{

});

test("",() =>{

});


//displayRoommmateCards
test("",() =>{

});

test("",() =>{

});


//storeData
test("",() =>{

});

//pay
test("",() =>{

});
