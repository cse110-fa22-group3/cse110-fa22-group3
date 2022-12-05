const { PageEmittedEvents } = require("puppeteer");

describe("Basic user flow for Money Balancer", () => {
  beforeAll(async () => {
    await page.goto("http://localhost:3000/src/front-end/money-balancer.html");
  });

  // Next, check to make sure that all 20 <product-item> elements have loaded
  it("Creating two roommates for test", async () => {
    await page.goto("http://localhost:3000/src/front-end/roommates.html");
    await page.waitForTimeout(2000);
    await page.click("#new");
    await page.waitForTimeout(1000);
    await page.type("#name-1", "testRoommate1");
    await page.type("#birthday-1", "01/01/2001");
    await page.click("#add-roommate-button");
    await page.waitForTimeout(1000);
    await page.click("#new");
    await page.waitForTimeout(1000);
    await page.type("#name-1", "testRoommate2");
    await page.type("#birthday-1", "01/01/2001");
    await page.click("#add-roommate-button");
    await page.goto("http://localhost:3000/src/front-end/money-balancer.html");
    await page.waitForTimeout(2000);
    const roommate1 = await page.$eval(
      "#roommate-0",
      (element) => element.textContent
    );
    const roommate2 = await page.$eval(
      "#roommate-1",
      (element) => element.textContent
    );
    expect(roommate1).toBe("testRoommate1");
    expect(roommate2).toBe("testRoommate2");
  });

  it("Test adding a payment and appropriate values", async () => {
    await page.waitForTimeout(2000);
    await page.click("#radio-pay-0");
    await page.type("#pay-input-field-cost", "100");
    await page.type("#pay-input-field-for", "no reason");
    await page.click("#pay-input-field-button");
    await page.waitForTimeout(2000);
    const owed = await page.$eval("#owed-0", (element) => element.textContent);
    const owes = await page.$eval("#owes-1", (element) => element.textContent);
    expect(owed).toBe("is owed $50");
    expect(owes).toBe("owes $50");
  });

  it("Check if transferring money will changed owed amount", async () => {
    await page.waitForTimeout(2000);
    await page.click("#radio-transfer-from-1");
    //await page.type("#transfer-text-input", "200"); #transfer > li:nth-child(2) > input[type=text]
    await page.type('#transfer > li:nth-child(2) > input[type=text]', '200');
    await page.click("#radio-transfer-to-0");
    await page.click("#transfer-btn");
    await page.waitForTimeout(2000);
    const owed = await page.$eval("#owed-1", (element) => element.textContent);
    const owes = await page.$eval("#owes-0", (element) => element.textContent);
    expect(owed).toBe("is owed $150");
    expect(owes).toBe("owes $150");
  });

  it("Check history", async () => {
    const firstTrans = await page.$eval(
      "#del-history > ul > li:nth-child(2) > span",
      (e) => e.textContent
    );
    expect(firstTrans).toBe("testRoommate1 paid 100 for no reason");
  });

  it("Check history for second transaction", async () => {
    const secondtrans = await page.$eval(
      "#del-history > ul > li:nth-child(1) > span",
      (e) => e.textContent
    );
    expect(secondtrans).toBe("testRoommate2 transferred 200 to testRoommate1");
  });

  it("Test history deletion", async () => {
    await page.click(
      "#del-history > ul > li:nth-child(2) > input[type=checkbox]"
    );
    await page.click("#del-history > input[type=submit]");
    const newTrans = await page.$eval(
      "#del-history > ul > li > span",
      (e) => e.textContent
    );
    expect(newTrans).toBe("testRoommate2 transferred 200 to testRoommate1");
  });
});
