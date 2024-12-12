import { Location, Locator, type Page } from '@playwright/test';

export class PlaywrightOSAbstraction {
    readonly page: Page;
  
    constructor(page: Page) {
      this.page = page;
    }
    /*
    ** Get element By ID or testId 
    */
    async GetElementLocatorByOSName(OSName: string):Promise<Locator>{
        const element = "[id$="+OSName+"]";
        let eleLocator = this.page.locator(element);
        if((await eleLocator.count()) > 0){
            return eleLocator
        }else{
            eleLocator = this.page.getByTestId(OSName);
            return eleLocator;
        }
        
        
    }

    async getElementByInnerText(innerText: string): Promise<Locator> {
        return await this.page.locator(`text="${innerText}"`);
    }
    
}