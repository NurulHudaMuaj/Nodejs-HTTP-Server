const http = require("http");
const fs = require("fs");
const url = require("url");

const server = http.createServer((req, res) => {
  const path = new URL(req.url, `http://${req.headers.host}`).pathname;
  if (path === '/'|| path === '/home') {
    fs.readFile('./frontend_folder/index.html', 'utf-8', (err, data) => {
      res.writeHead(200, { "content-type": "text/html" });
      res.end(data);
    });
  } 
  
  else if (path === '/about') {
    fs.readFile('./frontend_folder/about.html', 'utf-8', (err, data) => {
      res.writeHead(200, { "content-type": "text/html" });
      res.end(data);
    });
  }
  else if(path==='/style.css'){
    fs.readFile('./frontend_folder/style.css', 'utf-8', (err, data) => {

       if(err){
        res.writeHead(500)
        res.end('CSS File not found');
        return;
       }
      res.writeHead(200, { "content-type": "text/css" });
      res.end(data);
    });
  }

  else{
    res.writeHead(400,{'content-type':'text/html'})
    res.end('<h1>Page not found</h1>')
  }
});

const port = 3002;
server.listen(port, () => {
  console.log(`server is running ${port}`);
});
