'use strict';

var Logger = require('dw/system/Logger');
var Site = require('dw/system/Site');

var CustomSitePrefs = Site.getCurrent().getPreferences().getCustom();
var CUST_PREFS_ERROR_NOTFOUND_PREFIX = 'Could not find Site Custom Preference named: ';

/**
* This is the correct method to use MOST times to get custom preferences, by correctly setting up the default in the custom pref itself
* @param {string} customPreferenceName - The name of the custom preference (key name).
* @returns {*} - The value of the custom preference OR throws an error if the custom pref is not set via Business Manager
*/
function getCustomPreferenceValue(customPreferenceName) {
    if(customPreferenceName in CustomSitePrefs && !empty(CustomSitePrefs[customPreferenceName])) {
        return CustomSitePrefs[customPreferenceName];
    }
    else{
    	return null;
    }
}

/**
* This method should be used sparingly and ONLY for BOOLEAN on/off checks.
* @param {string} customPreferenceName - The name of the custom preference (key name).
* @returns {*} - Always returns a BOOLEAN VALUE and never throws an error
*/
function isCustomPreferenceEnabled(customPreferenceName) {
    if(customPreferenceName in CustomSitePrefs) {
        var customPreferenceValue = CustomSitePrefs[customPreferenceName];
        if(customPreferenceValue && (customPreferenceValue !== 'false' || customPreferenceValue !== '0')) {
            return true;
        }
    }
    return false;
}
module.exports = {
    getCustomPreferenceValue: getCustomPreferenceValue,
    isCustomPreferenceEnabled: isCustomPreferenceEnabled
};

