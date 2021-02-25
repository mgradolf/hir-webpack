import React, { useEffect, useState } from "react"
import { Route, Switch, Redirect } from "react-router-dom"
import { AppStore, AppState } from "~/Store/index"
import { Dispatch } from "redux"
import { Provider, connect } from "react-redux"
import { ConnectedRouter } from "connected-react-router"
import { History } from "history"
import LoginPage from "~/Pages/Login/LoginPage"
import DefaultLayout from "~/Layout/DefaultLayout"
import ModalContainer from "~/Component/ModalContainer"
import { getAppRoutes, IRouteProps } from "~/routes"
import NotFoundPage from "~/Pages/NotFoundPage"
import { IUserPermissions, setUserPermission } from "~/Store/Authentication"
import { loadUserPermission } from "~/ApiServices/Service/HRUserService"
import { getHelpConfig, IHelpConfig } from "~/Config/Help"
import { HelpContext } from "~/Context/HelpContext"

interface AppProps {
  store: AppStore
  history: History
  redirectToLogin: boolean
  permission?: IUserPermissions
  setUserPermission: (permission?: IUserPermissions) => void
}

function App(props: AppProps): JSX.Element {
  const [routes, setRoutes] = useState<IRouteProps[]>([])
  const [helpConfig, setHelpConfig] = useState<IHelpConfig>({})
  useEffect(() => {
    getHelpConfig().then((x) => setHelpConfig(x))
  }, [])

  useEffect(() => {
    loadUserPermission().then((x) => {
      if (x.success) {
        props.setUserPermission(x.data)
        const _routes = getAppRoutes(x.data)
        setRoutes(_routes)
      }
    })
    // eslint-disable-next-line
  }, [])
  return (
    <HelpContext.Provider value={helpConfig}>
      <Provider store={props.store}>
        <div id="modal-container"></div>
        <ModalContainer />
        <ConnectedRouter history={props.history}>
          {props.redirectToLogin ? (
            <Switch>
              <Route path="/login" component={LoginPage} />
              <Redirect to={{ pathname: "/login" }} />
            </Switch>
          ) : (
            <>
              <DefaultLayout>
                <Switch>
                  {routes
                    .filter((route) => route.permission !== false)
                    .map((route, i) => (
                      <Route key={i} {...route} exact />
                    ))}
                  <Route path="*" component={NotFoundPage} />
                </Switch>
              </DefaultLayout>
            </>
          )}
        </ConnectedRouter>
      </Provider>
    </HelpContext.Provider>
  )
}

const mapStateToProps = (state: AppState) => {
  return {
    redirectToLogin: state.authentication.redirectToLogin,
    permission: state.authentication.permission
  }
}
const mapDispatchToProps = (dispatch: Dispatch) => {
  return { setUserPermission: (permission?: IUserPermissions) => dispatch(setUserPermission(permission)) }
}
export default connect(mapStateToProps, mapDispatchToProps)(App)
