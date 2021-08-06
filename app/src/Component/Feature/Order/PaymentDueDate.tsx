import { DatePicker } from "antd"
import Form, { FormInstance } from "antd/lib/form"
import moment from "moment"
import React from "react"
import { CartModelFunctionality } from "~/Component/Feature/Order/Model/CartModelFunctionality"

export const PaymentDueDate = (props: {
  disabled: boolean
  formInstance: FormInstance
  cartModelFunctionality: CartModelFunctionality
}) => {
  return (
    <Form form={props.formInstance}>
      <Form.Item name="PaymentDueDate" label="Payment Due Date">
        <DatePicker
          disabled={props.disabled}
          defaultPickerValue={moment(Date.now())}
          onChange={(date, dateString) => {
            props.cartModelFunctionality.setPaymentDueDate(dateString)
          }}
        />
      </Form.Item>
    </Form>
  )
}
