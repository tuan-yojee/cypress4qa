/**
 * Inspect app elements via port 4724 - Nexus Phone (virtual) - % appium -port 4724
 * Run test via port 4723 - Pixel 3 Phone (virtual) - (wdio handles appium -port 4723 auto open/close when test start/end)
 */

describe('Android Element Tests', () => {
    /**
     * Accessibility ID
     * - Highly preferred locator strategy
     * - Can be used for cross-platform automation, the code becomes reusable.
     * - 
     * - syntax: ~
     */
    it('Find element by accesibility id', async () => {
        // [1] Find element App by accesibility id
        // [2] Click on App
        // [3] Assert to see Action Bar by accesibility id

        const appOption = await $('~App');
        await appOption.click();
        const actionBar = await $('~Action Bar')
        await expect(actionBar).toBeExisting();
    });

    /**
     * Class name or Tag name
     * - Not Unique (usually)
     * Ex: TextView, Button, Layout
     */
    it.only('Find element by class name', async () => {
        // [1] Find element with class name or tag android.widget.TextView
        // [2] - Try to print the text of element
        // [2] - Or assert pass
        // [2] - Or assert fail
        const element = await $('android.widget.TextView')
        // console.log(await element.getText())
        // await expect(element).toHaveText('API Demos')
        await expect(element).toHaveText('API Demos ABC')
    });

    /**
     * Xpath
     * - If you cannot use an Accessibility ID, then Xpath is a next option
     * - Long and diffucult to read
     * syntax: //tagname[@attribute=value]
     * Ex: //tagname[@content-desc=value]
     * Ex: //tagname[@resource-id=value]
     * Ex: //tagname[@text=value]
     */
    it('Find element by xpath', () => {
        // [1] Find element App, Click
        // [2] Find element Alert Dialogs, Click
        // [3] Find element List dialog, Click
        // [4] Find element Command one, Click
        // [5] Find element 'You selected: 0 , Command one' and assert

    });

    /**
     * Android UiAutomator
     * - https://webdriver.io/docs/selectors/#android-uiautomator
     */
    it('Find element by Android UiAutomator', () => {
        
    });
});