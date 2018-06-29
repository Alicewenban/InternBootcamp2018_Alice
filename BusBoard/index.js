var processedApi= require('./processAPI');
const readline = require('readline-sync');

console.log("What stop code are you looking for? (no spaces)");
const response = readline.prompt();

processedApi.GetFiveClosesBusesByPostcode(response);