const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res)=> {

    if(req.method === "GET" && req.url === "/"){
        res.end(JSON.stringify({Message: "Welcome to my home page."}))
    }else if(req.method === "GET" && req.url === "/user"){
        res.writeHead(200, {'content-type': 'application/json'});
        fs.readFile("users-file.txt", "utf-8", (err, data)=> {
            if(err) throw err;
            res.end("user name: " + data);
        });
    }else if(req.method === "POST" && req.url === "/user"){
        res.writeHead(200, {'content-type': 'application/json'});
        fs.writeFileSync("users-file.txt", "my name is kosi");
        res.end("User created");
    }else if(req.method === "PUT" && req.url === "/update"){
        res.writeHead(201, {'content-type': 'application/json'});
        fs.writeFileSync("users-file.txt", "my name is KOSI, the name was updated");
        res.end("User name updated");
    }else if(req.method === "DELETE" && req.url === "/delete"){
        res.writeHead(200, {'content-type': 'application/json'});
        fs.unlink("users-file.txt", (err)=> {
            if(err) throw err;
            res.end("User deleted");
        });
    }else{
        res.writeHead(404, {'content-type': 'plain/text'});
        res.end("Page not found, or invalid request.")
    }
});

server.listen(3000, ()=> {
    console.log("Server running on port 3000");
});