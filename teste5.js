const clientSeed = "0000000000000000002aeb06364afc13b3c4d52767e8c91db8cdb39d8f71e8dd";
var seed = "13065c91d5528839f75dcdb2bc4a950eeda6372bb78a92c1b9956f17e4ffe570";
qtdefor = 3000000;
var crypto = require('crypto');

var contador1 = 0;
var contador2 = 0;
var contador3 = 0;
var contador4 = 0;
var contador5 = 0;
var contador6 = 0;
var contador7 = 0;
var contred = 0;
var contblack = 0;
var contwhite = 0;

for(i = 0; i < qtdefor; i++){
    
    var hmac = crypto.createHmac('sha256', seed);
    data = hmac.update(clientSeed);
    hash = data.digest('hex');
    const double = parseInt(hash, 16) % 15;

    if(double > 7){
      contblack++;
    }else if(double < 8 && double != 0){
      contred++;
    } else{
      contwhite++;
    }

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
      }
    if(contador3 > contador6){
        contador6 = contador3;
        }

    if(contador3 == 14){
      contador7++;
    } 

    if (contador3 > 5){
      contador2 = 0;
      contador1 = 1;
    } else{
      contador2 = 1;
      contador1 = 0;
    }
    
    seed = crypto.createHash('sha256').update(seed).digest('hex');
}
console.log(`Total acertos: ${contador4}. Total erros: ${contador5}. Máximo de erros consecutivos: ${contador6}. Contador 7: ${contador7}.
Qtde Pretos: ${contblack}
Qtde Vermelhos: ${contred}
Qtde Brancos: ${contwhite}`);