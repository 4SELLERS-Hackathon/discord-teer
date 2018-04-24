const express = require('express');
const bodyParser = require('body-parser');
const distributors = require('./distributors');
const distributorTransformer = require('./transformers/distributorTransformer');
const emitters = require('./emitters');

const TfsHook = require('./TfsHook');
const app = express();
const hook = new TfsHook({ port: process.env.PORT || 1234, url: process.env.URL || '/tfs' }, app);

const http = require('http').Server(app);
const io = require('socket.io')(http);
const dashboard = io.of('/dashboard');
const dashboardEmitter = emitters(dashboard);
const populateEmitter = dashboardEmitter('share', 'populate')
const updateEmitter = dashboardEmitter('share', 'update');

dashboard.on('connect', async (socket) => {
    socket.join('share');
    populateEmitter({data: await Promise.all(distributors.map(distributorTransformer))});
});

const build = require('./listeners/build');
const workitem = require('./listeners/workitem');
const comment = require('./listeners/comment');

hook.on('build.complete', build);
hook.on('workitem.created', workitem);
hook.on('workitem.commented', comment);

hook.listen();