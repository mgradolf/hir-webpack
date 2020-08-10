"use strict";
var CallApi_1 = require("./CallApi");
var TokenStore_1 = require("./TokenStore");
function default_1(Service, Action, Params, Module) {
    var config = {
        baseURL: process.env.REACT_APP_API_ROOT,
        url: "api/bizApiServlet",
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + TokenStore_1.getToken()
        },
        data: {
            Module: Module,
            Service: Service,
            Action: Action,
            Params: Params
        }
    };
    return CallApi_1.default(config);
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
