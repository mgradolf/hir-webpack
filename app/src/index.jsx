"use strict";
var react_1 = require('react');
var react_dom_1 = require('react-dom');
var Sentry = require('@sentry/react');
var App_1 = require('~/App');
var serviceWorker = require('~/serviceWorker');
var store_1 = require('~/store');
var RegisteGlobalhttpErrorHandlerr_1 = require('~/api-wrappers/RegisteGlobalhttpErrorHandlerr');
require('antd/dist/antd.css');
var _a = store_1.createStore(), store = _a.store, history = _a.history;
if (process.env.REACT_APP_SENTRY_RELEASE && process.env.REACT_APP_SENTRY_DSN) {
    Sentry.init({
        release: process.env.REACT_APP_SENTRY_RELEASE,
        dsn: process.env.REACT_APP_SENTRY_DSN
    });
}
RegisteGlobalhttpErrorHandlerr_1.default(store);
var root = document.getElementById('root');
react_dom_1.render(<App_1.App store={store} history={history}/>, root);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
