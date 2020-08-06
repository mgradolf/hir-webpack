"use strict";
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
