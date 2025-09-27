
import { By, Key, Builder, Browser } from "selenium-webdriver";
import { expect } from "chai";

const usernames = ["standard_user","locked_out_user","problem_user","performance_glitch_user","error_user","visual_user"];
const password = ["secret_sauce"];
const firstName = ["Hridoy","Anik","Shovon","Noor","Deep","Jagat"];
const lastName = ["Das","Paul","Saha","Alam","Das","Ghosh"];
const zip = ["1209","1201","1101","8778","2123"];
const expected_OrderMessage = "Thank you for your order!";

//items//
 

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}


async function saucedemo(){
    const driver = await new Builder().forBrowser(Browser.SAFARI).build();
    await driver.manage().window().maximize();
    await driver.get("https://www.saucedemo.com/");
    

    //Log in User//
    const select_user = getRandomNumber(0,0);
    await driver.findElement(By.xpath("//input[@placeholder ='Username']")).sendKeys(`${usernames[select_user]}`);
    await driver.sleep(500);


    //Log in password//
    const select_password = getRandomNumber(0,0);
    await driver.findElement(By.xpath("//input[@placeholder ='Password']")).sendKeys(`${password[select_password]}`);
    await driver.sleep(500);


    //press login//
    await driver.findElement(By.xpath("//input[@name ='login-button']")).click();
    await driver.sleep(500);

    //hamburger menu Click//
    await driver.findElement(By.xpath("//button[contains(@id,'react-burger-menu-btn')]")).click();
    await driver.sleep(500);
    await driver.findElement(By.xpath("//a[contains(@data-test,'reset-sidebar-link')]")).click();
    await driver.sleep(500);

    //close hamburger menu//
    await driver.findElement(By.xpath("//button[contains(@id,'react-burger-cross-btn')]")).click();
    await driver.sleep(500);


    //1st
    await driver.findElement(By.xpath("(//div[contains(@class,'pricebar')]/button)[1]")).click();
    const selectedProduct1 = await driver.findElement(By.xpath("(//div[contains(@class,'inventory_item_name')])[1]")).getText();
    await driver.sleep(500);

    //2nd
    await driver.findElement(By.xpath("(//div[contains(@class,'pricebar')]/button)[3]")).click();
    const selectedProduct2 = await driver.findElement(By.xpath("(//div[contains(@class,'inventory_item_name')])[3]")).getText();
    await driver.sleep(500);

    //3rd
    await driver.findElement(By.xpath("(//div[contains(@class,'pricebar')]/button)[4]")).click();
    const selectedProduct3 = await driver.findElement(By.xpath("(//div[contains(@class,'inventory_item_name')])[4]")).getText();
    await driver.sleep(1000);


    //add 3 items//
    //1 item//
    // const itemData = await driver.findElements(By.xpath("//div[contains(@class,'pricebar')]/button"));
    // const maxItem = (itemData.length - 1);
    // const selectedItem = getRandomNumber(0,maxItem);
    // await driver.sleep(2000);

    // await itemData[selectedItem].click();
    // await driver.sleep(2000);



    //2nd item//


    //add To cart//
    await driver.findElement(By.xpath("//a[contains(@class,'shopping_cart_link')]")).click();
    await driver.sleep(2000);


    //checkout button//
    await driver.findElement(By.xpath("//button[contains(@name,'checkout')]")).click();
    await driver.sleep(2000);

    //User checkout information//
    //First Name//
    const selecteFirstName = getRandomNumber(0,firstName.length - 1);
    await driver.findElement(By.xpath("//input[contains(@placeholder,'First Name')]")).sendKeys(`${firstName[selecteFirstName]}`);//last name//
    await driver.sleep(1000);

    const selecteLastName = getRandomNumber(0,lastName.length - 1);
    await driver.findElement(By.xpath("//input[contains(@placeholder,'Last Name')]")).sendKeys(`${lastName[selecteLastName]}`);//last name//
    await driver.sleep(1000);

    // zip code//
    const selecteZip = getRandomNumber(0,zip.length - 1);
    await driver.findElement(By.xpath("//input[contains(@placeholder,'Zip/Postal Code')]")).sendKeys(`${zip[selecteZip]}`);//last name//
    await driver.sleep(2000);


    //continue Checkout//
    await driver.findElement(By.xpath("//input[contains(@type,'submit')]")).click();
    await driver.sleep(2000);


    //Product check
    //1st product check
    const actual_Product1 = await driver.findElement(By.xpath("(//div[contains(@class,'inventory_item_name')])[1]")).getText();
    expect(selectedProduct1).to.eql(actual_Product1);

    //2st product check
    const actual_Product2 = await driver.findElement(By.xpath("(//div[contains(@class,'inventory_item_name')])[2]")).getText();
    expect(selectedProduct2).to.eql(actual_Product2);

    //3rd product check
    const actual_Product3 = await driver.findElement(By.xpath("(//div[contains(@class,'inventory_item_name')])[3]")).getText();
    expect(selectedProduct3).to.eql(actual_Product3);


    //price check//
    //price 1
    const price1 = await driver.findElement(By.xpath("(//div[contains(@class,'inventory_item_price')])[1]")).getText();
    const getNum1 = price1.replace("$", "");
    const getPrice1 = parseFloat(getNum1);

    //price 2
    const price2 = await driver.findElement(By.xpath("(//div[contains(@class,'inventory_item_price')])[2]")).getText();
    const getNum2 = price2.replace("$", "");
    const getPrice2 = parseFloat(getNum2);

    //price 3
    const price3 = await driver.findElement(By.xpath("(//div[contains(@class,'inventory_item_price')])[3]")).getText();
    const getNum3 = price3.replace("$", "");
    const getPrice3 = parseFloat(getNum3);


    //Item total
    const itemTotal = (getPrice1+getPrice2+getPrice3);

    //check item total
    // const check = await driver.findElement(By.xpath("//div[contains(@data-test,'subtotal-label')]")).getText();
    // const getNum = check.replace("Item total: $", "");
    // const actual_Price = parseFloat(getNum);
    // expect(itemTotal).to.eql(actual_Price);


    //check total price
    const Price = (itemTotal+(itemTotal*0.08)).toFixed(2);
    const totalPrice = String(Price);

    const checkPrice = await driver.findElement(By.xpath("(//div[contains(@data-test,'total-label')])[2]")).getText();
    const actual_Price = checkPrice.replace("Total: $","");
    //const actual_Price = parseFloat(getNum);
    expect(totalPrice).to.eql(actual_Price);


    //finish 
    await driver.findElement(By.xpath("//button[contains(@data-test,'finish')]")).click();

    //check order message
    const actual_orderConfirm =  await driver.findElement(By.xpath("//div[contains(@data-test,'checkout')]/h2")).getText();
    expect(expected_OrderMessage).to.eql(actual_orderConfirm);



    //Back to home
    await driver.findElement(By.xpath("//button[contains(@data-test,'back-to-products')]")).click();

    // again menu Click//
    await driver.findElement(By.xpath("//button[contains(@id,'react-burger-menu-btn')]")).click();
    await driver.sleep(500);
    await driver.findElement(By.xpath("//a[contains(@data-test,'reset-sidebar-link')]")).click();
    await driver.sleep(500);

    //Logout//
    await driver.findElement(By.xpath("//a[contains(@data-test,'logout-sidebar-link')]")).click();
    await driver.sleep(500);




    await driver.quit();

}
saucedemo();