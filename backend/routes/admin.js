const router = require("express").Router();
const adminInfo = require("../schemas/adminInfo");
const jwt = require("jsonwebtoken");
const verify = require("./verifyToken");



//admin 
router.post("/admin",  verify, async (req,res) => {

    //check for fields
    if(!req.body.temperature) return res.status(400).send("fields cannot be empty");

    //new temp 
    const adminTemp = new adminInfo({
        temperature : req.body.temperature
    });
    try{
        const savedInfo = await adminTemp.save();
        res.json("temperature received");
    }catch(err){
        res.status(400).send({
            message: "failed to send info",
            err
        });
    }

})


module.exports = router;