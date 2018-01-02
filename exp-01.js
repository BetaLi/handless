const puppeteer = require('puppeteer');
const path = require('path');
const dir = require('./config/default');

(async ()=>{
    const brower = await puppeteer.launch();
    const page = await brower.newPage();
    await page.goto("https://cn.bing.com/");
    console.log("Goto page,loading...");

    await page.setViewport({
        width:1920,
        height:1080,
    });
    console.log("Pages viewport setting...");

    await page.waitFor(4000);

    const file = path.join(dir.imgDir,`${Date.now()}.png`);
    await page.screenshot({path:file});
    console.log("screen has been captured.");

    await brower.close();
})();