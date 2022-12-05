describe("user flow for passwords page", () => {
  // get puppeteer
  const puppeteer = require("puppeteer");
  let page;

  // set variables for test password
  let testacct = "test";
  let testuser = "root";
  let testpwd = "root";

  // get the website first
  beforeAll(async () => {
    const browser = await puppeteer.launch({ headless: false });
    page = await browser.newPage();
    await page.goto("http://127.0.0.1:5500/src/front-end/passwords.html");
  });

  // check to see there are no passwords
  it("First check there are no passwords", async () => {
    const numPasswords = await page.$$eval(
      "password-holder-card",
      (npassword) => {
        return npassword.length;
      }
    );
    expect(numPasswords).toBe(0);
  });

  // check to see if we can add a new password
  it("Add a new password", async () => {
    // click on add in webpage and add new password
    await page.click(
      "body > div.bg-dark.p-5.rounded-lg.m-3 > div.input-group.create-button-div > span > button"
    );
    // wait for the popup box to add passwords
    await page.waitForSelector("#example-modal");
    // need to put in string values for the following because variables were not accepted
    // type in the Account
    await page.$eval("#create-account-field", (acc) => (acc.value = "test"));
    // type in Username
    await page.$eval("#create-username-field", (user) => (user.value = "root"));
    // type in password
    await page.$eval("#create-password-field", (pwd) => (pwd.value = "root"));
    // submit new password
    //let button = await page.$('#create-password-change');
    await page.click("#create-password-change");
    // wait for response
    await page.waitForSelector("body > div.bg-dark.p-5.rounded-lg.m-3");
    //await page.waitFor(3000);
    // check to see if new password was added
    const numPasswords = await page.$$eval("password-holder-card", (n) => {
      return n.length;
    });
    // if new password is added then password card should contain 1 new password
    expect(numPasswords).toBe(1);
  });

  // check to see if the password we created is the correct one and information is stored
  // first we check account
  it("Check account", async () => {
    // grab password card
    const currpassword = await page.$("password-holder-card");
    // grab shadowroot from password card
    let shadowpassword = await currpassword.getProperty("shadowRoot");
    // grab the html element storing the name
    let headerTag = await shadowpassword.$("h2");
    // grab the value of the html element
    let innerText = await headerTag.getProperty("innerText");
    // turn the value into string
    let account = await innerText.jsonValue();
    // compare account with test account
    expect(account).toBe(testacct);
  });

  // second we check username
  it("Check username", async () => {
    // click on account area in webpage
    await page.click("#passwordCard0");
    // wait for the popup box to password info
    await page.waitForSelector("#info-modal");
    // grab username
    const username = await page.$eval(
      "#insert-username-modal",
      (el) => el.innerHTML
    );
    // test that the username gotten is the one that we tested
    expect(username).toBe(testuser);
  });

  // third we check password
  it("Check password", async () => {
    // click on account area in webpage
    await page.click("#passwordCard0");
    // wait for the popup box to password info
    await page.waitForSelector("#info-modal");
    // grab password
    const password = await page.$eval(
      "#insert-password-modal",
      (el) => el.innerHTML
    );
    // test that the password gotten is the one that we tested
    expect(password).toBe(testpwd);
  });

  // check to see if we can update passwords from the list
  it("Check edit passwords", async () => {
    // click on the password list
    await page.click('[id="password-card-edit-id-0"]');
    // wait for response
    await page.waitForSelector("#edit-modal");
    // change account text to "changed"
    await page.$eval("#edit-account-field", (acct) => (acct.value = "changed"));
    // click change button
    await page.click("#edit-password-change");
    // now we are back at list page, now we need to check if it saved
    // wait till we are at password card page
    await page.waitForSelector("html");
    // grab password card
    const curraccount = await page.$("password-holder-card");
    // grab shadowroot from password card
    let shadowaccount = await curraccount.getProperty("shadowRoot");
    // grab the html element storing the name
    let headerTag = await shadowaccount.$("h2");
    // grab the value of the html element
    let innerText = await headerTag.getProperty("innerText");
    // turn the value into string
    let account = await innerText.jsonValue();
    // test to see if notes is the same as test note
    expect(account).toBe("changed");
  });

  // check to see if we can delete passwords from the list
  it("Check delete passwords", async () => {
    // click on the password list
    await page.click("#password-card-delete-id-0");
    // wait for response
    await page.waitForSelector("html");
    const numPasswords = await page.$$eval(
      "password-holder-card",
      (npassword) => {
        return npassword.length;
      }
    );
    expect(numPasswords).toBe(0);
  });
});
