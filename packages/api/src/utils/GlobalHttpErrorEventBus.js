"use strict";
var GlobalHttpErrorEventBus = (function () {
    function GlobalHttpErrorEventBus() {
    }
    GlobalHttpErrorEventBus.prototype.subscribe = function (fn) {
        if (!this.callback) {
            this.callback = fn;
            return true;
        }
        else {
            return false;
        }
    };
    GlobalHttpErrorEventBus.prototype.publish = function (err) {
        if (this.callback) {
            this.callback(err);
            return true;
        }
        return false;
    };
    return GlobalHttpErrorEventBus;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = new GlobalHttpErrorEventBus();
