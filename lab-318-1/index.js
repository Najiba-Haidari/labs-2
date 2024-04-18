const http = require("http");

const hostname = "127.0.0.1";
const port = 3000;

const server = http.createServer((req, res) => {

    switch (req.url) {
        case "/":
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/html');
            res.write('<h1 style="color: red">Welcome to Home Page!</h1>');
            res.write('<p>I wonder what else we can send...</p>');
            res.end("the end");
            break;
        case "/profile":
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/html');
            res.write('<h1 style="color: red">This is the profile page</h1>');
            res.write('<p>I wonder what else we can send...</p>');
            res.end();
            break;
        default:
            res.statusCode = 404;
            res.setHeader('Content-Type', 'text/html');
            res.write('<h1 style="color: red">404 NOT FOUND</h1>');
            res.end();
            break;
    }
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});

