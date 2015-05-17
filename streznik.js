//Konec razvoja naloge 2.8 + konec popravkov 
var http = require('http'); 
var fs = require('fs'); var path = require('path'); var mime = 
require('mime'); var predpomnilnik = {}; function 
posredujNapako404(odgovor) {
  odgovor.writeHead(404, {'Content-Type': 'text/plain'});
  odgovor.write('Napaka 404: Vira ni mogoče najti.');
  odgovor.end();
}
function posredujDatoteko(odgovor, datotekaPot, datotekaVsebina) {
  odgovor.writeHead(200, {"content-type": 
mime.lookup(path.basename(datotekaPot))});
  odgovor.end(datotekaVsebina);
}
function posredujStaticnoVsebino(odgovor, predpomnilnik, 
absolutnaPotDoDatoteke) {
  if (predpomnilnik[absolutnaPotDoDatoteke]) {
    posredujDatoteko(odgovor, absolutnaPotDoDatoteke, 
predpomnilnik[absolutnaPotDoDatoteke]);
  } else {
    fs.exists(absolutnaPotDoDatoteke, function(datotekaObstaja) {
      if (datotekaObstaja) {
        fs.readFile(absolutnaPotDoDatoteke, function(napaka, 
datotekaVsebina) {
          if (napaka) {
            posredujNapako404(odgovor);
          } else {
            predpomnilnik[absolutnaPotDoDatoteke] = datotekaVsebina;
            posredujDatoteko(odgovor, absolutnaPotDoDatoteke, 
datotekaVsebina);
          }
        });
      } else {
        posredujNapako404(odgovor);
      }
    });
  }
}
var streznik = http.createServer(function(zahteva, odgovor) {
  var potDoDatoteke = false;
  if (zahteva.url == '/') {
    potDoDatoteke = 'public/index.html';
  } else {
    potDoDatoteke = 'public' + zahteva.url;
    console.log("hahaha");
  }
  var absolutnaPotDoDatoteke = './' + potDoDatoteke;
  posredujStaticnoVsebino(odgovor, predpomnilnik, 
absolutnaPotDoDatoteke);
});
streznik.listen(3000, function() {
  console.log("Strežnik posluša na portu " + process.env.PORT + ".");
});
var fbStreznik = require('./lib/fbapi_streznik.js'); 
fbStreznik.listen(streznik);
