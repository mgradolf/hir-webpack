import React from "react"
import { Divider, Row, Col } from "antd"
import { FormInstance } from "antd/lib/form"
import { FormDatePicker } from "~/Component/Common/Form/FormDatePicker"
import { FormDropDown } from "~/Component/Common/Form/FormDropDown"
import { findPersonsByAccount } from "~/ApiServices/Service/PersonService"
import { FormNumberInput } from "~/Component/Common/Form/FormNumberInput"
import "~/Sass/utils.scss"

interface IBillingStepFormProps {
  formInstance: FormInstance
  initialValue: { [key: string]: any }
}

const layout = {
  labelColSpan: 8,
  wrapperColSpan: 14
}

export default function BillingStepForm(props: IBillingStepFormProps) {
  return (
    <Row>
      <Divider orientation="left">Purchase Order</Divider>
      <Col xs={24} sm={24} md={12}>
        <FormDropDown
          {...layout}
          formInstance={props.formInstance}
          label={"Purchaser"}
          ariaLabel={"Purchaser"}
          fieldName="PurchaserID"
          refLookupService={() => findPersonsByAccount({ AccountID: props.initialValue.AccountID })}
          displayKey="FormattedName"
          valueKey="PersonID"
          rules={[{ required: true, message: "Please select purchaser!" }]}
        />
        <FormDatePicker
          {...layout}
          label={"Due Date"}
          formInstance={props.formInstance}
          aria-label="Due Date"
          placeholder="YYYY/MM/DD"
          fieldName="PaymentDueDate"
          defaultValue={props.formInstance.getFieldValue("PaymentDueDate")}
          rules={[{ required: true, message: "Pick due date!" }]}
        />
      </Col>
      <Col xs={24} sm={24} md={12}>
        <FormNumberInput
          {...layout}
          formInstance={props.formInstance}
          label={"PO Number"}
          ariaLabel={"PO Number"}
          fieldName={"PONumber"}
          rules={[{ required: true, message: "Please enter PO Number!" }]}
        />
        <FormNumberInput
          {...layout}
          formInstance={props.formInstance}
          label={"Amount"}
          ariaLabel={"Amount"}
          fieldName={"POAmount"}
          rules={[{ required: true, message: "Please enter Amount!" }]}
        />
      </Col>
    </Row>
  )
}
