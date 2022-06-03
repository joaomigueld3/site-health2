const puppeteer = require('puppeteer');
const Prof = require('../models/Prof');

/*var TeaGlobal;
var prof_url;*/
module.exports = async function scrapers(url){
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

    const [el1]=await page.$x('/html/body/form/input[2]');
    const value = await el1.getProperty('value');
    const srcTxt = await value.jsonValue();

    /*document.activeElement.innerHTML = TeaMaracuja;*/
    /*TeaGlobal = TeaMaracuja;*/
    console.log({srcTxt});

    browser.close();
    return srcTxt;
    //return TeaMaracuja;
}

/*scrapers('http://lattes.cnpq.br/3548111003372813'); /*joao miguel*/
/*scrapers('http://lattes.cnpq.br/4908629814578201'); /*sergio campello*/

/*
function teaGlo(){
    console.log({TeaGlobal});
    }
    teaGlo();

 function scrape(){
 scrapeProduct('http://lattes.cnpq.br/3548111003372813');
}
scrape();
*/
