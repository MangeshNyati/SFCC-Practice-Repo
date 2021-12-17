'use strict'; 

/**
 * @namespace Home
 */
 const server = require('server');
 server.extend(module.superModule);
var csrfProtection = require('*/cartridge/scripts/middleware/csrf');
var URLUtils = require('dw/web/URLUtils');


/* @name Base/Home-Show
 * @function
 * @memberof Home
 * @param {middleware} - consentTracking.consent
 * @param {middleware} - cache.applyDefaultCache
 * @param {category} - non-sensitive
 * @param {renders} - isml
 * @param {serverfunction} - get
 */
 const cache = require('*/cartridge/scripts/middleware/cache');
 const consentTracking = require('*/cartridge/scripts/middleware/consentTracking');

server.replace('Show', consentTracking.consent, cache.applyDefaultCache, csrfProtection.generateToken, function (req, res, next) {
    const Logger = require('dw/system/Logger');
    const PageMgr = require('dw/experience/PageMgr');
    const pageMetaData = require('*/cartridge/scripts/middleware/pageMetaData');
    const TridentCustomPreferenceUtil = require('*/cartridge/scripts/util/TridentCustomPreferenceUtil.js');
    const homePagePDId = TridentCustomPreferenceUtil.getCustomPreferenceValue('pd');
   
    if(homePagePDId && homePagePDId != null){
        try {
            const page = PageMgr.getPage(homePagePDId);
            if (page != null && page.isVisible()) {
                if (!page.hasVisibilityRules()) {
                    res.cachePeriod = 168; // eslint-disable-line no-param-reassign
                    res.cachePeriodUnit = 'hours'; // eslint-disable-line no-param-reassign
                }
                res.page(page.ID, {});
            }
            next(); 
        }catch(e){
            Logger.error('Error Occurred in Route Show : {0}: line :{1} Error: {2}', e.fileName, e.lineNumber, e.message); 
        }
    }else {
        const Site = require('dw/system/Site');
        const pageMetaHelper = require('*/cartridge/scripts/helpers/pageMetaHelper');
        pageMetaHelper.setPageMetaTags(req.pageMetaData, Site.current);
        res.render('/home/homePage'); 
        next();
        pageMetaData.computedPageMetaData;
    }
    
});
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
    res.render('home/demoPage', {
        form: customForm
   })
    next();
});
module.exports = server.exports();


