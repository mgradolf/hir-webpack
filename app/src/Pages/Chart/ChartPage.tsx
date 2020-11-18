import React from "react"
import { Link } from "react-router-dom"

const list: any[] = [
  {
    title: "Analyze Orders By Date",
    url: "/chart/order"
  },
  {
    title: "Analyze Payments By Date",
    url: "/chart/payment"
  },
  {
    title: "Analyze Registration Acitivity By Date",
    url: "/chart/registrationActivity"
  }
]
export default function ChartPage() {
  return (
    <ul>
      {list.map((x, i) => (
        <li key={i}>
          <Link to={x.url}>{x.title}</Link>
        </li>
      ))}
    </ul>
  )
}
