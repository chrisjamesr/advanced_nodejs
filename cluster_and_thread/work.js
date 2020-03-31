const {Worker, parentPort} = require('worker_threads');

console.log('worker function ')
parentPort.on('message', function (message){
    let counter = 0;
    while (counter < 1e9){
        counter++;
    }
    parentPort.postMessage({counter})
});

