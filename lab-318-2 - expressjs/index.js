const express = require("express");
// const fs =require("fs")
const app = express();
const exphbs = require("express-handlebars")
const hbs = exphbs.create({})
const port = 3000;
const usersRoutes = require("./routes/users");
const loginRoutes = require("./routes");
const path= require("path")


app.use("/users", usersRoutes);
app.use("/", loginRoutes);

app.use(express.static("public"));

app.engine("handlebars", hbs.engine);
app.set("views", "./views");
app.set("view engine", "handlebars")

app.get("/", (req, res) => {
    res.send("This is HOMMMMME Page");
});
// app.get("/login", (req, res) => {
//     console.log(req.body);
//     res.send("This is for LOGIN form ");
// });
// app.get("/users", (req, res) => {
//     res.send("This is for users only ");
// });
app.get("/download", (req, res) => {
    const filePath = path.join(__dirname, 'public', 'pexels-quang-nguyen-vinh-2132087.jpg');
    res.download(filePath); // Initiates the file download
  });



app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`)
});
