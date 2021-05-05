import React from "react"
import { FormInstance } from "antd/lib/form"
import { Form } from "antd"
import { PersonLookup } from "~/Component/Common/Form/FormLookupFields/PersonLookup"

export const Step1SelectPayer = (props: {
  setSelectedPayer: (Params: { [key: string]: any }) => void
  formInstance: FormInstance
}) => {
  return (
    <Form form={props.formInstance}>
      <PersonLookup
        labelColSpan={6}
        wrapperColSpan={18}
        label="Select Payer"
        fieldName="PersonID"
        formInstance={props.formInstance}
        onSelectedItems={(Params: any[]) => {
          console.log("Params ", Params)
          if (Params.length) props.setSelectedPayer(Params[0])
          else props.setSelectedPayer([])
        }}
        rules={[{ required: true, message: "Please Select a Payer" }]}
      />
    </Form>
  )
}
