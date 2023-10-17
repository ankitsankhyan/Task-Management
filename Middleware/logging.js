const date = require('date-and-time');
module.exports.logging = (req, res, next) => {
    console.log( 'request is ---->',req.method, req.url, date.format(new Date(), 'DD/MM/YYYY HH:mm:ss'));
    next();
}