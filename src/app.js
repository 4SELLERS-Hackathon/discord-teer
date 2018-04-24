const TfsHook = require('./TfsHook');
const hook = new TfsHook({ port: 1234, url: '/tfs' });

const build = require('./listeners/build');
const workitem = require('./listeners/workitem');
const comment = require('./listeners/comment');

hook.on('build.complete', build);
hook.on('workitem.created', workitem);
hook.on('workitem.commented', comment);

hook.listen();