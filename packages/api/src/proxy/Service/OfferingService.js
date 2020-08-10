"use strict";
var CallServiceApi_1 = require("../../utils/CallServiceApi");
exports.config = {
    Service: "OfferingService",
    Module: "hir",
    Actions: {
        createOffering: "createOffering",
        updateOffering: "updateOffering",
        searchOffering: "searchOffering",
        addOrRemoveOfferingToCatalog: "addOrRemoveOfferingToCatalog",
        createOfferingFinancial: "createOfferingFinancial",
        updateOfferingFinancial: "updateOfferingFinancial",
        searchOfferingFinancial: "searchOfferingFinancial"
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = CallServiceApi_1.default(exports.config);
