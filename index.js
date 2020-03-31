const express = require('express');
const app = express();
const crypto = require('crypto') 
const { Worker } = require('worker_threads');

app.get('/', (req, res) => {
    // const worker = new Worker(`()=> {  
    //     const { parentPort } = require('worker_threads');
    //     parentPort.on('message', function (message){
    //         console.log(message);
    //         let counter = 0;
    //         console.log('counting');
    //         while(counter < 1e9 ){ counter ++; };
    //     });
    //     parentPort.postMessage(counter)
    // }`, {eval: true});

    const worker = new Worker(`
        console.log('worker function ')
        const { parentPort } = require('worker_threads');
        parentPort.on('message', function (message){
            let counter = 0;
            while (counter < 1e9){
                counter++;
            }
            parentPort.postMessage({counter})
        });
        //parentPort.postMessage('response from worker');`
        , {eval:true})

    worker.postMessage('start counting!')

    worker.on('message', message => res.send(message));

});

app.get('/fast', (req, res) => {
    res.send('This was fast');
})

app.listen(3000, () => console.log('Listening on port: 3000'))
