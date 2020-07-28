import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { getCountriesWrap } from '~/api-wrappers/test/getCountries'
import style2 from '~/sass/nested/div.module.scss'
import sum from '~/utils/sum'

enum LoadingState {
  PENDING,
  INPROGRESS,
  SUCCESS,
  ERROR
}

export default function Home() {
  const [data, setdata] = useState({ name: null, country: null, ip: null })
  const [loading, setLoading] = useState(LoadingState.PENDING)
  const navigateToProfile = async function () {
    setLoading(LoadingState.INPROGRESS)
    const [response, error] = await getCountriesWrap()
    if (response) {
      setLoading(LoadingState.SUCCESS)
      setdata(response)
    } else if (error) {
      setLoading(LoadingState.ERROR)
      setTimeout(() => {
        setLoading(LoadingState.PENDING)
      }, 3 * 1000)
    } else {
      setLoading(LoadingState.PENDING)
    }
  }

  let content
  switch (loading) {
    case LoadingState.INPROGRESS:
      content = <p>checking authorization to profile page ....</p>
      break
    case LoadingState.SUCCESS:
      content = (
        <div>
          <div className={style2.Name}>You are from {data.name}</div>
          <div>Country code {data.country}</div>
          <div>ip {data.ip}</div>
          <div>
            {' this is some '}1 + 2 ={'>'} {sum(1, 2)}
          </div>
          <button onClick={navigateToProfile}>Call api</button>
        </div>
      )
      break
    case LoadingState.ERROR:
      content = <p>Something went wrong</p>
      break
    default:
      content = null
      break
  }

  return (
    <div>
      <h1>Home</h1>
      {/* <Link to="/profile">Profile</Link> */}
      {!(loading === LoadingState.INPROGRESS) && (
        <button onClick={navigateToProfile}>Go to profile page</button>
      )}
      {content}
      <br />
      <Link to="/about">About</Link>
    </div>
  )
}
