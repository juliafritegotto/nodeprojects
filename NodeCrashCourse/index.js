const http = require('http');
const path = require('path');
const fs = require('fs');
const { Console } = require('console');

const server = http.createServer((req, res) => {
    /*   if (req.url === '/') {
          //if equals / it will  gonna read the file index.html that is on public folder
          fs.readFile(path.join(__dirname, 'public', 'index.html'), (err,
              content) => {
              //it'll check for a error
              if (err) throw err;
              //Set  the status and the content type
              res.writeHead(200, { 'Contente-Type': 'text/html' });
              //and 
              Serve html page
              res.end(content);
  
          })
      }
      if (req.url === '/api/users') {
          const users = [
              { name: 'Bob Smith', age: 40 },
              { name: 'John Doe', age: 30 }
          ];
  
          res.writeHead(200, { 'Content-Type': 'application/json' });
          //turn js array of objects into json
          res.end(JSON.stringify(users));
      } */

    //Build file path
    let filePath = path.join(__dirname, 'public', req.url === '/' ?
        'index.html' : req.url);
    //console.log(filePath);
    // console.log(req.url);


    //Extension of file
    let extname = path.extname(filePath);

    //Initial Content Type
    let contentType = 'text/html';

    //Check ext and set content type
    switch (extname) {
        case ".js":
            contentType = "text/javascript";
            break;
        case ".css":
            contentType = "text/css";
            break;
        case ".json":
            contentType = "application/json";
            break;
        case ".png":
            contentType = "image/png";
            break;
        case ".jpg":
            contentType = "image/jpg";
            break;
    }

    //Read File
    fs.readFile(filePath, (err, content) => {
        if (err) {
            if (err.code == 'ENOENT') {
                //Page not found
                fs.readFile(path.join(__dirname, 'public', '404.html'), (err, content) => {
                    res.writeHead(200, { 'Content-Type': 'text/html' });
                    res.end(content, 'uft8');
                }
                );
            } else {
                //Some server error
                res.writeHead(500);
                res.end(`Server Error: ${err.code}`);
            }
        } else {
            //Sucess
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf8');
        }
    });

});


const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));