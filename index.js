const puppeteer = require('puppeteer');

(async () => {
    let movieUrl = 'http://103.194.171.75/';

    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto(movieUrl,{waitUntil:'networkidle2'});

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
    console.log(data);
    await browser.close();
})()