const clientSeed = "0000000000000000000415ebb64b0d51ccee0bb55826e43846e5bea777d91966";
var seed = "4a68278b2e29f197a7488b681eba8b51b7cc895392eb21b0d35a4c6c02ad7a6a";
qtdefor = 50000;
var crypto = require('crypto');

var contador1 = 0;
var contador2 = 0;
var contador3 = 0;
var contador4 = 0;
var dinheiro = 100;
var aposta = 0.20;
const margem = 4;

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

    //console.log(dinheiro + " - " + point + " - " + seed + " - " + hash);

    if (contador1 > margem && point > 2.00) {
        dinheiro = dinheiro + aposta;
        aposta = 0.20;
        contador1 = 0;
    } else if (contador1 > margem && point < 2.01) {
        dinheiro = dinheiro - aposta;
        aposta = aposta * 2;
    }
    
    if (point < 2.00) {
        contador1++;
        if (point == 0) {
            contador4++;
        }
    } else {
        contador1 = 0;
        contador4 = 0;
    }
    if (contador1 == 11) {
        contador3++;
    }
    if (contador1 > contador2) {
        contador2 = contador1;
    }
    if (dinheiro < 0){
        break;
    }
    seed = crypto.createHash('sha256').update(seed).digest('hex');
}
console.log(`Máximo de vezes seguidas menor que 2.00: ${contador2}.
Quantidade de vezes que foi até o solicitado: ${contador3}.
Rodou ${i} vezes.
Dinheiro: ${dinheiro}`);