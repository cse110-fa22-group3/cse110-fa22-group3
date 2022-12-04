/**
 * @jest-environment jsdom
 */

// unit tests for roommateListAPI
// createRoommate
const functionAPIs = require("../../testSupportFiles/roommateListTests/unit-test-roommateListAPI");
const choreFunctionAPIs = require("../../testSupportFiles/choresListTests/unit-test-choresListAPI");

test("checks if createRoommate adds a roommate to local storage", () => {
  const formData = {
    name: "Xun Liu",
    birthday: "12/19/2000",
    hobbies: "playing guitar",
    notes: "",
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
    notes: "",
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
  functionAPIs.createRoommate(formData0);
  functionAPIs.createRoommate(formData1);
  formData0.id = 0;
  formData1.id = 1;
  const localStorageData = JSON.parse(
    window.localStorage.getItem("RoommateListData")
  );
  console.log("local storage:", localStorageData.Roommates[0]);
  console.log("form data:", formData0);
  console.log("local storage:", localStorageData.Roommates[1]);
  console.log("form data:", formData1);
  expect(localStorageData.Roommates[0]).toStrictEqual(formData0);
  expect(localStorageData.Roommates[1]).toStrictEqual(formData1);
  window.localStorage.clear();
});

// updateRoommate
test("checks if updateRoommate updates the properties of a roommate", () => {
  const formData0 = {
    name: "Xun Liu",
    birthday: "12/19/2000",
    hobbies: "playing guitar",
    notes: "",
  };

  const id = 0;
  const upData = {
    name: "Mark Liu",
    birthday: "12/19/2000",
    hobbies: "playing guitar",
    notes: "I love Prince!",
  };

  functionAPIs.createRoommate(formData0);
  functionAPIs.updateRoommate(upData, id);
  formData0.id = 0;
  upData.id = 0;
  const localStorageData = JSON.parse(
    window.localStorage.getItem("RoommateListData")
  );
  console.log("local storage:", localStorageData.Roommates[0]);
  console.log("form data:", upData);
  expect(localStorageData.Roommates[0]).toStrictEqual(upData);
  window.localStorage.clear();
});

test("checks if updateRoommate updates the properties of the correct roommate", () => {
  const formData0 = {
    name: "Xun Liu",
    birthday: "12/19/2000",
    hobbies: "playing guitar",
    notes: "",
  };
  const formData1 = {
    name: "Jack Ma",
    birthday: "11/11/1111",
    hobbies: "Making money",
    notes: "I have no interests in money",
  };
  const formData2 = {
    name: "Ellon Ma",
    birthday: "xx/xx/xxxx",
    hobbies: "Speaking English",
    notes: "Hello, I'm Ellon Ma",
  };

  const upData = {
    name: "Ellon Mask",
    birthday: "06/28/1971",
    hobbies: "Being successful",
    notes: "Hello, I'm Ellon Musk.",
  };

  const id = 2;
  functionAPIs.createRoommate(formData0);
  functionAPIs.createRoommate(formData1);
  functionAPIs.createRoommate(formData2);
  functionAPIs.updateRoommate(upData, id);

  formData0.id = 0;
  formData1.id = 1;
  formData2.id = 2;
  upData.id = 2;

  const localStorageData = JSON.parse(
    window.localStorage.getItem("RoommateListData")
  );
  console.log("local storage:", localStorageData.Roommates[2]);
  console.log("form data:", upData);
  expect(localStorageData.Roommates[2]).toStrictEqual(upData);
  window.localStorage.clear();
});

// readRoommate
test("checks if readRoommate returns empty array if there's no roommate", () => {
  const Reading = functionAPIs.readRoommate();
  const localStorageData = JSON.parse(
    window.localStorage.getItem("RoommateListData")
  );
  const Roommates = localStorageData.Roommates;

  console.log("local storage:", Roommates);
  console.log("Reading:", Reading);
  expect(Roommates).toStrictEqual(Reading);
  window.localStorage.clear();
});

test("checks if readRoommate returns a roommate array if there's one roommate", () => {
  const formData = {
    name: "Xun Liu",
    birthday: "12/19/2000",
    hobbies: "playing guitar",
    notes: "",
  };
  functionAPIs.createRoommate(formData);

  const Reading = functionAPIs.readRoommate();
  const localStorageData = JSON.parse(
    window.localStorage.getItem("RoommateListData")
  );
  const Roommates = localStorageData.Roommates;

  console.log("local storage:", Roommates);
  console.log("Reading:", Reading);
  expect(Roommates).toStrictEqual(Reading);
  window.localStorage.clear();
});

test("checks if readRoommate returns a roommate array if there're multiple roommates", () => {
  const formData0 = {
    name: "Xun Liu",
    birthday: "12/19/2000",
    hobbies: "playing guitar",
    notes: "",
  };
  const formData1 = {
    name: "Xun Liu",
    birthday: "12/19/2000",
    hobbies: "playing guitar",
    notes: "",
  };
  const formData2 = {
    name: "Xun Liu",
    birthday: "12/19/2000",
    hobbies: "playing guitar",
    notes: "",
  };
  functionAPIs.createRoommate(formData0);
  functionAPIs.createRoommate(formData1);
  functionAPIs.createRoommate(formData2);
  formData0.id = 0;
  formData1.id = 1;
  formData2.id = 2;

  const Reading = functionAPIs.readRoommate();
  const localStorageData = JSON.parse(
    window.localStorage.getItem("RoommateListData")
  );
  const Roommates = localStorageData.Roommates;

  console.log("local storage:", Roommates);
  console.log("Reading:", Reading);
  expect(Roommates).toStrictEqual(Reading);
  window.localStorage.clear();
});

// readRoommate
test("checks if deleteRoommate deletes a roommate from local storage", () => {
  choreFunctionAPIs.readChores();
  const formData = {
    name: "Xun Liu",
    birthday: "12/19/2000",
    hobbies: "playing guitar",
    notes: "",
  };
  const id = 0;
  const upData = [];
  functionAPIs.createRoommate(formData);
  functionAPIs.deleteRoommate(id);
  const localStorageData = JSON.parse(
    window.localStorage.getItem("RoommateListData")
  );
  const Roommates = localStorageData.Roommates;
  console.log("local storage:", Roommates);
  console.log("form data:", upData);
  expect(localStorageData.Roommates).toStrictEqual(upData);
  window.localStorage.clear();
});

test("checks if deleteRoommate deletes multiple roommates from local storage", () => {
  choreFunctionAPIs.readChores();
  const formData0 = {
    name: "Xun Liu",
    birthday: "12/19/2000",
    hobbies: "playing guitar",
    notes: "",
  };
  const formData1 = {
    name: "Jack Ma",
    birthday: "11/11/1111",
    hobbies: "Making money",
    notes: "I have no interests in money",
  };
  const formData2 = {
    name: "Ellon Ma",
    birthday: "xx/xx/xxxx",
    hobbies: "Speaking English",
    notes: "Hello, I'm Ellon Ma",
  };

  const upData = [];

  functionAPIs.createRoommate(formData0);
  functionAPIs.createRoommate(formData1);
  functionAPIs.createRoommate(formData2);

  formData0.id = 0;
  formData1.id = 1;
  formData2.id = 2;

  for (let id = 0; id < 3; id++) {
    functionAPIs.deleteRoommate(id);
  }

  const localStorageData = JSON.parse(
    window.localStorage.getItem("RoommateListData")
  );
  const Roommates = localStorageData.Roommates;
  console.log("local storage:", Roommates);
  console.log("form data:", upData);
  expect(localStorageData.Roommates).toStrictEqual(upData);
  window.localStorage.clear();
});
