
var bunyan = require('bunyan');
 
var log = bunyan.createLogger({
     name: 'sof-crawler',                     // Required
     level: 'info',      // Optional, see "Levels" section
     // stream: process.stdout,           // Optional, see "Streams" section
     src: ['production', 'prod'].includes(process.env.NODE_ENV) ? false : true,
     streams: [
         {
             level: (process.env.NODE_ENV === 'production') ? 'debug' : 'debug',
             stream: process.stdout,
         },
     ],
     serializers: {
         req: bunyan.stdSerializers.req,
         err: bunyan.stdSerializers.err,
     }
 });
 
 module.exports = log;
 