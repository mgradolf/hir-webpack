import React from "react"
import { Route, Switch, Redirect } from "react-router-dom"
import { Provider, connect } from "react-redux"
import { AppStore, AppState } from "~/store/index"
import HomePage from "~/pages/HomePage"
import ProfilePage from "~/pages/ProfilePage"
import AboutPage from "~/pages/AboutPage"
import LoginPage from "~/pages/Login/LoginPage"
import AdminPage from "~/pages/AdminPage"
import LoginModal from "~/component/Login/LoginModal"
import { History } from "history"
import { ConnectedRouter } from "connected-react-router"

interface AppProps {
  store: AppStore
  history: History
  redirectToLogin: boolean
  loginModalRequired: boolean
}

function App(props: AppProps): JSX.Element {
  let route: JSX.Element
  if (props.redirectToLogin) {
    route = <Redirect to={{ pathname: "/login" }} />
  } else {
    route = (
      <React.Fragment>
        {props.loginModalRequired && <LoginModal />}
        <Route exact path="/" component={HomePage} />
        <Route path="/profile" component={ProfilePage} />
        <Route path="/about" component={AboutPage} />
        <Route exact path="/admin" component={AdminPage} />
        <Route exact path="/offering" component={AdminPage} />
      </React.Fragment>
    )
  }
  return (
    <Provider store={props.store}>
      <ConnectedRouter history={props.history}>
        <Switch>
          <Route exact path="/login" component={LoginPage} />
          {route}
        </Switch>
      </ConnectedRouter>
    </Provider>
  )
}

const mapStateToProps = (state: AppState) => {
  return {
    redirectToLogin: state.authentication.redirectToLogin,
    loginModalRequired: state.authentication.loginModalRequired
  }
}
export default connect(mapStateToProps)(App)
