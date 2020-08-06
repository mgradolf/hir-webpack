import React from "react"
import { Route, Switch } from "react-router-dom"
import { Provider } from "react-redux"
import { AppStore } from "~/store/index"
import Home from "~/pages/HomePage"
import Profile from "~/pages/ProfilePage"
import About from "~/pages/AboutPage"
import Login from "~/pages/Login/LoginPage"
import { Admin } from "~/pages/AdminPage"
import { History } from "history"
import { ConnectedRouter } from "connected-react-router"

interface AppProps {
  store: AppStore
  history: History
}

export function App(props: AppProps): JSX.Element {
  return (
    <Provider store={props.store}>
      <ConnectedRouter history={props.history}>
        <Switch>
          <Route exact path="/">
            <Home></Home>
          </Route>
          <Route path="/profile">
            <Profile></Profile>
          </Route>
          <Route path="/about">
            <About></About>
          </Route>
          <Route exact path="/login" component={Login} />
          <Route exact path="/admin" component={Admin} />
        </Switch>
      </ConnectedRouter>
    </Provider>
  )
}
