"use strict";
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var react_redux_1 = require("react-redux");
var ProfilePage_1 = require("~/pages/ProfilePage");
var AboutPage_1 = require("~/pages/AboutPage");
var LoginPage_1 = require("~/pages/Login/LoginPage");
var AdminPage_1 = require("~/pages/AdminPage");
var LoginModal_1 = require("~/component/Login/LoginModal");
var connected_react_router_1 = require("connected-react-router");
var index_1 = require('~/pages/Offering/index');
var index_2 = require('~/pages/Offering/Financial/index');
function App(props) {
    var route;
    if (props.redirectToLogin) {
        route = <react_router_dom_1.Redirect to={{ pathname: "/login" }}/>;
    }
    else {
        route = (<react_1.default.Fragment>
        {props.loginModalRequired && <LoginModal_1.default />}
        <react_router_dom_1.Route exact path="/" component={index_1.default}/>
        <react_router_dom_1.Route path="/profile" component={ProfilePage_1.default}/>
        <react_router_dom_1.Route path="/about" component={AboutPage_1.default}/>
        <react_router_dom_1.Route exact path="/admin" component={AdminPage_1.default}/>
        <react_router_dom_1.Route exact path="/offering" component={index_1.default}/>
        <react_router_dom_1.Route exact path="/offering/:id/financial" component={index_2.default}/>
      </react_1.default.Fragment>);
    }
    return (<react_redux_1.Provider store={props.store}>
      <connected_react_router_1.ConnectedRouter history={props.history}>
        <react_router_dom_1.Switch>
          <react_router_dom_1.Route exact path="/login" component={LoginPage_1.default}/>
          {route}
        </react_router_dom_1.Switch>
      </connected_react_router_1.ConnectedRouter>
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
