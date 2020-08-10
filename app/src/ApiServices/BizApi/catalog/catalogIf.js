"use strict";
var catalogIf_1 = require("@packages/api/lib/proxy/BizApi/catalog/catalogIf");
/* -------------------------------------------------------------------------- */
/*                              offering section                              */
/* -------------------------------------------------------------------------- */
function findCatalogWrap(Params) {
    return catalogIf_1.default[catalogIf_1.config.Actions.findCatalogs](Params);
}
exports.findCatalogWrap = findCatalogWrap;
