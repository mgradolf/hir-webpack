"use strict";
var ApiMethodFactory_1 = require("../../../utils/ApiMethodFactory");
exports.config = {
    EndPoint: "api/bizApiServlet",
    Service: "com.jenzabar.jxntm.server.bizapi.catalog.CatalogIF",
    Module: "hir",
    Actions: {
        findCatalogs: "findCatalogs"
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ApiMethodFactory_1.default(exports.config);
