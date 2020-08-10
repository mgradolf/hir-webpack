"use strict";
var CallApi_1 = require("./CallApi");
var TokenStore_1 = require("./TokenStore");
function callServiceApi(Service, Action, Params, Module) {
    var config = {
        baseURL: process.env.REACT_APP_API_ROOT,
        url: "api/hirServlet",
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
exports.default = function (config) {
    var Actions = {};
    Object.keys(config.Actions).forEach(function (Action) {
        Actions[Action] = function (Params) {
            return callServiceApi(config.Service, Action, Params, config.Module);
        };
    });
    return Actions;
};
