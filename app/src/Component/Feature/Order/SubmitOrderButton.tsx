import React, { useState } from "react"
import { Button, Col, Form, message, Row } from "antd"
import { CartModelFunctionality } from "~/Component/Feature/Order/Model/CartModelFunctionality"
import { IItemRequest } from "~/Component/Feature/Order/Model/Interface/IModel"
import { PaymentDueDate } from "~/Component/Feature/Order/PaymentDueDate"
import { OrderSubmittedConfirmationModal } from "~/Component/Feature/Order/OrderSubmittedConfirmationModal"
import { NO_PAYMENT } from "~/Pages/Manage/Financials/CreateOrderPage"

export const SubmitOrderButton = (props: {
  orderRequestInProgress: boolean
  disabled: boolean
  setOrderRequestInProgress: (flag: boolean) => void
  cartModelFunctionality: CartModelFunctionality
  itemList: IItemRequest[]
  setShowPaymentModal: (flag: boolean) => void
  selectedPayment: { [key: string]: any }
}) => {
  const [showModal, setShowModal] = useState(false)
  const [newRequestID, setNewRequestID] = useState<number>()
  const [paymentFormInstance] = Form.useForm()

  // const submitOrderWithPayment = () => {}

  const submitOrderWithNoPayment = () => {
    if (props.selectedPayment.PaymentTypeID === NO_PAYMENT.PaymentTypeID) {
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
    } else {
      props.setShowPaymentModal(true)
    }
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
          onClick={submitOrderWithNoPayment}
        >
          Submit Order
        </Button>
      </Col>
    </Row>
  )
}
