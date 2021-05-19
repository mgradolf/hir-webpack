import React from "react"
import { Form } from "antd"
import { FormInstance } from "antd/lib/form"
import { FormInput } from "~/Component/Common/Form/FormInput"
import { FormTextArea } from "~/Component/Common/Form/FormTextArea"

export const SavingsOrChecks = (props: { formInstance: FormInstance }) => {
  return (
    <Form form={props.formInstance}>
      <FormInput
        formInstance={props.formInstance}
        label="Check Number"
        fieldName="CheckNumber"
        rules={[{ required: true, message: "Please enter Check Number!" }]}
      />
      <FormInput
        formInstance={props.formInstance}
        label="Bank Name"
        fieldName="BankName"
        rules={[{ required: true, message: "Please enter Bank Name!" }]}
      />
      <FormInput
        formInstance={props.formInstance}
        label="Accouont Owner"
        fieldName="BankAccountName"
        rules={[{ required: true, message: "Please enter Accouont Owner!" }]}
      />
      <FormInput
        formInstance={props.formInstance}
        label="Account Number"
        fieldName="BankAccountNumber"
        rules={[{ required: true, message: "Please enter Account Number!" }]}
      />
      <FormInput
        formInstance={props.formInstance}
        label="Routing Number"
        fieldName="BankRoutingNumber"
        rules={[{ required: true, message: "Please enter Routing Number!" }]}
      />
      <FormTextArea formInstance={props.formInstance} label="Notes" fieldName="PaymentNotes" />
    </Form>
  )
}
