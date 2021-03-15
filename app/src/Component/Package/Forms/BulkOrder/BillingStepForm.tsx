import React from "react"
import { Divider, Row, Col } from "antd"
import { FormInstance } from "antd/lib/form"
import { FormDatePicker } from "~/Component/Common/Form/FormDatePicker"
import { FormInput } from "~/Component/Common/Form/FormInput"
import { FormDropDown } from "~/Component/Common/Form/FormDropDown"
import { findPersonsByAccount } from "~/ApiServices/Service/PersonService"
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
        />
        <FormDatePicker
          {...layout}
          label={"Due Date"}
          formInstance={props.formInstance}
          aria-label="Due Date"
          placeholder="YYYY/MM/DD"
          fieldName="PaymentDueDate"
          defaultValue={props.formInstance.getFieldValue("PaymentDueDate")}
        />
      </Col>
      <Col xs={24} sm={24} md={12}>
        <FormInput
          {...layout}
          formInstance={props.formInstance}
          label={"PO Number"}
          ariaLabel={"PO Number"}
          fieldName={"PONumber"}
        />
        <FormInput
          {...layout}
          formInstance={props.formInstance}
          label={"Amount"}
          ariaLabel={"Amount"}
          fieldName={"POAmount"}
        />
      </Col>
    </Row>
  )
}
