const puppeteer = require('puppeteer');
exports.getPlayUrl = async (url, callback) => {
    let movieUrl = `${url}`;
    await console.log(url);
    const browser = await puppeteer.launch({
        args: ['--netifs-to-ignore=INTERFACE_TO_IGNORE']
    });
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


// exports.getPlay = async (url) =>{

//     
// }
