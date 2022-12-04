/**
 * @jest-environment jsdom
 */

// import functions
const functionAPIs = require("../../testSupportFiles/billDividerTests/unit-test-billDividerAPI");
const mainAPIs = require("../../testSupportFiles/billDividerTests/unit-test-main");
  
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
test("",() =>{

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
