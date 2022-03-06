const env = process.env.NODE_ENV;

switch(env) {
    case 'prod':
    case 'production': {
        module.exports = require('./production');
    }

    default: {
        module.exports = require('./default');
    }

}