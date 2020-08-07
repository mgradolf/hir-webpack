"use strict";
var React = require('react');
var react_redux_1 = require('react-redux');
var actions_1 = require('~/store/authentication/actions');
var antd_1 = require('antd');
var Error_1 = require('~/component/Error');
var Login_module_scss_1 = require('~/pages/Login/Login.module.scss');
var Content = antd_1.Layout.Content;
var INITIAL_FORM_VALUES = {
    username: '',
    password: ''
};
function LoginPage(props) {
    var onFinish = function (values) {
        var _a = values, username = _a.username, password = _a.password;
        props.login(username, password);
    };
    var loggingIn = props.loggingIn, loginError = props.loginError, globalError = props.globalError;
    return (<antd_1.Layout className={Login_module_scss_1.default.Layout}>
      <Content className={Login_module_scss_1.default.Content}>
        <img src="./images/logo.png" className={Login_module_scss_1.default.Logo} alt="jenzabar-logo"/>
        <antd_1.Card className={Login_module_scss_1.default.Card}>
          {Boolean(loginError) && <Error_1.Error>{loginError}</Error_1.Error>}
          {Boolean(globalError) && <Error_1.Error>{globalError}</Error_1.Error>}
          <antd_1.Form layout="vertical" name="basic" hideRequiredMark className="login-form" initialValues={INITIAL_FORM_VALUES} onFinish={onFinish}>
            <antd_1.Form.Item label="Username" name="username" rules={[
        { required: true, message: 'Please input your username!' }
    ]}>
              <antd_1.Input />
            </antd_1.Form.Item>
            <antd_1.Form.Item label="Password" name="password" rules={[
        { required: true, message: 'Please input your password!' }
    ]}>
              <antd_1.Input.Password />
            </antd_1.Form.Item>
            <antd_1.Form.Item className={Login_module_scss_1.default.Text__center}>
              <antd_1.Button type="primary" htmlType="submit" loading={loggingIn}>
                Login
              </antd_1.Button>
            </antd_1.Form.Item>
          </antd_1.Form>
        </antd_1.Card>
        <p className={Login_module_scss_1.default.Footer_note}>{"2011-" + new Date().getFullYear() + " Jenzabar, Inc."}</p>
      </Content>
    </antd_1.Layout>);
}
var mapStateToProps = function (state) {
    var globalError = state.globalApiError.errorMessage;
    var _a = state.authentication, loggingIn = _a.loggingIn, loginError = _a.loginError;
    return { loggingIn: loggingIn, loginError: loginError, globalError: globalError };
};
var actionCreators = {
    login: actions_1.authenticate
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = react_redux_1.connect(mapStateToProps, actionCreators)(LoginPage);
