const express = require('express');
const bodyParser = require('body-parser');
const distributors = require('./distributors');
const distributorTransformer = require('./transformers/distributorTransformer');

const TfsHook = require('./TfsHook');
const app = express();
const hook = new TfsHook({ port: 1234, url: '/tfs' }, app);

const http = require('http').Server(app);
const io = require('socket.io')(http);
const dashboard = io.of('/dashboard');

dashboard.emit('refresh', {})

io.on('connection', function(socket){
    console.log("connected");
});

dashboard.on('connect', async (socket) => {
    socket.join('share');
    dashboard.to('share').emit('populate', {data: await Promise.all(distributors.map(distributorTransformer))});
});

const build = require('./listeners/build');
const workitem = require('./listeners/workitem');
const comment = require('./listeners/comment');

hook.on('build.complete', build);
hook.on('workitem.created', workitem);
hook.on('workitem.commented', comment);

hook.listen();