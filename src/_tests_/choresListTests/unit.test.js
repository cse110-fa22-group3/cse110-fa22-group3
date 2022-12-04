/**
 * @jest-environment jsdom
 */

// import functions
const functionAPIs = require("../../testSupportFiles/choresListTests/unit-test-choresListAPI");
const roommateFunctionAPIs = require("../../testSupportFiles/roommateListTests/unit-test-roommateListAPI");

test("checks if readChores initializes fileds correctly if there's no chore", () => {
  const resData = {
    chores: [],
    archived: [],
    openChoresCount: 0,
    closedChoresCount: 0,
    choresCountId: 1,
  };
  functionAPIs.readChores();
  const localStorageData = JSON.parse(
    window.localStorage.getItem("ChoresListData")
  );
  console.log("local storage:", localStorageData);
  console.log("supposed data:", resData);
  expect(localStorageData).toStrictEqual(resData);
  window.localStorage.clear();
});

test("checks if an empty chore is created in local storage", () => {
  functionAPIs.readChores();
  const formData = {
    title: "",
    description: "",
    assignee: "",
    assignedDate: "",
  };

  const resData = {
    id: 1,
    title: "",
    description: "",
    assignee: "",
    assignedDate: "",
    status: "open",
  };

  functionAPIs.createChore(formData);
  const localStorageData = JSON.parse(
    window.localStorage.getItem("ChoresListData")
  );
  const chores = localStorageData.chores;
  console.log("local storage:", chores[0]);
  console.log("supposed data:", resData);
  expect(chores[0]).toStrictEqual(resData);
  window.localStorage.clear();
});

test("checks readChore returns the correct JSON when empty chore is created in local storgae", () => {
  functionAPIs.readChores();
  const formData = {
    title: "",
    description: "",
    assignee: "",
    assignedDate: "",
  };

  const resData = {
    chores: [
      {
        id: 1,
        title: "",
        description: "",
        assignee: "",
        assignedDate: "",
        status: "open",
      },
    ],
    archived: [],
    openChoresCount: 1,
    closedChoresCount: 0,
    choresCountId: 2,
  };

  functionAPIs.createChore(formData);
  const localStorageData = JSON.parse(
    window.localStorage.getItem("ChoresListData")
  );
  console.log("local storage:", localStorageData);
  console.log("supposed data:", resData);
  expect(localStorageData).toStrictEqual(resData);
  window.localStorage.clear();
});

test("check if createChore creates a non-empty chore", () => {
  functionAPIs.readChores();
  const formData = {
    title: "Wash Dishses",
    description: "Wash dishes with hand",
    assignee: ["Mark", "Park", "Kate"],
    assignedDate: "11/11/1111",
  };
  const resData = {
    id: 1,
    title: "Wash Dishses",
    description: "Wash dishes with hand",
    assignee: ["Mark", "Park", "Kate"],
    assignedDate: "11/11/1111",
    status: "open",
    currRoommate: "Mark",
  };

  functionAPIs.createChore(formData);
  const localStorageData = JSON.parse(
    window.localStorage.getItem("ChoresListData")
  );
  const chores = localStorageData.chores;
  console.log("local storage:", chores[0]);
  console.log("supposed data:", formData);
  expect(chores[0]).toStrictEqual(resData);
  window.localStorage.clear();
});

test("checks readChore returns the correct JSON when a non-empty chore is created in local storgae", () => {
  functionAPIs.readChores();
  const formData = {
    title: "Wash Dishses",
    description: "Wash dishes with hand",
    assignee: ["Mark", "Park", "Kate"],
    assignedDate: "11/11/1111",
  };

  const resData = {
    chores: [
      {
        id: 1,
        title: "Wash Dishses",
        description: "Wash dishes with hand",
        assignee: ["Mark", "Park", "Kate"],
        assignedDate: "11/11/1111",
        status: "open",
        currRoommate: "Mark",
      },
    ],
    archived: [],
    openChoresCount: 1,
    closedChoresCount: 0,
    choresCountId: 2,
  };

  functionAPIs.createChore(formData);
  const localStorageData = JSON.parse(
    window.localStorage.getItem("ChoresListData")
  );
  console.log("local storage:", localStorageData);
  console.log("supposed data:", resData);
  expect(localStorageData).toStrictEqual(resData);
  window.localStorage.clear();
});

