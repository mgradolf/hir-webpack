"use strict";
var React = require("react");
var LoginPage_module_scss_1 = require("~/pages/Login/LoginPage.module.scss");
var antd_1 = require("antd");
var Login_1 = require("~/component/Login/Login");
function LoginPage() {
    return (<antd_1.Layout className={LoginPage_module_scss_1.default.Layout}>
      <antd_1.Layout.Content className={LoginPage_module_scss_1.default.Content}>
        <img src="./images/logo.png" className={LoginPage_module_scss_1.default.Logo} alt="jenzabar-logo"/>
        <Login_1.default page={true}/>
        <p className={LoginPage_module_scss_1.default.Footer_note}>{"2011-" + new Date().getFullYear() + " Jenzabar, Inc."}</p>
      </antd_1.Layout.Content>
    </antd_1.Layout>);
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = LoginPage;
