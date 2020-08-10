"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
var axios_1 = require("axios");
var Interfaces_1 = require("./Interfaces");
var HandleResponse_1 = require("./HandleResponse");
var GlobalHttpErrorEventBus_1 = require("./GlobalHttpErrorEventBus");
function callApi(config) {
    return __awaiter(this, void 0, Promise, function* () {
        var requestConfig = config;
        requestConfig.withCredentials = true;
        var _a = yield HandleResponse_1.handleResponse(axios_1.default.request(requestConfig)), response = _a[0], error = _a[1];
        // console.log("requestConfig", requestConfig)
        // console.log("response ", response)
        // console.log("error ", error)
        if (error && error.type === Interfaces_1.ErrorType.GLOBAL) {
            GlobalHttpErrorEventBus_1.default.publish(error);
            return [undefined, undefined];
        }
        return [response, error];
    });
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = callApi;
