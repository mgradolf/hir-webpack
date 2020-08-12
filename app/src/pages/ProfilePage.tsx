import React from "react"
import { Link } from "react-router-dom"

export default function Profile() {
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
