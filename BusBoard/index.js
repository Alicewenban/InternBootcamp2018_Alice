var processedApi= require('./processAPI');
const readline = require('readline-sync');
const express = require('express');

const app = express();

app.get('/departureBoards/:code', (req, res) => {
    console.log(req.params.code);
    processedApi.GetFiveClosesBusesByPostcode(req.params.code).then(function(val){
        res.send(val);
    }).catch();
});

app.listen(3000, () => console.log('Example app listening on port 3000!'));