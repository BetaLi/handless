const puppeteer = require('puppeteer');
const path = require('path');
const dir = require('./config/default');
const fs = require('fs');

(async ()=>{
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto("http://www.baidu.com",{waitUntil:'networkidle2'});
    console.log("loading...");

    await page.setViewport({
        width:1920,
        height:5080
    });
    console.log("set Viewport done.");

    const s_def = "前端开发";
    await page.type("#kw",s_def);
    await page.click("#su");
    await page.waitFor(2000);  //必须等待，否则浏览器不能正确刷新页面。
    console.log('Search input has done.');

    const file_pdf = path.join(dir.imgDir,`${Date.now()}.pdf`);
    const file_png = path.join(dir.imgDir,`${Date.now()}.png`);
    const file_txt = path.join(dir.imgDir,`${Date.now()}.txt`);
    const file_md = path.join(dir.imgDir,`${Date.now()}.md`);

    await page.pdf({
            path:file_pdf,
            format:"letter"
    });
    await page.screenshot({path:file_png,fullscreen:true});
    console.log("PDF and screenCapture has Process done.");

    await page.waitFor(".c-container");

    const selector = ".c-container h3 a";
    const text_content = await page.$$eval(selector,anchors=>anchors.map(anchor=>{
        const title = anchor.innerHTML.trim();
        const href = anchor.getAttribute("href");
        return `${title}---${href}`;
    }));


    text_content.map(text=>{fs.appendFile(file_txt, text+"\n", (err) => {
        if (err) throw err;
        console.log('The "data" was appended to file!');
    })});

    const writer = fs.createWriteStream(file_md,(err)=>{if(err) throw err;});
    text_content.map(text=>writer.write(text+"\n\n",(err)=>{
        if(err) throw err;
        console.log("mdFile has download.");
    }));

   await browser.close();
})();
