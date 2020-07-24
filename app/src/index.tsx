import React from 'react'
import { render } from 'react-dom'
import { App } from './App'
import * as Sentry from '@sentry/react'
import { createStore } from '~/store'
import * as serviceWorker from '~/serviceWorker'

const { store } = createStore()

if (process.env.REACT_APP_SENTRY_RELEASE && process.env.REACT_APP_SENTRY_DSN) {
  Sentry.init({
    release: process.env.REACT_APP_SENTRY_RELEASE,
    dsn: process.env.REACT_APP_SENTRY_DSN
  })
}

const root = document.getElementById('root')
render(<App store={store} />, root)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
