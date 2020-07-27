import React from 'react'
import { Router, Route, Switch } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import { Provider } from 'react-redux'
import { AppStore } from '~/store/index'
import styles from '~/sass/App.module.scss'
import Home from '~/pages/Home'
import Profile from '~/pages/Profile'
import About from '~/pages/About'
import ApiErrorAlert from './component/ApiErrorAlert'

interface AppProps {
  store: AppStore
}

export function App(props: AppProps): JSX.Element {
  const history = createBrowserHistory()
  return (
    <Router history={history}>
      <Provider store={props.store}>
        <ApiErrorAlert></ApiErrorAlert>
        <div className={styles.AppBody}>
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
          </Switch>
        </div>
      </Provider>
    </Router>
  )
}
