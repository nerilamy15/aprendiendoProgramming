const router = require("express").Router();
const jwt = require("jsonwebtoken");
const verify = require("./verifyToken");
const Info = require("../schemas/info");



//user 

router.post("/user",verify, async (req, res) => {
    //check for fields
    if(!req.body.animal) return res.status(400).send("animal cannot be empty");
    if(!req.body.color) return res.status(400).send("color cannot be empty");
    if(!req.body.result) return res.status(400).send("result cannot be empty");

    const info = new Info({
        animal: req.body.animal,
        color: req.body.color,
        result: req.body.result
    });
    try{
        const savedInfo= await info.save();
        res.json(savedInfo);
    }catch(err){
        res.status(400).send(err);
    }
})


module.exports = router;