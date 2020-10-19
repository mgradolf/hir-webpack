import { Card, Row } from "antd"
import moment from "moment"
import React, { useEffect, useState } from "react"
import { getOrderDetails } from "~/ApiServices/Service/OrderService"
import { DATE_FORMAT } from "~/utils/Constants"

interface IOrderDetails {
  OrderID: number
}
export default function OrderDetails({ OrderID }: IOrderDetails) {
  const [details, setDetails] = useState<{ [key: string]: any }>({})
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    setLoading(true)
    getOrderDetails({ OrderID }).then((x) => {
      if (x.success) {
        setDetails(x.data[0])
      }
      setLoading(false)
    })
  }, [OrderID])
  return (
    <>
      <Row gutter={16}>
        <Card title="Order Info" loading={loading}>
          <table style={{ width: "400px" }}>
            <tbody>
              <tr>
                <td>Order ID</td>
                <td>{details.OrderID}</td>
              </tr>
              <tr>
                <td>Status</td>
                <td>{details.OrderStatus}</td>
              </tr>
              <tr>
                <td>Order Created On</td>
                <td>{moment(details.OrderDate).format(DATE_FORMAT)}</td>
              </tr>
              <tr>
                <td>Completed On</td>
                <td>{moment(details.CompletedDate).format(DATE_FORMAT)}</td>
              </tr>
            </tbody>
          </table>
        </Card>
        <Card title="Billing Info" loading={loading}>
          <table style={{ width: "400px" }}>
            <tbody>
              <tr>
                <td>Name</td>
                <td>{details.PersonName}</td>
              </tr>
              {details.BusinessName && (
                <tr>
                  <td>Business Name</td>
                  <td>{details.BusinessName}</td>
                </tr>
              )}
              <tr>
                <td>Address</td>
                <td>{details.BillToAddress}</td>
              </tr>
              <tr>
                <td>Address1</td>
                <td>{details.BillToAddress1}</td>
              </tr>
              <tr>
                <td>Address2</td>
                <td>{details.BillToAddress2}</td>
              </tr>
              <tr>
                <td>Address3</td>
                <td>{details.BillToAddress3}</td>
              </tr>
              <tr>
                <td>City</td>
                <td>{details.BillToCity}</td>
              </tr>
              <tr>
                <td>Country</td>
                <td>{details.BillToCountry}</td>
              </tr>
              <tr>
                <td>Regions</td>
                <td>{details.BillToRegions}</td>
              </tr>
            </tbody>
          </table>
        </Card>
        <Card title="Financials" loading={loading}>
          <table style={{ width: "400px" }}>
            <tbody>
              <tr>
                <td>TotalItems</td>
                <td>{details.TotalItems}</td>
              </tr>
              <tr>
                <td>Total</td>
                <td>{details.TotalAmount}</td>
              </tr>
              <tr>
                <td>Discount</td>
                <td>{details.DiscountAmount}</td>
              </tr>
              <tr>
                <td>Extended</td>
                <td>{details.ExtendedAmount}</td>
              </tr>
              {details.PaymentDueDate && (
                <tr>
                  <td>PaymentDueDate</td>
                  <td>{moment(details.PaymentDueDate).format(DATE_FORMAT)}</td>
                </tr>
              )}
            </tbody>
          </table>
        </Card>
      </Row>
    </>
  )
}
