const data = require('./data.router');
const account = require('./account.router');
function routes(app) {
    app.use('/api', data);
    app.use('/api', account);
}

module.exports = routes;