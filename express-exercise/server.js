const express = require("express");
const app = express();

const port = 3000;

//Greetings
app.get("/greeting", (req, res) => {
    res.send("Hello Stranger!")
})

app.get("/greeting/:name", (req, res) => {
    const name = req.params.name
    res.send(`Hello there, ${name}`)
})

//Tip Calculator
app.get("/tip", (req, res) => {
    res.send("Tip Calculator, please add the total and tipPercentage")
})
app.get("/tip/:total/:tipPercentage", (req, res) => {
    const tipPercentage = req.params.tipPercentage;
    const total = req.params.total;
    res.send("Total is " + total + " with tip percentage " + tipPercentage);
})

// Magic 8 Ball
const responses =
    ["It is certain", "It is decidedly so", "Without a doubt", "Yes definitely", "You may rely on it", "As I see it yes", "Most likely",
        "Outlook good", "Yes", "Signs point to yes", "Reply hazy try again", "Ask again later", "Better not tell you now", "Cannot predict now", "Concentrate and ask again", "Don't count on it", "My reply is no", "My sources say no", "Outlook not so good", "Very doubtful"];

app.get("/magic", (req, res) => {
    res.send("Ask Your Question! ")
})
app.get("/magic/:question", (req, res) => {
    const question = decodeURI(req.params.question);
    const answer = responses[Math.floor(Math.random() * responses.length)]
    res.send(`Your Question: ${question}` + "\n" + `and the Answer is: ${answer}`)
})

//Beer on the Wall



app.listen(port, () => {
    console.log(`Server is listening to http://127.0.0.1:${port}/`);
})