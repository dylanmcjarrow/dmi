const http = require('http');
const nStatic = require('node-static');
const fileServer = new nStatic.Server('./dist');
http.createServer(function (req, res) {
  fileServer.serve(req, res);
}).listen(3000);
