// unit.test.js
const functionAPIs = require("../../testSupportFiles/passwordHolderTests/unit-test-passwordHolderAPIs");

test("checks if readPasswords returns empty array when localStorage is empty", () => {
  let array = functionAPIs.readPasswords();
  console.log(window.localStorage.getItem("PasswordHolderData"));
  expect(array).toStrictEqual([]);
});

test("checks if createPassword works when adding one element", () => {
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
