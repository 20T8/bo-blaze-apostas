const clientSeed = "0000000000000000002aeb06364afc13b3c4d52767e8c91db8cdb39d8f71e8dd";
var seed = "9a43698f112c6bf441fb6d649925e5b7d9709cc765bf7db93abb84be30b60904";
qtdefor = 3000000;
var crypto = require('crypto');

var contador1 = 0;
var contador2 = 0;
var contador3 = 0;
var contador4 = 0;
var contador5 = 0;
var contador6 = 0;
var contador7 = 0;
const margem = 3;

for (i = 0; i < qtdefor; i++) {

  var hmac = crypto.createHmac('sha256', seed);
  data = hmac.update(clientSeed);
  hash = data.digest('hex');
  const double = parseInt(hash, 16) % 15;

  // console.log(i + " - " + double + " - " + seed + " - " + hash);

  if (double > 7 && contador1 > 0) {
    contador3 = 0;
    contador4++;
  } else if (double < 8 && double != 0 && contador2 > 0) {
    contador3 = 0;
    contador4++;
  } else if (i != 0) {
    contador3++;
    contador5++;

    if (contador3 > contador6) {
      contador6 = contador3;
    }

    if (contador3 == 14) {
      contador7++;
    }

    if (double > 7) {

      contador1 = 0;
      contador2 = 1;

    } else if (double != 0) {

      contador2 = 0;
      contador1 = 1;

    } else {

      contador2 = 0;
      contador1 = 1;

    }
  }
  seed = crypto.createHash('sha256').update(seed).digest('hex');
}
console.log(`Total acertos: ${contador4}. Total erros: ${contador5}. Máximo de erros consecutivos: ${contador6}. Contador 7: ${contador7}`);