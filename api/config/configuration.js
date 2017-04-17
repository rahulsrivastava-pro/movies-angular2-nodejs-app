

var loadConfigurations = function (nconf) {
    var environment = nconf.get('NODE_ENV') || 'development';

    nconf
    .argv()
    .env()
    .defaults(require('./environments/' + environment.toLowerCase() + '.json'))
    .use('memory')
    ;
}

module.exports = {
    loadConfigurations: loadConfigurations
};