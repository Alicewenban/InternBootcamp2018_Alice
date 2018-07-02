var processedApi= require('./processAPI');
const express = require('express');

const app = express();

app.get('/departureBoards/:code', (req, res) => {
    console.log(req.params.code);
    processedApi.GetFiveClosesBusesByPostcode(req.params.code).then(function(val){
        res.send(val);
    }).catch();
});

app.get('/bikeBoard/:code', (req, res) => {
    console.log(req.params.code);
    processedApi.getFiveClosesBikePoints(req.params.code).then(function(val){
        res.send(val);
    }).catch();
});

app.listen(3000, () => console.log('running'));
app.use(express.static('frontend'));