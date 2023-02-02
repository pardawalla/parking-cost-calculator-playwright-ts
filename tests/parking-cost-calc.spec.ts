import { test, expect, type Page } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("https://www.shino.de/parkcalc/");
});

test.describe("estimated parking costs", () => {
  test("set date", async ({ page }) => {
    // create a new todo locator

    const elEntryDate = page.locator("#StartingDate");
    const elLeavingDate = page.locator("#LeavingDate");
    const entryDate = "02/04/2023";
    const leavingDate = entryDate
    await elEntryDate.click();
    await elEntryDate.fill(entryDate);
    await elLeavingDate.click();
    await elLeavingDate.fill(leavingDate)
    const msg = await elEntryDate.inputValue();
    console.log("the value is", msg);
    await expect(elEntryDate).toHaveValue("02/04/2023");
    await page.getByRole('button', { name: 'Calculate' }).click();

    const estCost = await page.locator('(//span[@class="SubHead"])[1]').innerText()
    console.log('estimated cost is:', estCost);
    await expect(estCost).toEqual('$ 12.00');

  });
});