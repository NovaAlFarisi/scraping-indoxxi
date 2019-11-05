const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
const config = require('../config.json');
const url = config.provider.url;
exports.getMovie = async (query = null,callback) => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    if(query){
        await page.goto(`${url}/${query}`,{waitUntil:'networkidle2'});
    } else{
        await page.goto(url,{waitUntil:'networkidle2'});
    }
    let content = await page.content();
    var $ = cheerio.load(content);
    let data = await page.evaluate(()=>{
        let movUrl = $('div[class=ml-item] > a'); //document.querySelectorAll('div[class=ml-item] > a');
        let movThumb = $('img.lazy.thumb.mli-thumb'); //document.querySelectorAll('img.lazy.thumb.mli-thumb');
        let movQuality = $('span.mli-quality');//document.querySelectorAll('span.mli-quality');
        let movRating = $('.mli-rating');//document.querySelectorAll('.mli-rating');
        let movieData = [];
        for (let i = 0; i < movUrl.length; i++) {
            movieData.push({
                'movieUrl':movUrl[i].href.replace('idxx1.cam','encrypted.text'),
                'movieTitle':movUrl[i].title,
                'movieQuality':movQuality[i].innerText,
                'movieRating':movRating[i].innerText,
                'movieImage':movThumb[i].src
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
    let puppeteerArgs = [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--enable-features=NetworkService'
    ];
    let browser = await puppeteer.launch({
        headless: true,
        args: puppeteerArgs
    });
    const page = await browser.newPage();
    const safeLink = await movieUrl.replace('encrypted.text', 'idxx1.cam');
    await page.goto(safeLink,{waitUntil:'networkidle2'});
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

exports.search = async (query, callback) => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    if(query.search){
        var searchLink = `${url}/s/${query.search}`;
    } else {
        var searchLink = `${url}/genre/${query.genre}`;
    }
    await page.goto(searchLink,{waitUntil:'networkidle2'});
    let content = await page.content();
    var $ = cheerio.load(content);

    let data = await page.evaluate(()=>{
        let movUrl = $('div[class=ml-item] > a'); //document.querySelectorAll('div[class=ml-item] > a');
        let movThumb = $('img.lazy.thumb.mli-thumb'); //document.querySelectorAll('img.lazy.thumb.mli-thumb');
        let movieData = [];
        for (let i = 0; i < movUrl.length; i++) {
            movieData.push({
                'movieUrl':movUrl[i].href.replace('idxx1.cam','encrypted.text'),
                'movieTitle':movUrl[i].title,
                'movieImage':movThumb[i].src
            });
        }
        return {
            movieData
        }
    });
    await browser.close();
    callback(data);
}