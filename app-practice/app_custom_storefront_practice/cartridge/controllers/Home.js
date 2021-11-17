'use strict';

/**
 * @namespace Home
 */

var server = require('server');
var cache = require('*/cartridge/scripts/middleware/cache');
var consentTracking = require('*/cartridge/scripts/middleware/consentTracking');
var pageMetaData = require('*/cartridge/scripts/middleware/pageMetaData');

/**
 * Any customization on this endpoint, also requires update for Default-Start endpoint
 */
/**
 * Home-Show : This endpoint is called when a shopper navigates to the home page
 * @name Base/Home-Show
 * @function
 * @memberof Home
 * @param {middleware} - consentTracking.consent
 * @param {middleware} - cache.applyDefaultCache
 * @param {category} - non-sensitive
 * @param {renders} - isml
 * @param {serverfunction} - get
 */
server.get('Show', consentTracking.consent, cache.applyDefaultCache, function (req, res, next) {
    var Site = require('dw/system/Site');
    var pageMetaHelper = require('*/cartridge/scripts/helpers/pageMetaHelper');

    pageMetaHelper.setPageMetaTags(req.pageMetaData, Site.current);
    res.render('/home/homePage');
    next();
}, pageMetaData.computedPageMetaData);

server.get('ErrorNotFound', function (req, res, next) {
    res.setStatusCode(404);
    res.render('error/notFound');
    next();
});

server.append('Show', consentTracking.consent, function (req, res, next) {
    var customForm = server.forms.getForm('profile');
    customForm.clear();
    res.render('home/homePage', {
        form: customForm
   })
    next();
});

server.post('customSubmit', consentTracking.consent, function (req, res, next) {
    var customForm = server.forms.getForm('profile');
    res.render('home/demo', {
        form: customForm
   })
    next();
});

server.get('gotonext', consentTracking.consent, function (req, res, next) {
    
    res.render('home/demo', {
        
   })
    next();
});


module.exports = server.exports();
