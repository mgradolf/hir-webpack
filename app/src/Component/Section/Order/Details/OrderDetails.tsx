import { Card, Row } from "antd"
import moment from "moment"
import React, { useEffect, useState } from "react"
import { getOrderDetails, searchOrders } from "~/ApiServices/Service/OrderService"

import { DATE_FORMAT } from "~/utils/Constants"

interface IOrderDetails {
  OrderID: number
}
export default function OrderDetails({ OrderID }: IOrderDetails) {
  const [details, setDetails] = useState<{ [key: string]: any }>({})
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    const loadOrderInfo = async () => {
      setLoading(true)
      const orderInfo = {
        ...(await (await getOrderDetails({ OrderID })).data[0]),
        ...(await (await searchOrders({ OrderID })).data[0])
      }
      setLoading(false)
      console.log(orderInfo)
      setDetails(orderInfo)
    }
    loadOrderInfo()
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
                <td>Source</td>
                <td>{details.Source}</td>
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
              {!!details.PersonName && (
                <tr>
                  <td>Name</td>
                  <td>{details.PersonName}</td>
                </tr>
              )}
              {!!details.BusinessName && (
                <tr>
                  <td>Business Name</td>
                  <td>{details.BusinessName}</td>
                </tr>
              )}
              {!!details.BillToAddress && (
                <tr>
                  <td>Address</td>
                  <td>{details.BillToAddress}</td>
                </tr>
              )}
              {!!details.BillToAddress1 && (
                <tr>
                  <td>Address1</td>
                  <td>{details.BillToAddress1}</td>
                </tr>
              )}
              {!!details.BillToAddress2 && (
                <tr>
                  <td>Address2</td>
                  <td>{details.BillToAddress2}</td>
                </tr>
              )}
              {!!details.BillToAddress3 && (
                <tr>
                  <td>Address3</td>
                  <td>{details.BillToAddress3}</td>
                </tr>
              )}
              {!!details.BillToCity && (
                <tr>
                  <td>City</td>
                  <td>{details.BillToCity}</td>
                </tr>
              )}
              {!!details.BillToCountry && (
                <tr>
                  <td>Country</td>
                  <td>{details.BillToCountry}</td>
                </tr>
              )}
              {!!details.BillToRegions && (
                <tr>
                  <td>Regions</td>
                  <td>{details.BillToRegions}</td>
                </tr>
              )}
            </tbody>
          </table>
        </Card>
        <Card title="Financials" loading={loading}>
          <table style={{ width: "400px" }}>
            <tbody>
              {!!details.TotalItems && (
                <tr>
                  <td>Total Items</td>
                  <td>{details.TotalItems}</td>
                </tr>
              )}
              {!!details.TotalAmount && (
                <tr>
                  <td>Total Order Amount</td>
                  <td>{details.TotalAmount}</td>
                </tr>
              )}
              {!!details.CreditAmount && (
                <tr>
                  <td>Credit Amount</td>
                  <td>{details.CreditAmount}</td>
                </tr>
              )}
              {!!details.DiscountAmount && (
                <tr>
                  <td>Discount</td>
                  <td>{details.DiscountAmount}</td>
                </tr>
              )}
              {!!details.AmountPaid && (
                <tr>
                  <td>Amount Paid</td>
                  <td>{details.AmountPaid}</td>
                </tr>
              )}
              {!!details.RefundAmount && (
                <tr>
                  <td>Refund Amount</td>
                  <td>{details.RefundAmount}</td>
                </tr>
              )}
              {!!details.Balance && (
                <tr>
                  <td>Balance</td>
                  <td>{details.Balance}</td>
                </tr>
              )}
              {!!details.ExtendedAmount && (
                <tr>
                  <td>Extended</td>
                  <td>{details.ExtendedAmount}</td>
                </tr>
              )}
              {!!details.HasPO && (
                <tr>
                  <td>HasPO</td>
                  <td>{details.HasPO}</td>
                </tr>
              )}
              {!!details.PaymentDueDate && (
                <tr>
                  <td>Payment Due Date</td>
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
