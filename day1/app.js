const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res)=> {
    if(req.method === "GET" && req.url === "/"){
        res.end(JSON.stringify({ success: true, message: "Welcome to my home page" }));
    }else if(req.method === "GET" && req.url === "/users"){
        fs.readFile('users.txt', 'utf-8', (err, data)=>{
            res.end(JSON.stringify({ success: true, users: data }));
        })
    }else if(req.method === "POST" && req.url === "/users"){
        fs.writeFileSync('users.txt', 'Ijeoma, chisom, ramsey, favour');
        res.end(JSON.stringify({ success: true, message: "Users created successfully" }));
    }else if(req.method === "PUT" && req.url === "/updateuser"){
        fs.writeFileSync('users.txt', 'Ijeoma1, chisom2, ramsey3, favour4');
        res.end(JSON.stringify({ success: true, message: "Users updated successfully" }));
    }else if(req.method === "DELETE" && req.url === "/deleteusers"){
        fs.unlink('users.txt', (err)=> {
            if (err) throw err;
            res.end(JSON.stringify({ success: true, message: "Users deleted successfully" }));
        });
    }else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Route or Method Not Found');
    }
});

server.listen(3000, ()=> {
    console.log("Server running on port 3000");
})