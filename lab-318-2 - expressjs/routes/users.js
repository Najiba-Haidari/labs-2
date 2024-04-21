const express = require("express");
const router = express.Router();

const users = [
    {
        id: 1,
        username: 'john_doe',
        email: 'john@example.com',
        role: 'admin'
    },
    {
        id: 2,
        username: 'jane_smith',
        email: 'jane@example.com',
        role: 'user'
    },
    {
        id: 3,
        username: 'sam_jones',
        email: 'sam@example.com',
        role: 'user'
    }
];

router.use((req, res, next) => {
    console.log("User Request Time: ", Date.now());
    next();
  });
  

router
.route("/")
.get((req, res)=> {
    res.render("users", {users})
})



module.exports= router;