import {Page, test, expect } from '@playwright/test';
import { PlaywrightOSAssertions } from 'BusinessAgnosticScripts/OSAssertions';
import { PlaywrightOSBehaviors } from 'BusinessAgnosticScripts/OSBehaviors';
import { PlaywrightOSInterations } from 'BusinessAgnosticScripts/OSInterations';
/**
 * This is a library to have granular scripts specific for the Order Management application
 */
export class PlaywrightOrderManagementStack {
    readonly page: Page;
    readonly customOSInterations: PlaywrightOSInterations;
    readonly customOSBehaviors: PlaywrightOSBehaviors;
    readonly customOSAssertions: PlaywrightOSAssertions;
  
    constructor(page: Page) {
        this.page = page;
        this.customOSInterations = new PlaywrightOSInterations(page);
        this.customOSBehaviors = new PlaywrightOSBehaviors(page);
        this.customOSAssertions = new PlaywrightOSAssertions(page);
    } 

    async NavigateOrderListWithFilterAndAssertTableData(searchword: string, optionName: string){
         
        await this.customOSInterations.ClickElementByOSPropertyName("OrdersMenuLink");
        await this.page.waitForTimeout(1000);
        //await customOSInterations.FillOSInputByOSPropertyName(page, "SearchInput", searchword);
        await this.customOSBehaviors.ExecuteSimpleSearchPattern("OrdersSearchInput", searchword);
        await this.customOSInterations.DropdownSelectOptionByOSPropertyName("UsersDropdown", optionName)
        // Asserts that table has records
        await this.customOSAssertions.AssertElementVisible("OrderTable");
    }

};