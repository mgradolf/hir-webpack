import React, { useEffect, useState } from "react"
import { getOrderDetails } from "~/ApiServices/Service/OrderService"

interface IOrderDetails {
  OrderID: number
}
export default function OrderDetails({ OrderID }: IOrderDetails) {
  const [details, setDetails] = useState<any[]>([])
  useEffect(() => {
    getOrderDetails({ OrderID }).then((x) => {
      if (x.success) {
        const details = Object.keys(x.data[0]).map((key) => ({ key, value: x.data[0][key] }))
        console.log(details)
        setDetails(details)
      }
    })
  }, [OrderID])
  return (
    <table>
      <tbody>
        {details.map((x, i) => (
          <tr key={i}>
            <td>{x.key} : </td>
            <td>{x.value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
