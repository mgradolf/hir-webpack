import React from "react"
import { Route, Switch, Redirect } from "react-router-dom"
import { AppStore, AppState } from "~/store/index"
import { Provider, connect } from "react-redux"
import { ConnectedRouter } from "connected-react-router"
import { History } from "history"
import LoginPage from "~/pages/Login/LoginPage"
// // import HomePage from "~/pages/HomePage"
import ProfilePage from "~/pages/ProfilePage"
import AboutPage from "~/pages/AboutPage"
import AdminPage from "~/pages/AdminPage"
import NotFoundPage from "~/pages/NotFoundPage"
import OfferingPage from "~/pages/Offering/index"
import OfferingFinancialPage from "~/pages/Offering/Financial"
import OfferingCatalogPage from "~/pages/Offering/Catalog"
import OfferingTaggPage from "~/pages/Offering/Tag"

import DefaultLayout from "~/Layout/DefaultLayout"
import ModalContainer from "~/component/Modal/ModalContainer"

interface AppProps {
  store: AppStore
  history: History
  redirectToLogin: boolean
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
      <Route exact path="/offering/:id/catalog" component={OfferingCatalogPage} />
      <Route exact path="/offering/:id/tag" component={OfferingTaggPage} />
      <Route component={NotFoundPage} />
    </Switch>
  )
  return (
    <Provider store={props.store}>
      <ModalContainer />
      <ConnectedRouter history={props.history}>
        {/* Should be refactored later as condition check gets repeated */}
        {props.redirectToLogin ? route : <DefaultLayout>{route}</DefaultLayout>}
      </ConnectedRouter>
    </Provider>
  )
}

const mapStateToProps = (state: AppState) => {
  return {
    redirectToLogin: state.authentication.redirectToLogin
  }
}
export default connect(mapStateToProps)(App)
