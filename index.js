const cluster = require('cluster');
// is the file being executed in master mode?
if (cluster.isMaster) {
    cluster.fork();
} else {
    const express = require('express');
    const app = express();

    // duration in ms
    function doWork(duration) {
        const start = Date.now();
        while(Date.now() - start < duration) {};
    };

    app.get('/', (req, res)=>{
        doWork(5000);
        res.send('hello');
    });

    app.listen(3000, () => console.log('Listening on port: 3000'))
}