import React, { useEffect, useState } from "react"
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
import { getHelpConfig, IHelpConfig } from "~/utils/getHelpConfig"
import { HelpContext } from "~/Context/HelpContext"

interface AppProps {
  store: AppStore
  history: History
  redirectToLogin: boolean
}

function App(props: AppProps): JSX.Element {
  const [helpConfig, setHelpConfig] = useState<IHelpConfig>({})
  useEffect(() => {
    getHelpConfig().then((x) => setHelpConfig(x))
  }, [])

  const route: JSX.Element = props.redirectToLogin ? (
    <Switch>
      <Route path="/login" component={LoginPage} />
      <Redirect to={{ pathname: "/login" }} />
    </Switch>
  ) : (
    <Switch>
      {AppRoutes.map((route, i) => {
        return <Route key={i} {...route} exact />
      })}
      <Route path="*" component={NotFoundPage} />
    </Switch>
  )
  return (
    <HelpContext.Provider value={helpConfig}>
      <Provider store={props.store}>
        <div id="modal-container"></div>
        <ModalContainer />
        <ConnectedRouter history={props.history}>
          {props.redirectToLogin ? route : <DefaultLayout>{route}</DefaultLayout>}
        </ConnectedRouter>
      </Provider>
    </HelpContext.Provider>
  )
}

const mapStateToProps = (state: AppState) => {
  return {
    redirectToLogin: state.authentication.redirectToLogin
  }
}
export default connect(mapStateToProps)(App)
