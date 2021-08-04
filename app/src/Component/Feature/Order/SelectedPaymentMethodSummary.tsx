import { Button, Col } from "antd"
import React from "react"

export const SelectedPaymentMethodSummary = (props: {
  PaymentAmount: number
  PaymentMethodName: string
  setShowPaymentMethods: (flag: boolean) => void
}) => {
  return (
    <>
      <Col>
        Your total payment amount is {props.PaymentAmount} and you have chosen to pay by {props.PaymentMethodName}
      </Col>
      <Col>
        <Button danger onClick={() => props.setShowPaymentMethods(true)}>
          Cancel Selected Payment
        </Button>
      </Col>
    </>
  )
}
