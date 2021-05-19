import React, { useState } from "react"
import { Form, Input } from "antd"
import { SaveOutlined } from "@ant-design/icons"
import { renderDate, renderLink, ResponsiveTable } from "~/Component/Common/ResponsiveTable"

const UpdateBalanceRow = (props: {
  setLoading: (flag: boolean) => void
  record: any
  selectePaymentAmountType?: string
  allocatedItems: any[]
  setAllocatedItems: (items: any[]) => void
  totalPayment: number
  setTotalPayment: (payment: number) => void
}) => {
  const [value, setValue] = useState(props.record.balance)
  return (
    <>
      <Form.Item>
        <Input
          type="number"
          min={0}
          max={props.record.Balance}
          defaultValue={props.record.Balance}
          disabled={
            props.selectePaymentAmountType === "full_amount" || props.selectePaymentAmountType === "partial_amount"
          }
          onChange={(event) => {
            console.log(event.target.value)
            setValue(parseFloat(event.target.value))
          }}
          {...(props.selectePaymentAmountType === "custom_amount" && {
            addonAfter: (
              <SaveOutlined
                onClick={() => {
                  props.setLoading(true)
                  const __: any[] = props.allocatedItems.map((x) => {
                    if (x.OrderLineID === props.record.OrderLineID) {
                      x.Amount = value
                    }
                    return x
                  })
                  props.setAllocatedItems(__)
                  props.setTotalPayment(__.reduce((acc: any, curr: any) => acc + curr.Amount, 0))
                  console.log(__.reduce((acc: any, curr: any) => acc + curr.Amount, 0))
                  props.setLoading(false)
                }}
              />
            )
          })}
        />
      </Form.Item>
    </>
  )
}

export const AllocatedItemsTableForPayment = (props: {
  allocatedItems: any
  setAllocatedItems: (Params: any[]) => void
  loading: boolean
  setLoading: (flag: boolean) => void
  selectePaymentAmountType: any
  totalPayment: number
  setTotalPayment: (payment: number) => void
}) => (
  <ResponsiveTable
    loading={props.loading}
    columns={[
      { title: "Order ID", dataIndex: "OrderID", render: (text, record) => renderLink(`/order/${text}`, text) },
      { title: "Item", dataIndex: "ItemName" },
      { title: "Due Date", dataIndex: "PaymentDueDate", render: renderDate },
      { title: "Balance", dataIndex: "Balance" },
      {
        title: "Payment",
        render: (text, record) => <UpdateBalanceRow {...props} record={record} />
      }
    ]}
    dataSource={props.allocatedItems}
  />
)
