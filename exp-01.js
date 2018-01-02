const puppeteer = require('puppeteer');
const path = require('path');
const dir = require('./config/default');

(async ()=>{
    const brower = await puppeteer.launch();
    const page = await brower.newPage();
    await page.goto("http://news.baidu.com/");
    console.log("Goto page,loading...");

    await page.setViewport({
        width:1920,
        height:3080,
    });
    console.log("Pages viewport setting...");
    await page.waitFor(6000);

    const file_png = path.join(dir.imgDir,`${Date.now()}.png`);
    await page.screenshot({path:file_png, fullscreen:true});
    console.log("screen has been captured.");

    const file_pdf = path.join(dir.imgDir,`${Date.now()}.pdf`);
    await page.pdf({
       path:file_pdf,
       format:"letter"
    });
    console.log("Pdf file has been saved.");

    await brower.close();
})();