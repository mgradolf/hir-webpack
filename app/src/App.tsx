import React, { useEffect, useState, useRef } from 'react'
import styles from '~/sass/App.module.scss'
import style2 from '~/sass/nested/div.module.scss'
import sum from '~/utils/sum'
import { Provider } from 'react-redux'
import ActionButton from '@packages/components/lib/Buttons/ActionButton'
import { AppStore } from '~/store'
import { getCountries } from '@packages/api/lib/test/getCountries'
// import { addOrRemoveOfferingToCatalog } from "@packages/api/lib/service/offering_service/add_remove_offering_to_catalog"

interface AppProps {
  store: AppStore
}

function AppContent() {
  // try {
  //   addOrRemoveOfferingToCatalog(2, [3, 4])
  // } catch (error) {
  //   console.log(error)
  // }

  const [data, setdata] = useState({ name: null, country: null, ip: null })
  const loading = useRef(true)
  useEffect(() => {
    callApi()
  }, [])
  const callApi = async function () {
    const [response, error] = await getCountries()
    // console.log(JSON.stringify(error))
    console.log(error)
    // console.log(error.response)
    loading.current = false
    setdata(response)
  }

  const print = () => {
    console.log('jellp porld')
  }
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
        <button onClick={callApi}>Call api</button>
      </div>
    )
  } else {
    content = (
      <div>
        Something went wrong
        <button onClick={callApi}>Call api</button>
      </div>
    )
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