test("check if createChore creates multiple non-empty chore", () => {
  functionAPIs.readChores();
  const formData0 = {
    title: "Wash Dishses",
    description: "Wash dishes with hand",
    assignee: ["Mark", "Park", "Kate"],
    assignedDate: "11/11/1111",
  };
  const formData1 = {
    title: "Clean floor",
    description: "Clean floor with vaccum",
    assignee: ["Park", "Mark", "Kate"],
    assignedDate: "11/12/1111",
  };

  const formData2 = {
    title: "Move TV",
    description: "Move TV away from there",
    assignee: ["Kate", "Mark", "Park"],
    assignedDate: "11/19/1111",
  };

  const resData = [
    {
      id: 1,
      title: "Wash Dishses",
      description: "Wash dishes with hand",
      assignee: ["Mark", "Park", "Kate"],
      assignedDate: "11/11/1111",
      status: "open",
      currRoommate: "Mark",
    },
    {
      id: 2,
      title: "Clean floor",
      description: "Clean floor with vaccum",
      assignee: ["Park", "Mark", "Kate"],
      assignedDate: "11/12/1111",
      status: "open",
      currRoommate: "Park",
    },
    {
      id: 3,
      title: "Move TV",
      description: "Move TV away from there",
      assignee: ["Kate", "Mark", "Park"],
      assignedDate: "11/19/1111",
      status: "open",
      currRoommate: "Kate",
    },
  ];

  functionAPIs.createChore(formData0);
  functionAPIs.createChore(formData1);
  functionAPIs.createChore(formData2);
  const localStorageData = JSON.parse(
    window.localStorage.getItem("ChoresListData")
  );
  const chores = localStorageData.chores;
  console.log("local storage:", chores);
  console.log("supposed data:", resData);
  expect(chores).toStrictEqual(resData);
  window.localStorage.clear();
});

test("checks readChore returns the correct JSON when multiple non-empty chores are created in local storgae", () => {
  functionAPIs.readChores();
  const formData0 = {
    title: "Wash Dishses",
    description: "Wash dishes with hand",
    assignee: ["Mark", "Park", "Kate"],
    assignedDate: "11/11/1111",
  };
  const formData1 = {
    title: "Clean floor",
    description: "Clean floor with vaccum",
    assignee: ["Park", "Mark", "Kate"],
    assignedDate: "11/12/1111",
  };

  const formData2 = {
    title: "Move TV",
    description: "Move TV away from there",
    assignee: ["Kate", "Mark", "Park"],
    assignedDate: "11/19/1111",
  };

  const resData = {
    chores: [
      {
        id: 1,
        title: "Wash Dishses",
        description: "Wash dishes with hand",
        assignee: ["Mark", "Park", "Kate"],
        assignedDate: "11/11/1111",
        status: "open",
        currRoommate: "Mark",
      },
      {
        id: 2,
        title: "Clean floor",
        description: "Clean floor with vaccum",
        assignee: ["Park", "Mark", "Kate"],
        assignedDate: "11/12/1111",
        status: "open",
        currRoommate: "Park",
      },
      {
        id: 3,
        title: "Move TV",
        description: "Move TV away from there",
        assignee: ["Kate", "Mark", "Park"],
        assignedDate: "11/19/1111",
        status: "open",
        currRoommate: "Kate",
      },
    ],
    archived: [],
    openChoresCount: 3,
    closedChoresCount: 0,
    choresCountId: 4,
  };

  functionAPIs.createChore(formData0);
  functionAPIs.createChore(formData1);
  functionAPIs.createChore(formData2);
  const localStorageData = JSON.parse(
    window.localStorage.getItem("ChoresListData")
  );
  console.log("local storage:", localStorageData);
  console.log("supposed data:", resData);
  expect(localStorageData).toStrictEqual(resData);
  window.localStorage.clear();
});

test("check if queryChore returns an empty object when can't find in chores", () => {
  functionAPIs.readChores();
  const resData = {};
  const query = functionAPIs.queryChore("chores", 2);
  console.log("actual: ", query);
  console.log("supposed: ", resData);
  expect(query).toStrictEqual(resData);
  window.localStorage.clear();
});

