const http = require("http");
const https = require("https");
const path = require("path");
const fs = require("fs");
const { promisify } = require("util");
const writeFile = promisify(fs.writeFile);

module.exports =async (src,dir) => {
    if(/\.(jpg|jpeg|gif)$/.test(src)){
        await urlToImage(src,dir);
    }else{
        await base64ToImg(src,dir);
    }
};

const urlToImage = promisify((url,dir,callback) => {
    const mod = /^https:/.test(url) ? https: http;
    const ext = path.extname(url);
    const file = path.join(dir,`${Date.now()}${ext}`);
    mod.get(url,res=>{
        res.pipe(fs.createWriteStream(file))
            .on("finish",()=>{
                callback();
                console.log(file);
            });
    });
});

const base64ToImg = async (base64Str,dir)=>{
    console.log("base64");
    const matches =base64Str.match(/^data:(.+?);base64,(.+?)$/);
    try{
        const ext = matches[1].split("/")[1].replace("jpeg","jpg");
        const file = path.join(dir,`${Date.now()}_base64.${ext}`);
        await writeFile(file,matches[2],"base64");
    }catch (err){
        console.log("Find a error");
    }
};