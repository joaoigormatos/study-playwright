import { test, Page } from "@playwright/test";
import { CustomerFormFill, CustomerFormFillData } from "./customer";
import path from "path";

const formFill = async (page: Page, data: CustomerFormFill) => {
  await page.getByLabel("First name").fill(data.first_name);
  await page.getByLabel("Last name").fill(data.last_name);
  if (data.gender === "Male") {
    await page.getByLabel("Male", { exact: true }).check();
  } else if (data.gender === "Female") {
    await page.getByLabel("Female", { exact: true }).check();
  } else {
    await page.getByLabel("In Between", { exact: true }).check();
  }
  await page.waitForTimeout(3000);
  await page.getByLabel("Date of birth").click();
  await page.getByRole("cell", { name: "6" }).nth(1).click();
  await page.getByLabel("Address").fill(data.address);
  await page.getByLabel("Email").fill(data.email);
  await page.getByLabel("Password").fill(data.password);
  await page.getByLabel("Company").fill(data.company);
  await page.getByLabel("Role").selectOption(data.role);
  // await page.getByLabel("Job expectation").selectOption("Nice manager/leader");
  // await page.getByLabel("Job expectation").selectOption("Excellent colleagues");
  // await page.getByLabel("Job expectation").selectOption("Good teamwork");
  // await page.getByText("Read books").click();
  // await page.getByText("Contribute to opensource").click();
  // await page.getByLabel("Comment").fill("adadasdasdasd");
  await page.getByRole("button", { name: "Submit" }).click();
  // await page.getByText("Successfully submitted!").click();
};

test.describe("text", () => {
  CustomerFormFillData.import(
    path.join(__dirname, "CustomerFormFill.csv")
  ).then((dataSourceRaw) => {
    const dataSource = dataSourceRaw as CustomerFormFill[];
    for (const data of dataSource) {
      test(data.ntc, async ({ page }) => {
        await page.goto(
          "https://katalon-test.s3.amazonaws.com/aut/html/form.html"
        );
        await formFill(page, data);
      });
    }
  });
});
