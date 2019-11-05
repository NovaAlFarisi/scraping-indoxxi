const express = require('express');
const router = express.Router();
const {getMovie,getPlayUrl, search} = require('../controller/movie');


router.get('/', async (req,res)=>{
    let data = [];
    await getMovie(null, (result)=>{
        data.push(result.movieData);
    })
    console.log(data);
    res.render('main', {'data':data[0], 'pageTitle':'New Update!'});
});

router.get('/play', async (req,res)=>{
    let data = [];
    await getPlayUrl(req.query.url, (result)=>{
        data.push(result);
    })
    console.log(data[0].url);
    res.redirect(data[0].url);
});

router.get('/search', async (req,res)=>{
    let data = [];
    await search({'search':req.query.movieName}, (result)=>{
        data.push(result.movieData);
    })
    res.render('main', {'data':data[0], 'pageTitle':`Searching ${req.query.movieName}...`});
});
router.get('/genre', async (req,res)=>{
    let data = [];
    await search({'genre':req.query.name}, (result)=>{
        data.push(result.movieData);
    })
    res.render('main', {'data':data[0], 'pageTitle':`Genre: ${req.query.name}`});
});

router.get('/now-playing', async(req,res)=>{
    let data = []
    await getMovie('21cineplex-now-playing', (result)=>{
        data.push(result.movieData);
    });
    res.render('main',{'data':data[0], 'pageTitle':'Sedang Tayang Di Bioskop!'});
});

router.get('/featured', async(req,res)=>{
    let data = []
    await getMovie('21cineplex-unggulan', (result)=>{
        data.push(result.movieData);
    });
    res.render('main',{'data':data[0], 'pageTitle':'Unggulan'});
});
router.get('/test', async(req,res)=>{
    let data = []
    await getMovie('s/joker', (result)=>{
        data.push(result.movieData);
    });
    res.render('main',{'data':data[0]});
});
module.exports = router;