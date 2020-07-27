const http=require('http');

const uc=require('uppercase');

const server =http.createServer((req,res)=>{
    console.log(req.headers);
});

server.listen('9000');