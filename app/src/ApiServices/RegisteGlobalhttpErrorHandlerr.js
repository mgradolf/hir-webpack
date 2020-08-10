"use strict";
var GlobalHttpErrorEventBus_1 = require("@packages/api/lib/utils/GlobalHttpErrorEventBus");
var store_1 = require("~/store");
var GlobalError_1 = require("~/store/GlobalError");
var Authentication_1 = require("~/store/Authentication");
function RegisteGlobalhttpErrorHandlerr() {
    GlobalHttpErrorEventBus_1.default.subscribe(function (error) {
        store_1.store.dispatch(GlobalError_1.showGLobalApiError(error.error));
        if (error.code === 401 && store_1.store.getState().router.location.pathname !== "/login") {
            store_1.store.dispatch(Authentication_1.setLoginRequired(true));
        }
    });
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = RegisteGlobalhttpErrorHandlerr;
