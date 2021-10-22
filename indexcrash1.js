require('dotenv').config();
require('dotenv-safe').config();
const { Telegraf } = require('telegraf')

const bot = new Telegraf(process.env.BOT_TOKEN_CRASH)

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
    var verificador2 = 0;
    margem = 4;
    const autoretirar = "2.00";
    const valoraposta = "0.20";
    var valorapostaint = parseFloat(valoraposta);

    await page.goto('https://blaze.com/pt?modal=auth&tab=login');
    await page.type('[name="username"]', "joao.vms22@hotmail.com");
    await page.type('[name="password"]', "Joao@0302");
    await page.evaluate(() => { document.querySelector('.red.submit.undefined').click() });
    await page.waitForNavigation();
    await page.goto('https://blaze.com/pt/games/crash');
    await sleep(1000);

    for (i = 0; i < 10000; i++) {
        console.log(`Jogo: ${i}`)

        var verificador = await page.evaluate(() => { return document.querySelector("div.entries").childElementCount });

        if (i == 0) {
            verificador2 = verificador;
        }

        for (y = 2; y > 0; y++) {
            var verificador = await page.evaluate(() => { return document.querySelector("div.entries").childElementCount });
            if (verificador != verificador2) {
                verificador2 = verificador;
                break;
            }
            await sleep(0001);
        }

        var ultimocrash = await page.evaluate(() => { return document.querySelector("div.entries").firstElementChild.innerText });
        ultimocrash = ultimocrash.substring(0, ultimocrash.length - 1);
        const pontocrash = ultimocrash .indexOf(".");
        const strcrash1 = ultimocrash.substring(pontocrash, 0);
        const strcrash2 = ultimocrash.substring(pontocrash + 1);
        ultimocrash = parseFloat(ultimocrash).toFixed(2);
        console.log(ultimocrash);

        if (ultimocrash < 2.00) {
            var figuraresultado = `⚫️⚫️ *${strcrash1}\\.${strcrash2}* ⚫️⚫️`;
        } else {
            var figuraresultado = `🟢🟢 *${strcrash1}\\.${strcrash2}* 🟢🟢`;
        }

        if (contador1 > margem && ultimocrash > 2.00) {
            contador4++;
            console.log("Acertou");
            valorapostaint = 0.20;
            contador1 = 0;
            contador3 = 0;
            var resultado = "*Acertou*";
        } else if (contador1 > margem && ultimocrash < 2.01) {
            contador5++;
            contador3++;
            valorapostaint = valorapostaint * 2;
            var resultado = `*Errou* ❌ \\(${contador3}ª vez\\)`;
            console.log("Errou");
        } else {
            var resultado = "*Ainda não jogou*";
        }

        await sleep(1000);

        await page.type('[type="number"]', valorapostaint.toString());

        await sleep(1000);

        for (u = 0; u < 3; u++) {
            await page.keyboard.press("Tab");
        }

        await sleep(1000);

        await page.keyboard.type(`${autoretirar}`);

        if (ultimocrash < 2.00) {
            contador1++;
        } else {
            contador1 = 0;
        }
        if (contador1 > contador2) {
            contador2 = contador1;
        } if (contador1 > margem) {
            await page.evaluate(() => { return document.querySelector('div.place-bet > button.red.undefined').click() });
        }

        await sleep(1000);

        for (u = 0; u < 10; u++) {
            await page.keyboard.press("Backspace");
        }
        console.log(`Total acertos: ${contador4}. Total erros: ${contador5}. Máximo de pretos consecutivos: ${contador2}`);

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

        bot.telegram.sendMessage(process.env.CHAT_ID_CRASH,
            `🎲 *JOGO* *${i}* 🎲 💰 ${realsaldo}\\.${centavosaldo} 💰
      
            ${figuraresultado}
            ${resultado}
            ✅ Total acertos: *${contador4}*
            ❌ Total erros: *${contador5}*
            Máximo de pretos consecutivos: *${contador2}*
            ⏳ Tempo decorrido\\: *${hours}*\\:*${minutes}\\:${seconds}*⏳`, { parse_mode: 'MarkdownV2' });

        console.log('-----------------');
    }
})();