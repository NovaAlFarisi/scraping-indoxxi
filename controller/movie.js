const puppeteer = require('puppeteer');
const config = require('../config.json');
const url = config.provider.url;
exports.getMovie = async (query, callback) => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    if(!query){
        await page.goto(url,{waitUntil:'networkidle2'});
    }
    
    await page.goto(url+`/s/${query}`,{waitUntil:'networkidle2'});

    let data = await page.evaluate(()=>{
        let x = document.querySelectorAll('div[class=ml-item] > a');
        let y = document.querySelectorAll('img.lazy.thumb.mli-thumb');
        let movieData = [];
        for (let i = 0; i < x.length; i++) {
            movieData.push({
                'movieUrl':x[i].href,
                'movieTitle':x[i].title,
                'movieImage':y[i].src
            });
        }
        return {
            movieData
        }
    });
    await browser.close();
    callback(data);
}

exports.getPlayUrl = async (movieUrl, callback) => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto(movieUrl,{waitUntil:'networkidle2'});
    await page.waitForSelector('.jw-video.jw-reset');
    let data = await page.evaluate(()=>{
        let url = document.querySelector('.jw-video.jw-reset').src;
        return {
            url
        }
    });
    await browser.close();

    callback(data);
}

// exports.search = async (query, callback) => {
//     const browser = await puppeteer.launch();
//     const page = await browser.newPage();
//     await page.goto(url+`/s/${query}`, {waitUntil:'networkidle2'});
//     let data = await page.evaluate('')

// }