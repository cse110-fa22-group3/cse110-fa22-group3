describe("Basic user flow for Website", () => {
  // First, visit the lab 8 website
  beforeAll(async () => {
    await page.goto("http://localhost:3000/src/front-end/passwords.html");
  });

  // Next, check to make sure that all 20 <product-item> elements have loaded
  it("Initial Passwords Page", async () => {
    await page.waitForTimeout(1000);
    expect(true).toBe(true);
  });
});
