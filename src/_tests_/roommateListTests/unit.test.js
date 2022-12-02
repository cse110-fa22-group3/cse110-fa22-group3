/**
 * @jest-environment jsdom
 */

const functionAPIs = require("../../testSupportFiles/roommateListTests/unit-test-roommateListAPI");

test("checks if createRoommate adds a roommate to local storage", () => {
  const formData = {
    name: "Xun Liu",
    birthday: "12/19/2000",
    hobbies: "playing guitar",
    notes: ""
  };
  functionAPIs.createRoommate(formData);
  const localStorageData = JSON.parse(
    window.localStorage.getItem("RoommateListData")
  );
  console.log("local storage:", localStorageData.Roommates[0]);
  console.log("form data:", formData);
  expect(localStorageData.Roommates[0]).toStrictEqual(formData);
  window.localStorage.clear();
});

test("checks if createRoommate adds an empty roommate to local storage", () => {
  const formData = {
    name: "",
    birthday: "",
    hobbies: "",
    notes: ""
  };
  functionAPIs.createRoommate(formData);
  const localStorageData = JSON.parse(
    window.localStorage.getItem("RoommateListData")
  );
  console.log("local storage:", localStorageData.Roommates[0]);
  console.log("form data:", formData);
  expect(localStorageData.Roommates[0]).toStrictEqual(formData);
  window.localStorage.clear();
});

test("checks if createRoommate adds multiple roommates to local storage", () => {
  const formData1 = {
    name: "Xun Liu",
    birthday: "12/19/2000",
    hobbies: "playing guitar",
    notes: ""
  };
  const formData2 = {
    name: "John Doe",
    birthday: "12/12/1212",
    hobbies: "playing bass",
    notes: ""
  };
  functionAPIs.createRoommate(formData1);
  functionAPIs.createRoommate(formData2);
  const localStorageData = JSON.parse(
    window.localStorage.getItem("RoommateListData")
  );
  console.log("local storage:", localStorageData.Roommates[0]);
  console.log("form data:", formData1);
  console.log("local storage:", localStorageData.Roommates[1]);
  console.log("form data:", formData2);
  expect(localStorageData.Roommates[0]).toStrictEqual(formData1);
  expect(localStorageData.Roommates[1]).toStrictEqual(formData2);
  window.localStorage.clear();
});