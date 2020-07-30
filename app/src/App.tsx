import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import { AppStore } from '~/store/index'
import Home from '~/pages/Home'
import Profile from '~/pages/Profile'
import About from '~/pages/About'
import ApiErrorAlert from './component/ApiErrorAlert'
import Login from '~/pages/Login'
import { Admin } from '~/pages/Admin'
import { History } from 'history'
import { ConnectedRouter } from 'connected-react-router'

interface AppProps {
  store: AppStore
  history: History
}

export function App(props: AppProps): JSX.Element {
  return (
    <Provider store={props.store}>
      <ConnectedRouter history={props.history}>
        {/* <ApiErrorAlert /> */}
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
