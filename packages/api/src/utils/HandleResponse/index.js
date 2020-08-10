"use strict";
var Interfaces_1 = require("../Interfaces");
var handleError = function (error) {
    var errResponse = {
        code: undefined,
        error: "Unknown",
        data: undefined,
        success: false
    };
    if (error.isAxiosError && error && error.response) {
        if (error.response.data && typeof error.response.data !== "string") {
            errResponse = {
                code: error.response.data["code"],
                error: error.response.data["error"],
                data: error.response.data["data"],
                success: error.response.data["success"]
            };
        }
        else {
            errResponse = {
                code: error.response.status,
                error: error.response.data,
                data: null,
                success: false
            };
        }
    }
    errResponse = tagGlobalErrors(errResponse);
    return errResponse;
};
var retireveErrorText = function (errResponse, defaultMessage) {
    if (errResponse.error && errResponse.error.Description) {
        return errResponse.error.Description;
    }
    else if (errResponse.error && typeof errResponse.error === "string") {
        return errResponse.error;
    }
    return defaultMessage;
};
var tagGlobalErrors = function (errResponse) {
    switch (errResponse.code) {
        case 401:
            errResponse.type = Interfaces_1.ErrorType.GLOBAL;
            errResponse.error = retireveErrorText(errResponse, "UnAuthorized");
            break;
        case 403:
            errResponse.type = Interfaces_1.ErrorType.GLOBAL;
            errResponse.error = retireveErrorText(errResponse, "Forbidden");
            break;
        case 500:
            errResponse.type = Interfaces_1.ErrorType.GLOBAL;
            errResponse.error = retireveErrorText(errResponse, "Internal Server Error");
            break;
        case 502:
            errResponse.type = Interfaces_1.ErrorType.GLOBAL;
            errResponse.error = retireveErrorText(errResponse, "Bad Gateway");
            break;
        case 503:
            errResponse.type = Interfaces_1.ErrorType.GLOBAL;
            errResponse.error = retireveErrorText(errResponse, "Service Unavailable");
            break;
        case 504:
            errResponse.type = Interfaces_1.ErrorType.GLOBAL;
            errResponse.error = retireveErrorText(errResponse, "Gateway Timeout");
            break;
        default:
            errResponse.type = Interfaces_1.ErrorType.CUSTOM;
            break;
    }
    return errResponse;
};
exports.handleResponse = function (promise) {
    return promise
        .then(function (response) {
        return [response.data, undefined];
    })
        .catch(function (error) { return Promise.resolve([undefined, handleError(error)]); });
};
