import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { profileReducer } from './profile'
import thunk from 'redux-thunk'

type WindowWithReduxDevTools = typeof window & {
  __REDUX_DEVTOOLS_EXTENSION__: typeof compose
}

const reducers = combineReducers({
  profile: profileReducer
})

const storeEnhancers: any = compose(
  applyMiddleware(thunk),
  // redux dev tools
  typeof (window as WindowWithReduxDevTools).__REDUX_DEVTOOLS_EXTENSION__ !==
    'undefined'
    ? (window as WindowWithReduxDevTools).__REDUX_DEVTOOLS_EXTENSION__()
    : (f: unknown) => f
)
export const store = createStore(reducers, storeEnhancers)
