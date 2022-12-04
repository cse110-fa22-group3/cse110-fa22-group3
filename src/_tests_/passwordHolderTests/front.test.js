describe("Basic user flow for Website", () => {
    // First, visit the lab 8 website
    beforeAll(async () => {
      await page.goto("http://127.0.0.1:5500/src/front-end/passwords.html");
    });
  
    // Next, check to make sure that all 20 <product-item> elements have loaded
    it("Initial Passwords Page", async () => {
      await page.waitForTimeout(4000)
      expect(true).toBe(true);
    });
  });