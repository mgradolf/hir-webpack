import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
// import { getCountriesWrap } from "~/api-wrappers/test/getCountries"

export default function Profile() {
  // useEffect(() => {
  //   callApi()
  // }, [])
  // const callApi = async function () {
  //   await getCountriesWrap()
  // }
  return (
    <div>
      <h1>Profile</h1>
      <Link to="/">Home</Link>
      <br />
      <Link to="/about">About</Link>
      <br />
    </div>
  )
}
