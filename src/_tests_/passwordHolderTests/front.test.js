const { PageEmittedEvents } = require("puppeteer");

describe("Basic user flow for Website", () => {
  // First, visit the lab 8 website
  beforeAll(async () => {
    await page.goto("http://localhost:3000/src/front-end/passwords.html");
  });

  // Next, check to make sure that all 20 <product-item> elements have loaded
  it("Adding one password", async () => {
    page.waitForTimeout(2000);
    const noPasswordText = await page.$eval(
      "#no-elements-present",
      (element) => element.textContent
    );
    expect(noPasswordText).toBe("No passwords to show");
    await page.click("#add-button-password");
    await page.waitForTimeout(1000);
    await page.type("input[name=accountTextInput]", "secret account");
    await page.type("input[name=usernameTextInput]", "secret username");
    await page.type("input[name=passwordTextInput]", "secret password");
    await page.click("#create-password-change");
    const passwordCards = await page.$$("password-holder-card");
    expect(passwordCards.length).toBe(1);
  });
  it("Checking passsword info", async () => {
    await page.waitForTimeout(2000);
    await page.click("#passwordCard0");
    await page.waitForTimeout(1000);
    const username = await page.$eval(
      "#insert-username-modal",
      (element) => element.textContent
    );
    const password = await page.$eval(
      "#insert-password-modal",
      (element) => element.textContent
    );
    await page.click("#info-modal-close-button");
    expect(username).toBe("secret username");
    expect(password).toBe("secret password");
  });
  it("Editing password info", async () => {
    await page.waitForTimeout(2000);
    await page.click("#password-card-edit-id-0");
    await page.waitForTimeout(2000);
    await page.type("#edit-account-field", "new account");
    await page.type("#edit-username-field", "new username");
    await page.type("#edit-password-field", "new password");
    await page.click("#edit-password-change");
    await page.waitForTimeout(2000);
    await page.click("#passwordCard0");
    await page.waitForTimeout(1000);
    const username = await page.$eval(
      "#insert-username-modal",
      (element) => element.textContent
    );
    const password = await page.$eval(
      "#insert-password-modal",
      (element) => element.textContent
    );
    await page.click("#info-modal-close-button");
    expect(username).toBe("new username");
    expect(password).toBe("new password");
  });
  it("Delete password", async () => {
    await page.waitForTimeout(2000);
    await page.click("#password-card-delete-id-0");
    await page.waitForTimeout(2000);
    const passwordCards = await page.$$("password-holder-card");
    expect(passwordCards.length).toBe(0);
    const noPasswordText = await page.$eval(
      "#no-elements-present",
      (element) => element.textContent
    );
    expect(noPasswordText).toBe("No passwords to show");
  });
});
