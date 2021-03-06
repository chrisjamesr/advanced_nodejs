process.env.UV_THREADPOOL_SIZE = 1   
const cluster = require('cluster');
// is the file being executed in master mode?
if (cluster.isMaster) {
    cluster.fork();
    cluster.fork();
} else {
    const express = require('express');
    const app = express();
    const crypto = require('crypto')
    
    app.get('/', (req, res) => {
        crypto.pbkdf2('a', 'b', 10000, 512, 'sha512', () => {
            res.send('Hi there');
        });
    });

    app.get('/fast', (req, res) => {
        res.send('This was fast');
    })

    app.listen(3000, () => console.log('Listening on port: 3000'))
}