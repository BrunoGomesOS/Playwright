import { test, expect } from '@playwright/test';
import { PlaywrightOrderManagementStack } from 'OrderManagementScritpts/OrderManagementStackScripts';
import { PlaywrightOSAssertions } from 'BusinessAgnosticScripts/OSAssertions';
import { PlaywrightOSBehaviors } from 'BusinessAgnosticScripts/OSBehaviors';
import { PlaywrightOSInterations } from 'BusinessAgnosticScripts/OSInterations';

test('Login and navigate to orders', async ({ page }) => {
  test.setTimeout(60_000); //set test total timeout (60 seconds)
  const customOSInterations = new PlaywrightOSInterations(page);
  const customOSBehaviors = new PlaywrightOSBehaviors(page);
  const customOSAssertions = new PlaywrightOSAssertions(page);
  const customOrderMngtStack = new PlaywrightOrderManagementStack(page);
  await page.goto('/OrderManagement/Login');
  await customOSInterations.ClickElementByOSPropertyName("Input_UsernameVal");

  const element = "input[id$=UserNameInput]";
  await page.locator(element).click();

  await page.getByTestId('SampleUsersLink').click();
  await page.getByTestId('SampleUserLoginLink0').click();
  await expect(page.locator('#b1-Dashboard')).toContainText('Welcome, Manuel Luís');

  // Assert existence of button to create a new order
  await customOSAssertions.AssertElementVisible("ButtonNewOrder");
  // await customOSAssertions.AssertButtonElementVisible(page, "ButtonNewOrder");
  
  //Navigate to the Orders List And do a Search and Assert if Table has Data
  await customOrderMngtStack.NavigateOrderListWithFilterAndAssertTableData("Business fluence", "Ana Martins");

  //Navigate to the Order detail
  await customOSInterations.ClickLinkInTableRowColumnByOSPropertyName("OrderTable",1,1);
  
  //come back to orders list
  await customOSInterations.ClickElementByOSPropertyName("OrdersMenuLink");

  // slide the slider
  await customOSInterations.SlideXValuesByOSPropertyName("RangeSlider", 20700,7000);
  
  // Asserts that table has records
  await customOSAssertions.AssertElementVisible("OrderTable");
  //await customOSAssertions.AssertTableVisible(page, "OrderTable");

  await page.getByRole('link', { name: 'Dashboard' }).click();
  await page.waitForTimeout(2000);

  await customOSInterations.ClickElementByOSPropertyName("LogoutLink");
  //await page.getByTestId('LogoutLink').click();
 
});