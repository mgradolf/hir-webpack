import { Col, Form, Row } from "antd"
import React, { useState } from "react"
import { RouteComponentProps } from "react-router-dom"
import { Step1SelectPayer } from "~/Component/Feature/Payment/Step1SelectPayer"
import { Step2SelectOrderItems } from "~/Component/Feature/Payment/Step2SelectOrderItems"
// import { Step3SetAllocation } from "~/Component/Feature/Payment/Step3SetAllocation"
import { Step4PaymentMethods } from "~/Component/Feature/Payment/Step4PaymentMethods"

export default function PaymentDetailsPage(props: RouteComponentProps<{ OrederID?: string; PersonID?: string }>) {
  const [selectedPayer, setSelectedPayer] = useState<{ [key: string]: any }>()
  const [selectedOrderItems, setSelectedOrderItems] = useState<any[]>([])
  const [allocatedItems, setAllocatedItems] = useState<any[]>([])
  const [selectedPayment, setSelectedPayment] = useState<{ [key: string]: any }>()

  const [PersonFormInstance] = Form.useForm()
  const [PaymentFormInstance] = Form.useForm()
  return (
    <div className="site-layout-content">
      <div style={{ backgroundColor: "white", padding: "10px" }}>
        <Row justify="center">
          <Col span={18}>
            <Step1SelectPayer setSelectedPayer={setSelectedPayer} formInstance={PersonFormInstance} />
          </Col>
        </Row>
        <Row justify="center">
          <Col span={18}>
            <Step2SelectOrderItems
              // selectedOrderItems={selectedOrderItems}
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
            />
          </Col>
        </Row>
      </div>
    </div>
  )
}
