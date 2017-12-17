const puppeteer = require("puppeteer");
const urlToImage = require("./helper/urlToImage");
const dir = require("./config/default");

(async ()=>{
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto("http://image.baidu.com");
    console.log("Go to baidu image.");

    await page.setViewport({
        width:1600,
        height:1800,
    });
    console.log("setView Page done.");

    await page.focus("#kw");
    await page.keyboard.sendCharacter('狗');
    await page.click(".s_search");
    console.log("Find search..");


    page.on("load",async ()=>{
        console.log("Page is loaded.");
        const imgSrc = await page.$$eval(".main_img",imgs => imgs.map(img=>img.src));
        console.log(imgSrc.length);
        imgSrc.map(async (img)=>{
            await page.waitFor(200);
            await urlToImage(img,dir.imgDir);
        });
    });
})();