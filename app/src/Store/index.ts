import { createStore as createEnhancedStore, combineReducers, applyMiddleware, compose, Store, AnyAction } from "redux"
import { authenticationReducer, IAuthentication } from "~/Store/Authentication"
import { globalApiErrorReducer, IGlobalApiErrorState } from "~/Store/GlobalError"
import { modalStateReducer, IModalState } from "~/Store/ModalState"
import { IModalStates, modalState2Reducer } from "~/Store/ModalState2"

import thunk from "redux-thunk"
import { RouterState, connectRouter, routerMiddleware } from "connected-react-router"
import { createBrowserHistory, History } from "history"

type WindowWithReduxDevTools = typeof window & {
  __REDUX_DEVTOOLS_EXTENSION__: typeof compose
}

export type AppState = {
  authentication: IAuthentication
  router: RouterState
  globalApiError: IGlobalApiErrorState
  modalState: IModalState
  modalState2: IModalStates
}

export type AppStore = Store<AppState, AnyAction>

function createStore(): { store: AppStore; history: History } {
  const history = createBrowserHistory({ basename: process.env.PUBLIC_URL })
  const reducers = combineReducers<AppState>({
    authentication: authenticationReducer,
    router: connectRouter(history),
    globalApiError: globalApiErrorReducer,
    modalState: modalStateReducer,
    modalState2: modalState2Reducer
  })

  const storeEnhancers: any = compose(
    applyMiddleware(thunk),
    applyMiddleware(routerMiddleware(history)),
    // redux dev tools
    typeof (window as WindowWithReduxDevTools).__REDUX_DEVTOOLS_EXTENSION__ !== "undefined"
      ? (window as WindowWithReduxDevTools).__REDUX_DEVTOOLS_EXTENSION__()
      : (f: unknown) => f
  )

  const store = createEnhancedStore(reducers, storeEnhancers)
  return { store, history }
}

export const { store, history } = createStore()
