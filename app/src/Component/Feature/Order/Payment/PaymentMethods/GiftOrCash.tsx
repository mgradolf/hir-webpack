import { Form } from "antd"
import { FormInstance } from "antd/lib/form"
import React from "react"
import { FormInput } from "~/Component/Common/Form/FormInput"
import { FormTextArea } from "~/Component/Common/Form/FormTextArea"

export const GiftOrCash = (props: { formInstance: FormInstance }) => {
  return (
    <Form
      form={props.formInstance}
      style={{
        maxHeight: "66vh",
        overflowY: "scroll"
      }}
    >
      <FormInput wrapperColSpan={18} formInstance={props.formInstance} fieldName="" label="Payment Type" disabled />
      <FormInput wrapperColSpan={18} formInstance={props.formInstance} fieldName="" label="Reference" />
      <FormTextArea wrapperColSpan={18} formInstance={props.formInstance} fieldName="" label="Notes" />
    </Form>
  )
}
