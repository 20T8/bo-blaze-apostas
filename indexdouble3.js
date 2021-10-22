require('dotenv').config();
require('dotenv-safe').config();
const { Telegraf } = require('telegraf')

const bot = new Telegraf(process.env.BOT_TOKEN)

const puppeteer = require('puppeteer');
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

var startTime, endTime;

function start() {
  startTime = new Date();
};

function end() {
  endTime = new Date();
  var timeDiff = endTime - startTime;
  timeDiff /= 1000;
  var seconds = Math.round(timeDiff);
  console.log("Se passaram " + seconds + " segundos");
}
start();

(async () => {

  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  var contador1 = 0;
  var contador2 = 0;
  var contador3 = 0;
  var contador4 = 0;
  var contador5 = 0;
  var contador6 = 0;
  var contred = 0;
  var contador9 = 0;
  var contblack = 0;
  var contwhite = 0;

  const valoraposta = "0.02";
  var valorapostaint = parseFloat(valoraposta);

  await page.goto('https://blaze.com/pt?modal=auth&tab=login');
  await page.type('[name="username"]', "joao.vms22@hotmail.com");
  await page.type('[name="password"]', "Joao@0302");
  await page.evaluate(() => { document.querySelector('.red.submit.undefined').click() });
  await page.waitForNavigation();
  await page.goto('https://blaze.com/pt/games/double');
  await sleep(1000);

  for (i = 0; i < 10000; i++) {
    console.log(`Jogo: ${i}`)
    for (y = 0; y < 30000; y++) {
      const timer = await page.evaluate(() => { return document.querySelector('div.time-left > span').innerText });
      let inttimer = parseInt(timer);

      if (inttimer == 10) {
        // console.log(inttimer);
        break;
      }
      await sleep(0001);
    }
    var ultimodouble = await page.evaluate(() => {
      return document.querySelector('div.sm-box').innerText;
    });

    if (ultimodouble == "") {
      ultimodouble = 0;
    }

    if (ultimodouble < 8) {
      if (ultimodouble == 0) {
        var figuraresultado = "⚪️⚪️⚪️⚪️⚪️⚪️⚪️⚪️⚪️⚪️";
        contwhite++;
      } else {
        var figuraresultado = "🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴";
        contred++;
      }
    } else if (ultimodouble > 7) {
      var figuraresultado = "⚫️⚫️⚫️⚫️⚫️⚫️⚫️⚫️⚫️⚫️";
      contblack++;
    }

    console.log(ultimodouble);

    if (ultimodouble > 7 && contador1 > 0) {
      if (contador3 > 4) {
        var resultado = "*Acertou*";
        console.log('Acertou! Preto.');
        var valorapostaint = parseFloat(valoraposta);
        contador4++;
        contador9++;
      } else {
        var resultado = `Ainda não jogou`;
      }
      contador3 = 0;
    } else if (ultimodouble < 8 && ultimodouble != 0 && contador2 > 0) {
      if (contador3 > 4) {
        var resultado = "*Acertou*";
        console.log('Acertou! Vermelho.');
        var valorapostaint = parseFloat(valoraposta);
        contador4++;
        contador9++;
      } else {
        var resultado = `Ainda não jogou`;
      }
      contador3 = 0;
    } else if (i != 0) {
      contador3++;
      if (contador3 > 4) {
        var resultado = `*Errou* ❌ \\(${contador3}ª vez\\)`;
        console.log(`Errou ${contador3} vezes seguidas`);
        valorapostaint = valorapostaint * 2;
        contador5++;
      } else {
        var resultado = `Ainda não jogou`;
      }
    } else {
      var resultado = `Ainda não jogou`;
    }

    if (contador3 > contador6) {
      contador6 = contador3;
    }

    console.log(`Próxima aposta: ${valorapostaint}`);

    await page.type('[type="number"]', valorapostaint.toString());

    if ((contred - contblack) > 5 && contador3 > 0 && contador8 == 0) {
      await page.evaluate(() => { return document.querySelector('div.red').click() });
      contador2 = 1;
      contador1 = 0;
      contador8 = 1;
    } else if ((contblack - contred) > 5 && contador3 > 0 && contador8 == 0) {
      await page.evaluate(() => { return document.querySelector('div.black').click() });
      contador2 = 0;
      contador1 = 1;
      contador8 = 1;
    } else {
      await page.evaluate(() => { return document.querySelector('div.red').click() });
      contador2 = 1;
      contador1 = 0;
      contador8 = 0;
    }

    await sleep(1000);

    if (contador3 > 4) {
      await page.evaluate(() => { return document.querySelector('div.place-bet > button.red.undefined').click() });
      await sleep(2000);
    }

    for (u = 0; u < 10; u++) {
      await page.keyboard.press("Backspace");
    }
    console.log(`Total acertos: ${contador9}. Total erros: ${contador5}. Máximo de erros consecutivos: ${contador6}`);

    const saldo = await page.evaluate(() => { return document.querySelector('div.currency').innerText });
    const pontosaldo = saldo.indexOf(".");
    const realsaldo = saldo.substring(pontosaldo, 0);
    const centavosaldo = saldo.substring(pontosaldo + 1);

    endTime = new Date();
    var timeDiff = endTime - startTime;
    timeDiff /= 1000;
    var seconds = Math.round(timeDiff);
    var hours = "00";
    var minutes = "00";

    if (seconds > 59) {
      var minutes = parseInt(seconds / 60);
      if (minutes < 10) {
        minutes = `0${minutes}`;
      }
      seconds = seconds % 60;
    }
    if (minutes > 59) {
      var hours = parseInt(minutes / 60);
      if (hours < 10) {
        hours = `0${hours}`;
      }
      minutes = minutes % 60;
      if (minutes < 10) {
        minutes = `0${minutes}`;
      }
    }
    if (seconds < 10) {
      seconds = `0${seconds}`;
    }
    console.log("Tempo decorrido: " + hours + ":" + minutes + ":" + seconds);
    // if(i % 5 == 0){
    bot.telegram.sendMessage(process.env.CHAT_ID,
      `🎲 *JOGO* *${i}* 🎲 💰 ${realsaldo}\\.${centavosaldo} 💰

      ${figuraresultado}
      ${resultado}
      ✅ Total acertos: *${contador9}*
      ❌ Total erros: *${contador5}*
      Máximo de erros consecutivos: *${contador6}*
      ⏳ Tempo decorrido\\: *${hours}*\\:*${minutes}\\:${seconds}*⏳`, { parse_mode: 'MarkdownV2' });
    // }

    console.log('-----------------');
  }
})();