test("check if queryChore returns an empty object when can't find in archived", () => {
  functionAPIs.readChores();
  const resData = {};
  const query = functionAPIs.queryChore("archived", 2);
  console.log("actual: ", query);
  console.log("supposed: ", resData);
  expect(query).toStrictEqual(resData);
  window.localStorage.clear();
});

test("check if queryChore returns A JSON with info on a chore when local storage is not empty", () => {
  functionAPIs.readChores();
  const formData0 = {
    title: "Wash Dishses",
    description: "Wash dishes with hand",
    assignee: ["Mark", "Park", "Kate"],
    assignedDate: "11/11/1111",
  };
  const formData1 = {
    title: "Clean floor",
    description: "Clean floor with vaccum",
    assignee: ["Park", "Mark", "Kate"],
    assignedDate: "11/12/1111",
  };

  const formData2 = {
    title: "Move TV",
    description: "Move TV away from there",
    assignee: ["Kate", "Mark", "Park"],
    assignedDate: "11/19/1111",
  };

  const resData = {
    id: 3,
    title: "Move TV",
    description: "Move TV away from there",
    assignee: ["Kate", "Mark", "Park"],
    assignedDate: "11/19/1111",
    status: "open",
    currRoommate: "Kate",
  };

  const id = 3;

  functionAPIs.createChore(formData0);
  functionAPIs.createChore(formData1);
  functionAPIs.createChore(formData2);

  const query = functionAPIs.queryChore("chores", id);

  console.log("actual: ", query);
  console.log("supposed: ", resData);
  expect(query).toStrictEqual(resData);
  window.localStorage.clear();
});

test("checks if updateChore correctly updates multiple non-empty chores in local storgae", () => {
  functionAPIs.readChores();
  const formData0 = {
    title: "Wash Dishses",
    description: "Wash dishes with hand",
    assignee: ["Mark", "Park", "Kate"],
    assignedDate: "11/11/1111",
  };
  const formData1 = {
    title: "Clean floor",
    description: "Clean floor with vaccum",
    assignee: ["Park", "Mark", "Kate"],
    assignedDate: "11/12/1111",
  };

  const formData2 = {
    title: "Move TV",
    description: "Move TV away from there",
    assignee: ["Kate", "Mark", "Park"],
    assignedDate: "11/19/1111",
  };

  const upData0 = {
    title: "Wash Socks",
    description: "Wash socks with hand",
    assignee: ["Pete", "Park", "Kate"],
    assignedDate: "12/11/1111",
  };
  const upData1 = {
    title: "Clean roof",
    description: "Clean roof with vaccum",
    assignee: ["Park", "Pete", "Kate"],
    assignedDate: "12/12/1111",
  };
  const upData2 = {
    title: "Move closet",
    description: "Move closet away from there",
    assignee: ["Kitty", "Pete", "Prince"],
    assignedDate: "01/19/1112",
  };

  const resData = {
    chores: [
      {
        id: 1,
        title: "Wash Dishses",
        description: "Wash dishes with hand",
        assignee: ["Mark", "Park", "Kate"],
        assignedDate: "11/11/1111",
        status: "open",
        currRoommate: "Mark",
      },
      {
        id: 2,
        title: "Clean roof",
        description: "Clean roof with vaccum",
        assignee: ["Park", "Pete", "Kate"],
        assignedDate: "12/12/1111",
        // status: "open",
        currRoommate: "Park",
      },
      {
        id: 3,
        title: "Move closet",
        description: "Move closet away from there",
        assignee: ["Kitty", "Pete", "Prince"],
        assignedDate: "01/19/1112",
        // status: "open",
        currRoommate: "Kitty",
      },
    ],
    archived: [],
    openChoresCount: 3,
    closedChoresCount: 0,
    choresCountId: 4,
  };

  functionAPIs.createChore(formData0);
  functionAPIs.createChore(formData1);
  functionAPIs.createChore(formData2);
  //functionAPIs.updateChore(1, "chores", upData0);
  functionAPIs.updateChore(2, "chores", upData1);
  functionAPIs.updateChore(3, "chores", upData2);
  const localStorageData = JSON.parse(
    window.localStorage.getItem("ChoresListData")
  );
  console.log("local storage:", localStorageData);
  console.log("supposed data:", resData);
  expect(localStorageData).toStrictEqual(resData);
  window.localStorage.clear();
});

