import React from 'react'
import { render } from 'react-dom'
import { App } from './App'
import * as Sentry from '@sentry/react'

if (process.env.REACT_APP_SENTRY_RELEASE && process.env.REACT_APP_SENTRY_DSN) {
  Sentry.init({
    release: process.env.REACT_APP_SENTRY_RELEASE,
    dsn: process.env.REACT_APP_SENTRY_DSN
  })
}

const root = document.getElementById('root')
render(<App />, root)
