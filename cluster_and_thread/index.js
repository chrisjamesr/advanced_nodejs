const express = require('express');
const app = express();
const crypto = require('crypto') 
const { Worker } = require('worker_threads');
let count = 1
app.get('/', (req, res) => {
// create new worker to execude code in worker.js file
    const worker = new Worker('./work.js');
// designates main thread response to incoming message from worker
    worker.on('message', message => {
        console.log('message received');
// send worker message as server response
        res.send(`<h1>Counter: ${message.counter+count}</h1>`);
    });
// post message to worker    
    worker.postMessage('start counting!');
    count++;
});

app.get('/fast', (req, res) => {
    res.send('This was fast');
})

app.listen(3000, () => console.log('Listening on port: 3000'))
