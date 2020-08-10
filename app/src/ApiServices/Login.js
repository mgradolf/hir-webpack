"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
var Login_1 = require("@packages/api/lib/Login");
var store_1 = require("~/store");
var Authentication_1 = require("~/store/Authentication");
var TokenStore_1 = require("@packages/api/lib/utils/TokenStore");
// type LoginResponse = { data: { token: string } } // TODO: More to define here, as we only know token for now
// type Response<T> = [T | undefined, unknown | undefined] // TODO: should be exported from somewhere more generic
function login(UserName, UserPassword) {
    return __awaiter(this, void 0, Promise, function* () {
        var _a = yield Login_1.login(UserName, UserPassword), response = _a[0], error = _a[1];
        if (response) {
            store_1.store.dispatch(Authentication_1.setLoginRequired(false));
            store_1.store.dispatch(Authentication_1.setRedirectToLogin(false));
        }
        return [response, error];
    });
}
exports.login = login;
function logout() {
    TokenStore_1.removeTokens();
    store_1.store.dispatch(Authentication_1.setLoginRequired(false));
    store_1.store.dispatch(Authentication_1.setRedirectToLogin(true));
}
exports.logout = logout;
function initializedAuthState() {
    if (!TokenStore_1.getToken()) {
        store_1.store.dispatch(Authentication_1.setLoginRequired(false));
        store_1.store.dispatch(Authentication_1.setRedirectToLogin(true));
    }
}
exports.initializedAuthState = initializedAuthState;
