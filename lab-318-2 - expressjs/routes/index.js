const express = require("express");
const router = express.Router();
const path= require("path")

router.use((req, res, next) => {
    console.log("User Request Time: ", Date.now());
    next();
  });

router.get("/",(req, res)=> {
    res.render("homepage")
})

router.post("/", (req, res)=> {
  console.log("Received form data:", req.body);
  res.send("success")
})



module.exports = router;