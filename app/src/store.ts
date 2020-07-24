import {
  createStore as createEnhancedStore,
  combineReducers,
  applyMiddleware,
  compose,
  Store,
  AnyAction
} from 'redux'
import { profileReducer, ProfileState } from './profile'
import thunk from 'redux-thunk'

type WindowWithReduxDevTools = typeof window & {
  __REDUX_DEVTOOLS_EXTENSION__: typeof compose
}

const reducers = combineReducers({
  profile: profileReducer
})

type AppState = {
  profile: ProfileState
}

export type AppStore = Store<AppState, AnyAction>

const storeEnhancers: any = compose(
  applyMiddleware(thunk),
  // redux dev tools
  typeof (window as WindowWithReduxDevTools).__REDUX_DEVTOOLS_EXTENSION__ !==
    'undefined'
    ? (window as WindowWithReduxDevTools).__REDUX_DEVTOOLS_EXTENSION__()
    : (f: unknown) => f
)
export function createStore(): { store: AppStore } {
  const store = createEnhancedStore(reducers, storeEnhancers)
  return { store }
}
