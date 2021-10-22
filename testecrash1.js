const clientSeed = "0000000000000000000415ebb64b0d51ccee0bb55826e43846e5bea777d91966";
var seed = "7c35c9a1e0e7cd102bb9725c58ad8bc6be45c4447fd93fa372efa2c3e253b17c";
qtdefor = 5000000;
var crypto = require('crypto');

var contador1 = 0;
var contador2 = 0;
var contador3 = 0;
var contador4 = 0;
var dinheiro = 100;
var aposta = 100;
const margem = 1;

for (i = 0; i < qtdefor; i++) {

    var hmac = crypto.createHmac('sha256', seed);
    data = hmac.update(clientSeed);
    hash = data.digest('hex');

    const divisible = (hash, mod) => {
        let val = 0;

        let o = hash.length % 4;
        for (let i = o > 0 ? o - 4 : 0; i < hash.length; i += 4) {
            val =
                ((val << 16) + parseInt(hash.substring(i, i + 4), 16)) %
                mod;
        }

        return val === 0;
    };

    function getPoint(hash) {

        if (divisible(hash, 15)) return 0;

        let h = parseInt(hash.slice(0, 52 / 4), 16);
        let e = Math.pow(2, 52);

        var point = (
            Math.floor((100 * e - h) / (e - h)) / 100
        ).toFixed(2);

        return point;
    }

    var point = getPoint(hash);

    if (point == 1.00) {
        point = 0;
    }

    console.log(dinheiro + " - " + point + " - " + seed + " - " + hash);

    if (contador1 == margem && point > 1.10) {
        dinheiro = dinheiro + 10;
        contador1 = 0;
    } else if (contador1 == margem && point < 1.11) {
        dinheiro = dinheiro - aposta;
    }

    if (point > 2.00) {
        contador1++;
        if (point == 0) {
            contador4++;
        }
    } else {
        contador1 = 0;
        contador4 = 0;
    }
    if (contador1 == 5) {
        contador3++;
    }
    if (contador1 > contador2) {
        contador2 = contador1;
    }
    if (dinheiro < 100) {
        break;
    }
    seed = crypto.createHash('sha256').update(seed).digest('hex');
}
console.log(`Dinheiro final: ${dinheiro}. Rodou ${i} vezes.`);