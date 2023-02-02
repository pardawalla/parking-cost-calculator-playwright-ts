import { test, expect, type Page } from "@playwright/test";

// helper functions
async function fillEntryDate(page, entryDate) {
  const elEntryDate = page.locator("#StartingDate");
  await elEntryDate.click();
  await elEntryDate.fill(entryDate);
  const msg = await elEntryDate.inputValue();
  console.log("Entry date is", msg);
  await expect(elEntryDate).toHaveValue("02/04/2023");
}

async function fillLeavingDate(page, leavingDate) {
  const elLeavingDate = page.locator("#LeavingDate");
  await elLeavingDate.click();
  await elLeavingDate.fill(leavingDate);
  const msg = await elLeavingDate.inputValue();
  console.log("Leaving date is", msg);
  await expect(elLeavingDate).toHaveValue("02/04/2023");
}
test.beforeEach(async ({ page }) => {
  await page.goto("https://www.shino.de/parkcalc/");
});

test.describe("estimated parking costs", () => {
  test("valet parking", async ({ page }) => {
    // create a new todo locator
    await page.locator('#ParkingLot').selectOption('Valet');
    const entryDate = "02/04/2023";
    const leavingDate = entryDate;

    await fillEntryDate(page, entryDate);
    await fillLeavingDate(page, leavingDate);

    await page.getByRole("button", { name: "Calculate" }).click();

    const estCost = await page
      .locator('(//span[@class="SubHead"])[1]')
      .innerText();
    console.log("estimated cost is:", estCost);
     expect(estCost).toEqual("$ 12.00");
  });

  test("short-term parking", async ({ page }) => {
    await page.locator('#ParkingLot').selectOption('Short');
    const entryDate = "02/04/2023";
    const leavingDate = entryDate;

    await fillEntryDate(page, entryDate);
    await fillLeavingDate(page, leavingDate);

    await page.getByRole("button", { name: "Calculate" }).click();

    const estCost = await page
      .locator('(//span[@class="SubHead"])[1]')
      .innerText();
    console.log("estimated cost is:", estCost);
    expect(estCost).toEqual("$ 2.00");
  });

  test("economy parking", async ({ page }) => {
    await page.locator('#ParkingLot').selectOption('Economy');
    const entryDate = "02/04/2023";
    const leavingDate = entryDate;

    await fillEntryDate(page, entryDate);
    await fillLeavingDate(page, leavingDate);

    await page.getByRole("button", { name: "Calculate" }).click();

    const estCost = await page
      .locator('(//span[@class="SubHead"])[1]')
      .innerText();
    console.log("estimated cost is:", estCost);
    expect(estCost).toEqual("$ 0.00");

  });


});
