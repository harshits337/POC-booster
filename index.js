const express = require('express');
const app = express();
const PORT = 3000;
var axios = require('axios');
const getAllUsers = require('./service');
const res = require('express/lib/response');

app.set('view engine','ejs');

app.get('/', async (req, res) => {

    let tag = req.query.hashtag;
    let userList = getAllUsers(tag);
    if(!tag){
        return res.render('pages/index',{
            userList: []
        })
    }
    const response = await userList.then(result => result);
    res.render('pages/index',{
        userList : response
    })
})
app.listen(PORT,()=>{
    console.log(`Server is running port : ${PORT}`);
})


