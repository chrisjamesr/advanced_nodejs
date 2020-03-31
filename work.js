const {Worker} = require('worker_threads');

console.log('worker function ')
const { parentPort } = require('worker_threads');
parentPort.on('message', function (message){
    console.log("1: message received", message)
});
parentPort.postMessage({msg: '2: response!'});    
