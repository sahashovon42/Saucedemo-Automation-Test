
import { By, Key, Builder, Browser } from "selenium-webdriver";
import { expect } from "chai";

const usernames = ["standard_user","locked_out_user","problem_user","performance_glitch_user","error_user","visual_user"];
const password = ["secret_sauce"];
const error_message = "Epic sadface: Sorry, this user has been locked out.";

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

async function saucedemo(){
    const driver = await new Builder().forBrowser(Browser.SAFARI).build();
    await driver.manage().window().maximize();
    await driver.get("https://www.saucedemo.com/");
    

    //Log in User//
    const select_user = getRandomNumber(1,1);
    await driver.findElement(By.xpath("//input[@placeholder ='Username']")).sendKeys(`${usernames[select_user]}`);
    await driver.sleep(2000);


    //Log in password//
    const select_password = getRandomNumber(0,0);
    await driver.findElement(By.xpath("//input[@placeholder ='Password']")).sendKeys(`${password[select_password]}`);
    await driver.sleep(2000);


    //press login//
    await driver.findElement(By.xpath("//input[@name ='login-button']")).click();
    await driver.sleep(3000);

    //verify the error message//
    const actual_message = await driver.findElement(By.xpath("//*[contains(text(),'Epic sadface: Sorry, this user has been locked out.')]")).getText();
    expect(error_message).to.eql(actual_message);

    await driver.quit();

}
saucedemo();