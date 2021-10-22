const clientSeed = "0000000000000000002aeb06364afc13b3c4d52767e8c91db8cdb39d8f71e8dd";
var seed = "60300edb8756812c12a467925737b0870b45e4de7e8195a579b05687eb30e3a4";
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

for(i = 0; i < qtdefor; i++){
    
    var hmac = crypto.createHmac('sha256', seed);
    data = hmac.update(clientSeed);
    hash = data.digest('hex');
    const double = parseInt(hash, 16) % 15;

    // console.log(i + " - " + double + " - " + seed + " - " + hash);

    if(double > 7 && contador1 > 0){
        contador3 = 0;
        contador4++;
      }else if(double < 8 && double != 0 && contador2 > 0){
        contador3 = 0;
        contador4++;
      }else if(i != 0){
        contador3++;
        contador5++;

    if(contador3 > contador6){
        contador6 = contador3;
        }

    if(contador3 == 14){
      contador7++;
    }  

    if(double > 7){
        if(contador3 > margem && contador3 < 8 && (i % 5) == 0 && double != 0){
          contador1 = 0;
          contador2 = 1;
        }else{
          contador1 = 1;
          contador2 = 0;
        }
      }else if(double != 0){
        if(contador3 > margem && contador3 < 8 && (i % 5) == 0 && double != 0){
          contador2 = 0;
          contador1 = 1;
        }else{
          contador2 = 1;
          contador1 = 0;
        }
      }else if(double == 0 && contador1 > 0){
        if(contador3 > margem && contador3 < 8 && (i % 5) == 0 && double != 0){
          contador2 = 2;
        }else{
          contador1 = 2;
        }
      }else if(double == 0 && contador2 > 0){
        if(contador3 > margem && contador3 < 8 && (i % 5) == 0 && double != 0){
          contador1 = 2;
        }else{
          contador2 = 2;
        }
      }else{
        if(contador3 > margem && contador3 < 8 && (i % 5) == 0 && double != 0){
          contador2 = 0;
          contador1 = 1;
        }else{
          contador2 = 1;
          contador1 = 0;
        }
      }
    }
    seed = crypto.createHash('sha256').update(seed).digest('hex');
}
console.log(`Total acertos: ${contador4}. Total erros: ${contador5}. Máximo de erros consecutivos: ${contador6}. Contador 7: ${contador7}`);