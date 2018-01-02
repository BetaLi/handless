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
        height:1000,
    });
    console.log("setView Page done.");

    await page.focus("#kw");
    const search = 'DOTA2 1920*1080';
    await page.keyboard.type(search,1000);
    //await page.$eval("#kw",input=>input.setAttribute("value","壁纸"));
    await page.click(".s_search");
    console.log("Find search..");


    page.on("load",async ()=>{
        console.log("Page is loaded.");
        const imgSrc = await page.$$eval(".imgitem",imgs => imgs.map(img=>img.getAttribute("data-objurl")));
        console.log(imgSrc.length);
        imgSrc.map(async (img)=>{
            await page.waitFor(2000);
            await urlToImage(img,dir.imgDir);
        });
    });
})();