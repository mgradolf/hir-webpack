import React from "react"
import { ConnectedRouter } from "connected-react-router"
import { Route, Switch, Redirect } from "react-router-dom"
import { Provider, connect } from "react-redux"
import { AppStore, AppState } from "~/store/index"
import HomePage from "~/pages/HomePage"
import ProfilePage from "~/pages/ProfilePage"
import AboutPage from "~/pages/AboutPage"
import LoginPage from "~/pages/Login/LoginPage"
import AdminPage from "~/pages/AdminPage"
import NotFoundPage from "~/pages/NotFoundPage"
import LoginModal from "~/component/Login/LoginModal"
import OfflineAlert from "~/component/Alerts/Offline"
import { History } from "history"
import OfferingPage from '~/pages/Offering/index'
import OfferingFinancialPage from '~/pages/Offering/Financial/index'

interface AppProps {
  store: AppStore
  history: History
  redirectToLogin: boolean
  loginModalRequired: boolean
}

function App(props: AppProps): JSX.Element {
  const route: JSX.Element = props.redirectToLogin ? (
    <Switch>
      <Route path="/login" component={LoginPage} />
      <Redirect to={{ pathname: "/login" }} />
    </Switch>
  ) : (
    <Switch>
      <Route exact path="/" component={OfferingPage} />
      <Route path="/profile" component={ProfilePage} />
      <Route path="/about" component={AboutPage} />
      <Route path="/admin" component={AdminPage} />
			<Route exact path="/offering" component={OfferingPage} />
			<Route exact path="/offering/:id/financial" component={OfferingFinancialPage} />
      <Route component={NotFoundPage} />
    </Switch>
  )
  return (
    <Provider store={props.store}>
      <OfflineAlert />
      {props.loginModalRequired && <LoginModal />}
      <ConnectedRouter history={props.history}>{route}</ConnectedRouter>
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
