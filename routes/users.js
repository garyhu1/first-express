var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.param("id",(req,res,next,id) => {
  console.log("USER ID : " + id);
  next();
})

router.get("/:id",(req,res,next) => {
  res.send("GET DATA FROM " + req.params.id);
})

module.exports = router;