test("check if closeChore correctly closes chores and put them to archive", () => {
  functionAPIs.readChores();
  const formData0 = {
    title: "Wash Dishses",
    description: "Wash dishes with hand",
    assignee: ["Mark", "Park", "Kate"],
    assignedDate: "11/11/1111",
  };
  const formData1 = {
    title: "Clean floor",
    description: "Clean floor with vaccum",
    assignee: ["Park", "Mark", "Kate"],
    assignedDate: "11/12/1111",
  };

  const formData2 = {
    title: "Move TV",
    description: "Move TV away from there",
    assignee: ["Kate", "Mark", "Park"],
    assignedDate: "11/19/1111",
  };

  const resData = {
    chores: [
      {
        id: 2,
        title: "Clean floor",
        description: "Clean floor with vaccum",
        assignee: ["Park", "Mark", "Kate"],
        assignedDate: "11/12/1111",
        status: "open",
        currRoommate: "Park",
      },
    ],
    archived: [
      {
        id: 1,
        title: "Wash Dishses",
        description: "Wash dishes with hand",
        assignee: ["Mark", "Park", "Kate"],
        assignedDate: "11/11/1111",
        status: "closed",
        currRoommate: "Mark",
      },
      {
        id: 3,
        title: "Move TV",
        description: "Move TV away from there",
        assignee: ["Kate", "Mark", "Park"],
        assignedDate: "11/19/1111",
        status: "closed",
        currRoommate: "Kate",
      },
    ],
    openChoresCount: 1,
    closedChoresCount: 2,
    choresCountId: 4,
  };

  functionAPIs.createChore(formData0);
  functionAPIs.createChore(formData1);
  functionAPIs.createChore(formData2);
  functionAPIs.closeChore(1);
  functionAPIs.closeChore(3);
  const localStorageData = JSON.parse(
    window.localStorage.getItem("ChoresListData")
  );
  console.log("local storage:", localStorageData);
  console.log("supposed data:", resData);
  expect(localStorageData).toStrictEqual(resData);
  window.localStorage.clear();
});

test("checks if reOpenChore reopens chores that closed", () => {
  functionAPIs.readChores();
  const formData0 = {
    title: "Wash Dishses",
    description: "Wash dishes with hand",
    assignee: ["Mark", "Park", "Kate"],
    assignedDate: "11/11/1111",
  };
  const formData1 = {
    title: "Clean floor",
    description: "Clean floor with vaccum",
    assignee: ["Park", "Mark", "Kate"],
    assignedDate: "11/12/1111",
  };

  const formData2 = {
    title: "Move TV",
    description: "Move TV away from there",
    assignee: ["Kate", "Mark", "Park"],
    assignedDate: "11/19/1111",
  };

  const resData = {
    chores: [
      {
        id: 2,
        title: "Clean floor",
        description: "Clean floor with vaccum",
        assignee: ["Park", "Mark", "Kate"],
        assignedDate: "11/12/1111",
        status: "open",
        currRoommate: "Park",
      },
      {
        id: 3,
        title: "Move TV",
        description: "Move TV away from there",
        assignee: ["Kate", "Mark", "Park"],
        assignedDate: "11/19/1111",
        status: "closed",
        currRoommate: "Kate",
      },
    ],
    archived: [
      {
        id: 1,
        title: "Wash Dishses",
        description: "Wash dishes with hand",
        assignee: ["Mark", "Park", "Kate"],
        assignedDate: "11/11/1111",
        status: "closed",
        currRoommate: "Mark",
      },
    ],
    openChoresCount: 2,
    closedChoresCount: 1,
    choresCountId: 4,
  };

  functionAPIs.createChore(formData0);
  functionAPIs.createChore(formData1);
  functionAPIs.createChore(formData2);
  functionAPIs.closeChore(1);
  functionAPIs.closeChore(3);
  functionAPIs.reOpenChore(3);
  const localStorageData = JSON.parse(
    window.localStorage.getItem("ChoresListData")
  );
  console.log("local storage:", localStorageData);
  console.log("supposed data:", resData);
  expect(localStorageData).toStrictEqual(resData);
  window.localStorage.clear();
});

