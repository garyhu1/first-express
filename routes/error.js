const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

router.get("/",(req,res,next) => {
    throw new Error("BROKEN");
})

router.get('/readFile',(req,res,next) => {
    let filename = req.query.fname;
    console.log("FILE",filename);
    const file = path.resolve(__dirname,'../public/file',filename);
    fs.readFile(file,(err,data) => {
        if(err){
            next(err);
        }else {
            console.log(data)
            res.send(data);
        }
    })
})

module.exports = router;