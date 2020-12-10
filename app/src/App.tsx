import React from "react"
import { Route, Switch, Redirect } from "react-router-dom"
import { AppStore, AppState } from "~/Store/index"
import { Provider, connect } from "react-redux"
import { ConnectedRouter } from "connected-react-router"
import { History } from "history"
import LoginPage from "~/Pages/Login/LoginPage"
import DefaultLayout from "~/Layout/DefaultLayout"
import ModalContainer from "~/Component/ModalContainer"
import { AppRoutes } from "~/routes"
import NotFoundPage from "~/Pages/NotFoundPage"

interface AppProps {
  store: AppStore
  history: History
  redirectToLogin: boolean
}

function RenderedRoutes() {
  return (
    <>
      {AppRoutes.map((route, i) => (
        <Route key={i} {...route} exact={true} />
      ))}
    </>
  )
}
function App(props: AppProps): JSX.Element {
  const route: JSX.Element = props.redirectToLogin ? (
    <Switch>
      <Route path="/login" component={LoginPage} />
      <Redirect to={{ pathname: "/login" }} />
    </Switch>
  ) : (
    <Switch>
      <RenderedRoutes />
      <Route path="*" component={NotFoundPage} />
    </Switch>
  )
  return (
    <Provider store={props.store}>
      <div id="modal-container"></div>
      <ModalContainer />
      <ConnectedRouter history={props.history}>
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