test("checks if clearArchive clears archive", () => {
  functionAPIs.readChores();
  const formData0 = {
    title: "Wash Dishses",
    description: "Wash dishes with hand",
    assignee: ["Mark", "Park", "Kate"],
    assignedDate: "11/11/1111",
  };
  const formData1 = {
    title: "Clean floor",
    description: "Clean floor with vaccum",
    assignee: ["Park", "Mark", "Kate"],
    assignedDate: "11/12/1111",
  };

  const formData2 = {
    title: "Move TV",
    description: "Move TV away from there",
    assignee: ["Kate", "Mark", "Park"],
    assignedDate: "11/19/1111",
  };

  const resData = {
    chores: [
      {
        id: 2,
        title: "Clean floor",
        description: "Clean floor with vaccum",
        assignee: ["Park", "Mark", "Kate"],
        assignedDate: "11/12/1111",
        status: "open",
        currRoommate: "Park",
      },
      {
        id: 3,
        title: "Move TV",
        description: "Move TV away from there",
        assignee: ["Kate", "Mark", "Park"],
        assignedDate: "11/19/1111",
        status: "closed",
        currRoommate: "Kate",
      },
    ],
    archived: [],
    openChoresCount: 2,
    closedChoresCount: 0,
    choresCountId: 4,
  };

  functionAPIs.createChore(formData0);
  functionAPIs.createChore(formData1);
  functionAPIs.createChore(formData2);
  functionAPIs.closeChore(1);
  functionAPIs.closeChore(3);
  functionAPIs.reOpenChore(3);
  functionAPIs.clearArchive();
  const localStorageData = JSON.parse(
    window.localStorage.getItem("ChoresListData")
  );
  console.log("local storage:", localStorageData);
  console.log("supposed data:", resData);
  expect(localStorageData).toStrictEqual(resData);
  window.localStorage.clear();
});

test("check if checkDate corrects the assignedDate", () => {
  functionAPIs.readChores();
  const formData = {
    title: "Wash Dishses",
    description: "Wash dishes with hand",
    assignee: ["Mark"],
    assignedDate: "11/11/1111",
  };
  const resData = {
    id: 1,
    title: "Wash Dishses",
    description: "Wash dishes with hand",
    assignee: ["Mark"],
    assignedDate: "12/3/2022",
    status: "open",
    currRoommate: "Mark",
  };

  functionAPIs.createChore(formData);
  const localStorageData = functionAPIs.readChores();
  const chore = localStorageData.chores[0];
  console.log("local storage:", chore);
  console.log("supposed data:", resData);
  expect(chore["assignedDate"]).toStrictEqual("12/3/2022");
  window.localStorage.clear();
});

test("check if checkDate corrects the assignedDate", () => {
  functionAPIs.readChores();
  const formData = {
    title: "Wash Dishses",
    description: "Wash dishes with hand",
    assignee: ["Mark"],
    assignedDate: "12/03/2022",
  };
  const resData = {
    id: 1,
    title: "Wash Dishses",
    description: "Wash dishes with hand",
    assignee: ["Mark"],
    assignedDate: "12/3/2022",
    status: "open",
    currRoommate: "Mark",
  };

  functionAPIs.createChore(formData);
  const localStorageData = functionAPIs.readChores();
  const chore = localStorageData.chores[0];
  console.log("local storage:", chore);
  console.log("supposed data:", resData);
  expect(chore["currRoommate"]).toStrictEqual("Mark");
  window.localStorage.clear();
});

// readRoommate
test("checks if deleteRoommate deletes a roommate from chores", () => {
  functionAPIs.readChores();
  const formData = {
    name: "Xun Liu",
    birthday: "12/19/2000",
    hobbies: "playing guitar",
    notes: "",
  };
  const formDataC = {
    title: "Wash Dishses",
    description: "Wash dishes with hand",
    assignee: ["Xun Liu"],
    assignedDate: "12/03/2022",
  };
  const id = "Xun Liu";
  roommateFunctionAPIs.createRoommate(formData);
  functionAPIs.createChore(formDataC);
  functionAPIs.removeFromChore(id);
  let localStorageData = JSON.parse(
    window.localStorage.getItem("RoommateListData")
  );
  let localStorageDataC = JSON.parse(
    window.localStorage.getItem("ChoresListData")
  );
  const Roommates = localStorageData.Roommates;
  const chores = localStorageDataC.chores;
  console.log("Roommates: ", Roommates);
  console.log("chores: ", chores);
  expect(chores[0]["assignee"]).toStrictEqual([-1]);
  window.localStorage.clear();
});
