const http = require('http');

 



 

const server = http.createServer((req, res) => {

	          res.statusCode = 200;

	          res.setHeader('Content-Type', 'text/plain');

	          res.end('Hello World');

});

 

server.listen(process.env.PORT, hostname, () => {

	          console.log(`Server running at [http://$%7bhostname%7d:$%7bport%7d/%60]http://${hostname}:${port}/`);
});
