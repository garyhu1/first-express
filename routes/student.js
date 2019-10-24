const express = require('express');
const router = express.Router();

// 路由级中间件(一个或多个)
router.use((req,res,next) => {
    console.log("STUDENT",req.method);
    next();
})

router.get("/",(req,res,next) => {
    res.send("学生信息");
})

router.post("/update",(req,res,next) => {
    let body = req.body;
    res.send(body);
})

module.exports = router;