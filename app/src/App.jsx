"use strict";
<<<<<<< HEAD
var react_1 = require('react');
var react_router_dom_1 = require('react-router-dom');
var react_redux_1 = require('react-redux');
var Home_1 = require('~/pages/Home');
var Profile_1 = require('~/pages/Profile');
var About_1 = require('~/pages/About');
var Login_1 = require('~/pages/Login/Login');
var Admin_1 = require('~/pages/Admin');
var connected_react_router_1 = require('connected-react-router');
function App(props) {
    return (<react_redux_1.Provider store={props.store}>
      <connected_react_router_1.ConnectedRouter history={props.history}>
        <react_router_dom_1.Switch>
          <react_router_dom_1.Route exact path="/">
            <Home_1.default></Home_1.default>
          </react_router_dom_1.Route>
          <react_router_dom_1.Route path="/profile">
            <Profile_1.default></Profile_1.default>
          </react_router_dom_1.Route>
          <react_router_dom_1.Route path="/about">
            <About_1.default></About_1.default>
          </react_router_dom_1.Route>
          <react_router_dom_1.Route exact path="/login" component={Login_1.default}/>
          <react_router_dom_1.Route exact path="/admin" component={Admin_1.Admin}/>
        </react_router_dom_1.Switch>
      </connected_react_router_1.ConnectedRouter>
    </react_redux_1.Provider>);
}
exports.App = App;
=======
var react_1 = require("react");
var connected_react_router_1 = require("connected-react-router");
var react_router_dom_1 = require("react-router-dom");
var react_redux_1 = require("react-redux");
var HomePage_1 = require("~/pages/HomePage");
var ProfilePage_1 = require("~/pages/ProfilePage");
var AboutPage_1 = require("~/pages/AboutPage");
var LoginPage_1 = require("~/pages/Login/LoginPage");
var AdminPage_1 = require("~/pages/AdminPage");
var NotFoundPage_1 = require("~/pages/NotFoundPage");
var LoginModal_1 = require("~/component/Login/LoginModal");
var Offline_1 = require("~/component/Alerts/Offline");
var index_1 = require('~/pages/Offering/index');
var index_2 = require('~/pages/Offering/Financial/index');
function App(props) {
    var route = props.redirectToLogin ? (<react_router_dom_1.Switch>
      <react_router_dom_1.Route path="/login" component={LoginPage_1.default}/>
      <react_router_dom_1.Redirect to={{ pathname: "/login" }}/>
    </react_router_dom_1.Switch>) : (<react_router_dom_1.Switch>
      <react_router_dom_1.Route exact path="/" component={HomePage_1.default}/>
      <react_router_dom_1.Route path="/profile" component={ProfilePage_1.default}/>
      <react_router_dom_1.Route path="/about" component={AboutPage_1.default}/>
      <react_router_dom_1.Route path="/admin" component={AdminPage_1.default}/>
			<react_router_dom_1.Route exact path="/offering" component={index_1.default}/>
			<react_router_dom_1.Route exact path="/offering/:id/financial" component={index_2.default}/>
      <react_router_dom_1.Route component={NotFoundPage_1.default}/>
    </react_router_dom_1.Switch>);
    return (<react_redux_1.Provider store={props.store}>
      <Offline_1.default />
      {props.loginModalRequired && <LoginModal_1.default />}
      <connected_react_router_1.ConnectedRouter history={props.history}>{route}</connected_react_router_1.ConnectedRouter>
    </react_redux_1.Provider>);
}
var mapStateToProps = function (state) {
    return {
        redirectToLogin: state.authentication.redirectToLogin,
        loginModalRequired: state.authentication.loginModalRequired
    };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = react_redux_1.connect(mapStateToProps)(App);
>>>>>>> 95fa07f14cde80d391ca40c2c92a886b9cf6a8f6
