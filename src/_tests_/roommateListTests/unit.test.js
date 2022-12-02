// unit.test.js
const functionAPIs = require("../../testSupportFiles/roommateListTests/unit-test-roommateListAPI");

test("checks if createRoommate adds a roommate to local storage", () => {
  const formData = {
    id: 1, 
    name: "Xun Liu",
    birthday: "12/19/2000",
    hobbies: "playing guitar",
    notes: ""
  };
  functionAPIs.createRoommate(formData);
  formData.id = 0;
  const localStorageData = JSON.parse(
    window.localStorage.getItem("RoommateListData")
  );
  console.log(window.localStorage.getItem("RoommateListData"));
  expect(localStorageData.Roommates[0]).toStrictEqual(formData);
  window.localStorage.clear();
});

test("checks if createRoommate adds an empty roommate to local storage", () => {
  const formData = {
    id: 1, 
    name: "",
    birthday: "",
    hobbies: "",
    notes: ""
  };
  functionAPIs.createRoommate(formData);
  formData.id = 0;
  const localStorageData = JSON.parse(
    window.localStorage.getItem("RoommateListData")
  );
  console.log(window.localStorage.getItem("RoommateListData"));
  expect(localStorageData.Roommates[0]).toStrictEqual(formData);
  window.localStorage.clear();
});
