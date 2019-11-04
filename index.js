const express = require('express');
const app = express();

const PORT = 3000;

//CONFIG indoxxi
const URL = 'http://103.194.171.75';
//ejs
app.set('view engine', 'ejs');

//body parser
app.use(express.urlencoded({extended:true}));
app.use(express.json());

//router
app.use('/', require('./router/mainRoute'));

app.listen(PORT,(err)=>{
    if(err){
        console.log(err);
    }
    console.log(`server started at port ${PORT}`);
})

// (async () => {

//     await getMovie(URL, (data)=>{
//         console.log(data);
//     })

// })()

