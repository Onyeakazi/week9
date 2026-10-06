const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res)=> {
    if(req.url === "/user/sendMessage" && req.method === "POST"){
        fs.writeFileSync("message.txt", "Hello, world, welcome to backend");
        res.end(JSON.stringify({success: true, message: "Message sent!"}))
    }else if(req.url === "/user/readMessage" && req.method === "GET"){
        fs.readFile("message.txt", "utf-8", (err, data) => {
            if(err) throw err;
            res.end(JSON.stringify({success: true, message: data}));
        });
    }else if(req.url === "/user/editMessage" && req.method === "PUT"){
        fs.writeFileSync("message.txt", "Updated the file content!");
        res.end(JSON.stringify({success: true, message: "Message Updated"}))
    }else if(req.url === "/user/deleteMessage" && req.method === "DELETE"){
        fs.unlink("message.txt", (err) => {
            if(err) throw err;
            res.end(JSON.stringify({success: true, message: "File deleted successfully!"}));
        });
    }else {
        res.end(JSON.stringify({success: false, message: "Invalid URL or HTTP method"}));
    }
});

server.listen(3000, ()=> {
    console.log("Server running on port 3000!");
})