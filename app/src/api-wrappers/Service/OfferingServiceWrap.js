"use strict";
var OfferingService_1 = require('@packages/api/lib/proxy/Service/OfferingService');
/* -------------------------------------------------------------------------- */
/*                              offering section                              */
/* -------------------------------------------------------------------------- */
function createOfferingWrap(Params) {
    return OfferingService_1.default[OfferingService_1.config.Actions.createOffering](Params);
}
exports.createOfferingWrap = createOfferingWrap;
function updateOfferingWrap(Params) {
    return OfferingService_1.default[OfferingService_1.config.Actions.updateOffering](Params);
}
exports.updateOfferingWrap = updateOfferingWrap;
function searchOfferingWrap(OfferingCode) {
    return OfferingService_1.default[OfferingService_1.config.Actions.searchOffering]({ OfferingCode: OfferingCode });
}
exports.searchOfferingWrap = searchOfferingWrap;
function addOrRemoveOfferingToCatalogWrap(OfferingID, CatalogIDs) {
    return OfferingService_1.default[OfferingService_1.config.Actions.addOrRemoveOfferingToCatalog]({
        OfferingID: OfferingID,
        CatalogIDs: CatalogIDs
    });
}
exports.addOrRemoveOfferingToCatalogWrap = addOrRemoveOfferingToCatalogWrap;
/* -------------------------------------------------------------------------- */
/*                         offering financial section                         */
/* -------------------------------------------------------------------------- */
function createOfferingFinancialWrap(Params) {
    return OfferingService_1.default[OfferingService_1.config.Actions.createOfferingFinancial](Params);
}
exports.createOfferingFinancialWrap = createOfferingFinancialWrap;
function updateOfferingFinancialWrap(Params) {
    return OfferingService_1.default[OfferingService_1.config.Actions.updateOfferingFinancial](Params);
}
exports.updateOfferingFinancialWrap = updateOfferingFinancialWrap;
function searchOfferingFinancialWrap(OfferingID) {
    return OfferingService_1.default[OfferingService_1.config.Actions.searchOfferingFinancial]({ OfferingID: OfferingID });
}
exports.searchOfferingFinancialWrap = searchOfferingFinancialWrap;
