const router = require("express").Router();
const verify = require("./verifyToken");

router.get("/private", (req, res) => {
    res.json({
        test:"random text"
    })
})


module.exports = router;