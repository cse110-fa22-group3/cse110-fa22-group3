// unit.test.js
const functionAPIs = require("../../testSupportFiles/passwordHolderTests/unit-test-passwordHolderAPIs");

/**
 * @jest-environment jsdom
 */

test("checks if readPasswords returns empty array when localStorage is empty", () => {
  let array = functionAPIs.readPasswords();
  console.log(localStorage.getItem("PasswordHolderData"));
  expect(array).toStrictEqual([]);
});

test("checks if createPassword works when adding one element", () => {
  window.localStorage.clear()
  functionAPIs.readPasswords();
  const formData = {
    key: "Hulu",
    username: "Kalyan",
    password: "topSecret1010",
  };
  functionAPIs.createPassword(formData);
  formData.id = 0;

  const localStorageData = JSON.parse(
    window.localStorage.getItem("PasswordHolderData")
  );
  expect(localStorageData.Passwords[0]).toStrictEqual(formData);
});

test("checks if we can create 100 passwords and that the id count is expected", () => {
  window.localStorage.clear()
  functionAPIs.readPasswords();
  const formData = {
    key: "Hulu",
    username: "Kalyan",
    password: "topSecret1010",
  };
  for(let i = 0; i < 100; i++){
    functionAPIs.createPassword(formData);
  }
  expect(functionAPIs.readIdCount()).toStrictEqual(100);
});

test("checks if updatePassword works when adding password then changing fields", () => {
  window.localStorage.clear()
  functionAPIs.readPasswords();
  const oldData = {
    key: "Hulu",
    username: "Kalyan",
    password: "topSecret1010",
  };
  const newData = {
    key: "Netflix",
    username: "Balyan",
    password: "topSecret2020",
  };
  functionAPIs.createPassword(oldData);
  functionAPIs.updatePassword(0,newData);
  newData.id = 0;
  const localStorageData = JSON.parse(
    window.localStorage.getItem("PasswordHolderData")
  );
  expect(localStorageData.Passwords[0]).toStrictEqual(newData);
});

test("checks if deletePassword works with removing one existing password", () => {
  window.localStorage.clear()
  functionAPIs.readPasswords();
  const formData = {
    key: "Hulu",
    username: "Kalyan",
    password: "topSecret1010",
  };
  functionAPIs.createPassword(formData);
  functionAPIs.deletePassword(0);
  const localStorageData = JSON.parse(
    window.localStorage.getItem("PasswordHolderData")
  );
  expect(localStorageData.Passwords).toStrictEqual([]);
  expect(localStorageData.idPasswordCount).toStrictEqual(1);
});

test("create 100 passwords and then delete all the passwords", () => {
  window.localStorage.clear()
  functionAPIs.readPasswords();
  const formData = {
    key: "Hulu",
    username: "Kalyan",
    password: "topSecret1010",
  };
  for(let i = 0; i < 100; i++){
    functionAPIs.createPassword(formData);
  }
  for(let i = 0; i < 100; i++){
    functionAPIs.deletePassword(i);
  }
  const localStorageData = JSON.parse(
    window.localStorage.getItem("PasswordHolderData")
  );
  expect(localStorageData.Passwords).toStrictEqual([]);
  expect(localStorageData.idPasswordCount).toStrictEqual(100);
})
