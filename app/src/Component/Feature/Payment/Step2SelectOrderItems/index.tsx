import React, { useState } from "react"
import { Button } from "antd"
import { findDueDatesByItemsSummary } from "~/ApiServices/BizApi/query/queryIf"
import { addOrderItemsToPay } from "~/ApiServices/Service/PaymentService"
import { LookupModal } from "~/Component/Common/Modal/LookupModal/LookupModal"
import { renderDate, renderLink } from "~/Component/Common/ResponsiveTable"
import { IApiResponse } from "@packages/api/lib/utils/Interfaces"
import { OrderItemsSearchMetaForPayment } from "~/Component/Feature/Payment/Step2SelectOrderItems/OrderItemsSearchMetaForPayment"
import { FormInstance } from "antd/lib/form"
import { searchPersons } from "~/ApiServices/BizApi/person/personIF"
import { OrderItemsView } from "~/Component/Feature/Payment/Step2SelectOrderItems/OrderItemsView"
import { AllocationItemsView } from "~/Component/Feature/Payment/Step2SelectOrderItems/AllocationItemsView"

export const Step2SelectOrderItems = (props: {
  PersonID?: number
  totalBalance: number
  totalPayment: number
  selectedOrderItems: any
  allocatedItems: any
  setSelectedOrderItems: (Params: any[]) => void
  setTotalBalance: (balance: number) => void
  setTotalPayment: (payment: number) => void
  setAllocatedItems: (Params: any[]) => void
  PersonFormInstance: FormInstance
  setSelectedPayer: (Params: any) => void
  setDefaultPersonID: (PersonID: number) => void
}) => {
  const [orderItemView, setOrderItemView] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [loading, setLoading] = useState(false)
  const [selectePaymentAmountType, setSelectePaymentAmountType] = useState<any>("full_amount")

  const __addOrderItemsToPay = (___: any[]): Promise<IApiResponse> => {
    if (___.length > 0) {
      setLoading(true)
      return addOrderItemsToPay({ OrderItemIDs: ___.map((x) => x.OrderItemID) }).then((response) => {
        if (response.success && response.data && response.data.Allocation && Array.isArray(response.data.Allocation)) {
          props.setAllocatedItems(response.data.Allocation)
          const temp = ___.filter((x) => response.data.Allocation.find((a: any) => a.OrderItemID === x.OrderItemID))
          props.setSelectedOrderItems(temp)
          props.setTotalBalance(response.data.Allocation.reduce((acc: number, curr: any) => acc + curr.Balance, 0))
          props.setTotalPayment(response.data.Allocation.reduce((acc: number, curr: any) => acc + curr.Amount, 0))

          setLoading(false)
        }
        return response
      })
    }
    props.setAllocatedItems([])
    props.setSelectedOrderItems([])

    return Promise.resolve({ code: 200, success: true, error: false, data: "" })
  }

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          {props.selectedOrderItems && props.selectedOrderItems.length > 0 && orderItemView && (
            <Button
              type="primary"
              onClick={() => {
                setOrderItemView(false)
              }}
            >
              Switch to Line Items View
            </Button>
          )}
          {props.selectedOrderItems && props.selectedOrderItems.length > 0 && !orderItemView && (
            <Button
              type="primary"
              onClick={() => {
                setOrderItemView(true)
              }}
            >
              Switch to Order Items View
            </Button>
          )}
        </div>
        <div>
          <Button onClick={() => setShowModal(true)}>Add Order Items</Button>
        </div>
      </div>
      {orderItemView && (
        <OrderItemsView
          {...props}
          loading={loading}
          setLoading={setLoading}
          selectePaymentAmountType={selectePaymentAmountType}
          setSelectePaymentAmountType={setSelectePaymentAmountType}
        />
      )}
      {!orderItemView && (
        <AllocationItemsView
          {...props}
          loading={loading}
          setLoading={setLoading}
          selectePaymentAmountType={selectePaymentAmountType}
          setSelectePaymentAmountType={setSelectePaymentAmountType}
        />
      )}
      {showModal && (
        <LookupModal
          title="Select Order Items to Pay"
          meta={OrderItemsSearchMetaForPayment}
          metaName=""
          closeModal={(items?: any[]) => {
            setShowModal(false)
            if (items && items.length > 0) {
              __addOrderItemsToPay(items)
              props.PersonFormInstance.setFieldsValue({ PersonID: items[0].PersonID })
              searchPersons({ PersonID: items[0].PersonID }).then((response) => {
                if (response.success) {
                  props.setSelectedPayer(response.data[0])
                  props.setDefaultPersonID(items[0].PersonID)
                }
              })
            }
          }}
          searchFunc={findDueDatesByItemsSummary}
          isArray={true}
          columns={[
            { title: "Order ID", dataIndex: "OrderID", render: (text, record) => renderLink(`/order/${text}`, text) },
            { title: "Item", dataIndex: "ItemName" },
            { title: "Due Date", dataIndex: "PaymentDueDate", render: renderDate },
            { title: "Balance", dataIndex: "Balance" }
          ]}
          {...(props.PersonID && { initialFormValue: { PersonID: props.PersonID } })}
          defaultFormValue={{ BalanceMoreThan: 0 }}
        />
      )}
    </>
  )
}
