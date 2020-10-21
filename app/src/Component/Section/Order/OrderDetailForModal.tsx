import { Form, Input } from "antd"
// import moment from "moment"
import React, { useEffect, useState } from "react"
import { searchOrders } from "~/ApiServices/Service/OrderService"
// import { DATE_FORMAT } from "~/utils/Constants"

interface IOrderDetailForModal {
  OrderID: number
}
export default function OrderDetailForModal(props: IOrderDetailForModal) {
  const [order, setOrder] = useState<null | { [key: string]: any }>({})
  useEffect(() => {
    searchOrders({ OrderID: props.OrderID }).then((x) => {
      if (x.success) setOrder(x.data[0])
      else setOrder(null)
    })
  }, [props])
  return (
    <>
      {order && (
        <Form>
          <Form.Item label="Order ID" labelCol={{ span: 6 }}>
            <Input value={order.OrderID} readOnly disabled />
          </Form.Item>
          {/* <Form.Item label="Person Getting Billed" labelCol={{ span: 6 }}>
            <Input value={order.BilledPersonName} readOnly disabled />
          </Form.Item>
          <Form.Item label="OrderStatus" labelCol={{ span: 6 }}>
            <Input value={order.OrderStatus} readOnly disabled />
          </Form.Item>
          <Form.Item label="Order Date" labelCol={{ span: 6 }}>
            <Input value={moment(order.CreateDate).format(DATE_FORMAT)} readOnly disabled />
          </Form.Item> */}
        </Form>
      )}
    </>
  )
}
