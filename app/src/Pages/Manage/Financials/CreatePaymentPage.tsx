import { Col, Form, Row } from "antd"
import React, { useState } from "react"
import { RouteComponentProps } from "react-router-dom"
import { Step1SelectPayer } from "~/Component/Feature/Payment/Step1SelectPayer"
import { Step2SelectOrderItems } from "~/Component/Feature/Payment/Step2SelectOrderItems"
// import { Step3SetAllocation } from "~/Component/Feature/Payment/Step3SetAllocation"
import { Step4PaymentMethods } from "~/Component/Feature/Payment/Step4PaymentMethods"

export default function PaymentDetailsPage(props: RouteComponentProps<{ OrederID?: string; PersonID?: string }>) {
  const [selectedPayer, setSelectedPayer] = useState<{ [key: string]: any }>()
  const [defaultPersonID, setDefaultPersonID] = useState<number | undefined>()
  const [selectedOrderItems, setSelectedOrderItems] = useState<any[]>([])
  const [allocatedItems, setAllocatedItems] = useState<any[]>([])
  const [selectedPayment, setSelectedPayment] = useState<{ [key: string]: any }>()
  const [totalBalance, setTotalBalance] = useState(0)
  const [totalPayment, setTotalPayment] = useState(0)

  const [PersonFormInstance] = Form.useForm()
  const [PaymentFormInstance] = Form.useForm()
  return (
    <div className="site-layout-content">
      <div style={{ backgroundColor: "white", padding: "10px" }}>
        <Row justify="center">
          <Col span={18}>
            <Step1SelectPayer
              defaultPersonID={defaultPersonID}
              selectedPayer={selectedPayer}
              setSelectedPayer={setSelectedPayer}
              formInstance={PersonFormInstance}
            />
          </Col>
        </Row>
        <Row justify="center">
          <Col span={18}>
            <Step2SelectOrderItems
              PersonFormInstance={PersonFormInstance}
              setSelectedPayer={setSelectedPayer}
              setDefaultPersonID={setDefaultPersonID}
              allocatedItems={allocatedItems}
              selectedOrderItems={selectedOrderItems}
              totalBalance={totalBalance}
              setTotalBalance={setTotalBalance}
              totalPayment={totalPayment}
              setTotalPayment={setTotalPayment}
              setSelectedOrderItems={setSelectedOrderItems}
              setAllocatedItems={setAllocatedItems}
              {...(selectedPayer && { PersonID: selectedPayer.PersonID })}
            />
          </Col>
        </Row>
        {/* <Row justify="center">
          <Col span={18}><Step3SetAllocation formInstance={formInstance} /></Col>
        </Row> */}
        <Row justify="center">
          <Col span={18}>
            <Step4PaymentMethods
              selectedPayment={selectedPayment}
              setSelectedPayment={setSelectedPayment}
              formInstance={PaymentFormInstance}
              selectedPayer={selectedPayer}
              selectedOrderItems={selectedOrderItems}
              allocatedItems={allocatedItems}
              PersonFormInstance={PersonFormInstance}
              PaymentFormInstance={PaymentFormInstance}
              totalBalance={totalBalance}
              totalPayment={totalPayment}
            />
          </Col>
        </Row>
      </div>
    </div>
  )
}
