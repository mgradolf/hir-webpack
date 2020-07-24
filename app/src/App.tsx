import React, { useEffect, useState, useRef } from 'react'
import { getCountries } from '@packages/api-proxy/lib/test/getCountries'
import styles from '~/sass/App.module.scss'
import style2 from '~/sass/nested/div.module.scss'
import sum from '~/utils/sum'
import { Provider } from 'react-redux'
import ActionButton from '@packages/components/lib/Buttons/ActionButton'
import { AppStore } from './store'

interface AppProps {
  store: AppStore
}

function AppContent() {
  const [data, setdata] = useState({ name: null, country: null, ip: null })
  const loading = useRef(true)

  useEffect(() => {
    getCountries().then((response: any) => {
      loading.current = false
      setdata(response)
    })
  }, [])

  let content

  if (loading.current) {
    content = <div>Loading ....</div>
  } else if (data) {
    content = (
      <div>
        <div className={style2.Name}>You are from {data.name}</div>
        <div>Country code {data.country}</div>
        <div>ip {data.ip}</div>
        <div>
          {' this is some '}1 + 2 ={'>'} {sum(1, 2)}
        </div>
        <ActionButton title="hellow" />
      </div>
    )
  } else {
    content = <div>Something went wrong</div>
  }
  return content
}

export function App(props: AppProps): JSX.Element {
  return (
    <div className={styles.AppBody}>
      <Provider store={props.store}>
        <AppContent />
      </Provider>
    </div>
  )
}
