import React, { useState } from "react"
import { Button, Col, Form, message, Row } from "antd"
import { CartModelFunctionality } from "~/Component/Feature/Order/Model/CartModelFunctionality"
import { IAllocation, IBuyer, IItemRequest, IRegistrationPromo } from "~/Component/Feature/Order/Model/Interface/IModel"
import { PaymentDueDate } from "~/Component/Feature/Order/PaymentDueDate"
import { OrderSubmittedConfirmationModal } from "~/Component/Feature/Order/OrderSubmittedConfirmationModal"
import { NO_PAYMENT } from "~/Pages/Manage/Financials/CreateOrderPage"
import { IRequestObject } from "~/Component/Feature/Order/Payment/PaymentObjectFactory/Interfaces"
import { launchRequest, launchRequestWithExternalPayment } from "~/ApiServices/Service/RequestService"
import { getAdjustFromCashPaymentRequestObject } from "~/Component/Feature/Order/Payment/PaymentObjectFactory/AdjustFromCash"
import { getGiftOrCashPaymentRequestObject } from "./Payment/PaymentObjectFactory/GiftOrCash"
import { getSavingsOrCheckPaymentRequestObject } from "./Payment/PaymentObjectFactory/SavingsOrCheck"
import { getExternalPaymentRequestObject } from "./Payment/PaymentObjectFactory/ExternalPayment"
import { getPORequestObject } from "~/Component/Feature/Order/Payment/PaymentObjectFactory/PO"

export const SubmitOrderButton = (props: {
  allocations?: IAllocation
  paymentFormValue: { [key: string]: any }
  orderRequestInProgress: boolean
  disabled: boolean
  setOrderRequestInProgress: (flag: boolean) => void
  cartModelFunctionality: CartModelFunctionality
  itemList: IItemRequest[]

  selectedPayment: { [key: string]: any }
  buyer: IBuyer
  promoCodes: IRegistrationPromo[]

  depositItems: any[]
  setSelectedPayment: (params: { [key: string]: any }) => void
}) => {
  const [showModal, setShowModal] = useState(false)
  const [newRequestID, setNewRequestID] = useState<number>()
  const [paymentFormInstance] = Form.useForm()

  const submitOrderWithPayment = () => {
    const handleResponse = (requestObject: IRequestObject | undefined) => {
      console.log(JSON.stringify(requestObject))
      if (requestObject)
        return (props.selectedPayment && props.selectedPayment.PaymentTypeID === 7
          ? launchRequestWithExternalPayment(requestObject)
          : launchRequest(requestObject)
        ).then((response) => {
          if (response && response.success) {
            props.cartModelFunctionality.removeCartItemRequest()
            setNewRequestID(response.data.RequestID)
            props.cartModelFunctionality.removeCartItemRequest()
            setShowModal(true)

            if (response.data.CurrentUrl) {
              window.open(response.data.CurrentUrl)
            }
          } else {
            message.error("Something went wrong! Order with Payment is not successful")
          }
        })
    }
    if (props.selectedPayment && props.allocations) {
      // eslint-disable-next-line
      let methodToGetPaymentRequestObject
      switch (props.selectedPayment.PaymentTypeID) {
        case 13:
          console.log("depositItems ", props.depositItems)
          if (!props.depositItems) message.warning("Select Deposit")
          else
            methodToGetPaymentRequestObject = getAdjustFromCashPaymentRequestObject({
              ...props,
              PaymentTypeID: props.selectedPayment.PaymentTypeID,
              depositItems: props.depositItems,
              requestComponentName: "OrderWithPayment"
            }).then(handleResponse)
          break
        case 11:
          methodToGetPaymentRequestObject = getGiftOrCashPaymentRequestObject({
            ...props,
            PaymentTypeID: props.selectedPayment.PaymentTypeID,
            requestComponentName: "OrderWithPayment"
          }).then(handleResponse)
          break
        case 4:
          methodToGetPaymentRequestObject = getGiftOrCashPaymentRequestObject({
            ...props,
            PaymentTypeID: props.selectedPayment.PaymentTypeID,
            requestComponentName: "OrderWithPayment"
          }).then(handleResponse)
          break
        case 1:
          methodToGetPaymentRequestObject = getSavingsOrCheckPaymentRequestObject({
            ...props,
            PaymentTypeID: props.selectedPayment.PaymentTypeID,
            requestComponentName: "OrderWithPayment"
          }).then(handleResponse)
          break
        case 0:
          methodToGetPaymentRequestObject = getSavingsOrCheckPaymentRequestObject({
            ...props,
            PaymentTypeID: props.selectedPayment.PaymentTypeID,
            requestComponentName: "OrderWithPayment"
          }).then(handleResponse)
          break
        case 7:
          methodToGetPaymentRequestObject = getExternalPaymentRequestObject({
            ...props,
            PaymentTypeID: props.selectedPayment.PaymentTypeID,
            requestComponentName: "OrderWithPayment"
          }).then(handleResponse)
          break
        case 1000:
          methodToGetPaymentRequestObject = getPORequestObject({
            ...props,
            PaymentTypeID: props.selectedPayment.PaymentTypeID,
            requestComponentName: "OrderWithPurchaseOrder"
          }).then(handleResponse)
          break
      }
    }
  }

  const submitOrderWithNoPayment = () => {
    paymentFormInstance.validateFields().then((response) => {
      let issueDoesNotExist = true
      props.itemList.forEach((x) => {
        issueDoesNotExist = issueDoesNotExist && props.cartModelFunctionality.findIssue(x)
      })
      if (!issueDoesNotExist) message.error("Please solve cart item issues first!")
      else {
        props.setOrderRequestInProgress(true)
        props.cartModelFunctionality.launchRequest().then((response) => {
          props.setOrderRequestInProgress(false)
          if (response.success) {
            setNewRequestID(response.data.RequestID)
            props.cartModelFunctionality.removeCartItemRequest()
            setShowModal(true)
          }
        })
      }
    })
  }
  return (
    <Row gutter={4}>
      <Col>
        <PaymentDueDate
          disabled={props.disabled}
          cartModelFunctionality={props.cartModelFunctionality}
          formInstance={paymentFormInstance}
        />
      </Col>
      {newRequestID && showModal && (
        <OrderSubmittedConfirmationModal newRequestID={newRequestID} setShowModal={setShowModal} />
      )}
      <Col>
        <Button
          disabled={props.disabled}
          loading={props.orderRequestInProgress}
          type="primary"
          onClick={
            props.selectedPayment.PaymentTypeID === NO_PAYMENT.PaymentTypeID
              ? submitOrderWithNoPayment
              : submitOrderWithPayment
          }
        >
          Submit Order
        </Button>
      </Col>
    </Row>
  )
}
