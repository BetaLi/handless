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
let count = 1;

const urlToImage = promisify((url,dir,callback) => {
    count++;
    const mod = /^https:/.test(url) ? https: http;
    const ext = path.extname(url);
    const file = path.join(dir,`${count}_${Date.now()}${ext}`);
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
    count++;
    const matches =base64Str.match(/^data:(.+?);base64,(.+?)$/);
    try{
        const ext = matches[1].split("/")[1];
        const file = path.join(dir,`${count}_base64${Date.now()}.${ext}`);
        await writeFile(file,matches[2],"base64");
        console.log(file);
    }catch (err){
        console.log("Find a error");
    }
};