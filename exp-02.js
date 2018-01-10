const puppeteer = require("puppeteer");
const dir  = require("./config/default");
const path = require("path");

(async ()=>{
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto("http://www.baidu.com");
    console.log("goto baidu page...");

    const s_def = "CMCC";
    await page.type("#kw",s_def);
    await page.click("#su");
    await page.waitFor(2000);  //必须等待，否则浏览器不能正确刷新页面。
    console.log('Search input has done.');

    const file_pdf = path.join(dir.imgDir,`${Date.now()}.pdf`);

    await page.pdf({
        path:file_pdf,
        format:"A4"
    });
})();