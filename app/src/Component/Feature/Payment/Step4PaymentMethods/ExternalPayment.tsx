import { Form } from "antd"
import { FormInstance } from "antd/lib/form"
import React from "react"
import { FormDatePicker } from "~/Component/Common/Form/FormDatePicker"
import { FormInput } from "~/Component/Common/Form/FormInput"
import { FormTextArea } from "~/Component/Common/Form/FormTextArea"

export const ExternalPayment = (props: { formInstance: FormInstance }) => {
  return (
    <Form form={props.formInstance}>
      <FormInput
        wrapperColSpan={18}
        formInstance={props.formInstance}
        fieldName=""
        defaultValue="External Payment"
        label="Payment Type"
        disabled
      />
      <FormDatePicker
        wrapperColSpan={18}
        formInstance={props.formInstance}
        fieldName="ExpirationDate"
        label="Expiration Time"
      />
      <FormTextArea wrapperColSpan={18} formInstance={props.formInstance} fieldName="PaymentNotes" label="Notes" />
    </Form>
  )
}
