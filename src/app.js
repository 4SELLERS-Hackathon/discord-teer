const TfsHook = require('./TfsHook');

const port = process.env.PORT || 1337;
const url = process.env.URL || '/tfs';

const hook = new TfsHook({ port, url });

const build = require('./listeners/build');
const workitem = require('./listeners/workitem');
const comment = require('./listeners/comment');

hook.on('build.complete', build);
hook.on('workitem.created', workitem);
hook.on('workitem.commented', comment);

hook.listen();