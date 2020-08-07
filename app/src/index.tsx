import React from "react"
import { render } from "react-dom"
import * as Sentry from "@sentry/react"
import App from "~/App"
import * as serviceWorker from "~/serviceWorker"
import { store, history } from "~/store"
import registeGlobalhttpErrorHandlerr from "~/service/RegisteGlobalhttpErrorHandlerr"
import { initializedAuthState } from "~/service/Login"
import "antd/dist/antd.css"

if (process.env.REACT_APP_SENTRY_RELEASE && process.env.REACT_APP_SENTRY_DSN) {
  Sentry.init({
    release: process.env.REACT_APP_SENTRY_RELEASE,
    dsn: process.env.REACT_APP_SENTRY_DSN
  })
}

registeGlobalhttpErrorHandlerr()
initializedAuthState()

const root = document.getElementById("root")
render(<App store={store} history={history} />, root)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
