import { Button, Col, Row, Typography } from "antd"
import React from "react"

export const SelectedPaymentMethodSummary = (props: {
  PaymentAmount: number
  PaymentMethodName: string
  setShowPaymentMethods: (flag: boolean) => void
}) => {
  return (
    <Row justify="space-between">
      <Col>
        <Typography.Title level={1}>
          Your total payment amount is $450.00 and you have chosen to pay by External Payment
        </Typography.Title>
      </Col>
      <Col>
        <Button danger onClick={() => props.setShowPaymentMethods(false)}>
          Cancel Selected Payment
        </Button>
      </Col>
    </Row>
  )
}
