const express = require('express');
const router = express.Router();
const {getMovie} = require('../controller/getMovie');
const {getPlayUrl} = require('../controller/play');


router.get('/', async (req,res)=>{
    let data = [];
    await getMovie((result)=>{
        data.push(result.movieData);
    })
    res.render('main', {'data':data[0]});
});

router.get('/play', async (req,res)=>{
    let data = [];
    await getPlayUrl(req.query.url, (result)=>{
        data.push(result);
    })
    console.log(data[0].url);
    res.redirect(data[0].url);
});

module.exports = router;