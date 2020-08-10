"use strict";
var CallBizApi_1 = require("../../../utils/CallBizApi");
var Module = "hir";
var Service = "com.jenzabar.jxntm.server.bizapi.catalog.CatalogIF";
exports.findCatalogs = function (Params) { return CallBizApi_1.default(Service, "findCatalogs", Params, Module); };
