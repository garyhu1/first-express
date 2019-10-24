const express = require('express');
const router = express.Router();
const MongoService = require('../service/mongo');

router.get('/user',async (req,res,next) => {
    const mongoService = new MongoService();
    let result = await mongoService.query();

    res.send(result);
}) 

module.exports = router;