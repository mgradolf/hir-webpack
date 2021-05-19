import { IApiResponse } from "@packages/api/lib/utils/Interfaces"
import { Form, Input } from "antd"
import React, { useState } from "react"
import { IconButton } from "~/Component/Common/Form/Buttons/IconButton"
import { renderDate, renderLink, ResponsiveTable } from "~/Component/Common/ResponsiveTable"
import { SaveOutlined } from "@ant-design/icons"
import { generatePaymentAllocation } from "~/ApiServices/BizApi/payment/paymentIF"

const UpdateBalanceRow = (props: {
  setLoading: (flag: boolean) => void
  record: any
  selectePaymentAmountType?: string
  selectedOrderItems: any[]
  setSelectedOrderItems: (items: any[]) => void
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
            setValue(Number(event.target.value))
          }}
          {...(props.selectePaymentAmountType === "custom_amount" && {
            addonAfter: (
              <SaveOutlined
                onClick={() => {
                  props.setLoading(true)
                  console.log("generate allocatiion ", {
                    AllocationSource: 2,
                    OrderItemList: [props.record.OrderItemID],
                    TotalPaymentAmount: value
                  })
                  generatePaymentAllocation({
                    AllocationSource: 2,
                    OrderItemList: [props.record.OrderItemID],
                    TotalPaymentAmount: value
                  }).then((response) => {
                    props.setLoading(false)
                    if (
                      response.success &&
                      response.data &&
                      response.data.Allocation &&
                      Array.isArray(response.data.Allocation) &&
                      response.data.Allocation.length > 0
                    ) {
                      const __: any[] = props.allocatedItems.map((x) => {
                        if (x.OrderItemID === response.data.Allocation[0].OrderItemID) {
                          x.Amount = response.data.Allocation[0].Amount
                        }
                        return x
                      })
                      props.setAllocatedItems(__)
                      console.log("props.setAllocatedItems(__) ", __)
                      props.setTotalPayment(__.reduce((acc: any, curr: any) => acc + curr.Amount, 0))
                      console.log(
                        "props.setTotalBalance ",
                        __.reduce((acc: any, curr: any) => acc + curr.Amount, 0)
                      )
                    }
                  })
                }}
              />
            )
          })}
        />
      </Form.Item>
    </>
  )
}

export const OrderItemsTableForPayment = (props: {
  PersonID?: number
  totalBalance: number
  selectedOrderItems: any
  allocatedItems: any
  setSelectedOrderItems: (Params: any[]) => void
  setTotalBalance: (balance: number) => void
  setAllocatedItems: (Params: any[]) => void
  loading: boolean
  setLoading: (flag: boolean) => void
  selectePaymentAmountType: any
  __addOrderItemsToPay: (___: any[]) => Promise<IApiResponse>
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
      },
      {
        title: "Action",
        render: (text, record) => (
          <IconButton
            iconType="remove"
            toolTip="Remove Item"
            onClickRemove={() => {
              const __ = props.selectedOrderItems.filter((x: any) => x.OrderItemID !== record.OrderItemID)
              return props.__addOrderItemsToPay(__).then((response) => {
                if (response.success)
                  props.setTotalBalance(__.reduce((acc: number, curr: any) => acc + curr.Balance, 0))
                return response
              })
            }}
          />
        )
      }
    ]}
    dataSource={props.selectedOrderItems}
  />
)
