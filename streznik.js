
var http = require('http');
var fs  = require('fs');
var path = require('path');
var mime = require('mime');
var cache = {};

function forwardError404(response) {
  response.writeHead(404, {'Content-Type': 'text/plain'});
  response.write('Error 404: Source not found.');
  response.end();
}

function forwardFile(response, filePath, fileContent) {
  response.writeHead(200, {"content-type": mime.lookup(path.basename(filePath))});
  response.end(fileContent);
}

function forwardStaticContent(response, cache, absoluteFilePath) {
  if (cache[absoluteFilePath]) {
    forwardFile(response, absoluteFilePath, cache[absoluteFilePath]);
  } else {
    fs.exists(absoluteFilePath, function(fileExists) {
      if (fileExists) {
        fs.readFile(absoluteFilePath, function(napaka, datotekaVsebina) {
          if (napaka) {
            forwardError404(response);
          } else {
            cache[absoluteFilePath] = datotekaVsebina;
            forwardFile(response, absoluteFilePath, datotekaVsebina);
          }
        });
      } else {
        forwardError404(response);
      }
    });
  }
}

var streznik = http.createServer(function(req, resp) {
  var filePath = false;

  if (req.url == '/')
    filePath = 'public/index.html';
  else
    filePath = 'public' + req.url;

  var absoluteFilePath = './' + filePath;
  forwardStaticContent(resp, cache, absoluteFilePath);
});

streznik.listen(3000, function() {
  console.log("Server listening on port " +  3000 + ".");
});

var fbStreznik = require('./lib/fbapi_streznik.js');
fbStreznik.listen(streznik);
