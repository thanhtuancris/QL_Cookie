const data = require('./data.router');
const account = require('./account.router');
const note = require('./note.router');
function routes(app) {
    app.use('/api', data);
    app.use('/api', account);
    app.use('/api', note);
}

module.exports = routes;