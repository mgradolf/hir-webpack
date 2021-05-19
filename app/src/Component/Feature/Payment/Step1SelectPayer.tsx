import React, { useEffect, useState } from "react"
import { FormInstance } from "antd/lib/form"
import { Form } from "antd"
import { PersonLookup } from "~/Component/Common/Form/FormLookupFields/PersonLookup"
import { PersonFormOpenButton } from "~/Component/Feature/Person/Forms/CreateEdit/PersonFormWithConfig"

export const Step1SelectPayer = (props: {
  setSelectedPayer: (Params: { [key: string]: any }) => void
  formInstance: FormInstance
  defaultPersonID?: number
  selectedPayer?: any
}) => {
  const [help, setHelp] = useState<React.ReactNode>()
  useEffect(() => {
    if (props.selectedPayer) {
      if (!props.selectedPayer.Address || !props.selectedPayer.EmailAddress || !props.selectedPayer.TelephoneNumber) {
        setHelp(
          <>
            Selected Payer does not meet Payer Criteria{" "}
            <PersonFormOpenButton
              label="Update Payer"
              buttonType="link"
              helpKey="createPerson"
              initialValues={{ ...props.selectedPayer, Roles: [3] }}
              onSubmit={(response) => {
                if (response.success) {
                  setHelp(null)
                }
              }}
            />
          </>
        )
      } else {
        setHelp(null)
      }
    }
  }, [props.selectedPayer])
  return (
    <Form form={props.formInstance}>
      <PersonLookup
        labelColSpan={6}
        wrapperColSpan={18}
        help={help}
        label="Select Payer"
        fieldName="PersonID"
        defaultValue={props.defaultPersonID}
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
