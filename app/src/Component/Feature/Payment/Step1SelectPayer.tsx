import React, { useEffect, useState } from "react"
import { FormInstance } from "antd/lib/form"
import { Form } from "antd"
import { PersonLookup } from "~/Component/Common/Form/FormLookupFields/PersonLookup"
import { PersonFormOpenButton } from "~/Component/Feature/Person/Forms/CreateEdit/PersonFormWithConfig"
import { findAccount } from "~/ApiServices/BizApi/account/accountIF"
import { AccountFormOpenButton } from "~/Component/Feature/Account/Forms/AccountFormWithConfig"

export const Step1SelectPayer = (props: {
  setSelectedPayer: (Params: { [key: string]: any }) => void
  formInstance: FormInstance
  defaultPersonID?: number
  selectedPayer?: any
  accountRequired?: boolean
}) => {
  const [help, setHelp] = useState<React.ReactNode>(null)
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

  const onSelectedItems = (Params: any[]) => {
    if (Params.length) {
      if (props.accountRequired) {
        findAccount({ PersonID: Params[0].PersonID }).then((response) => {
          if (response.success && response.data === "") {
            props.setSelectedPayer(Params[0])
            setHelp(
              <>
                Selected Purchaser does not have any account
                <AccountFormOpenButton
                  helpKey="createAccount"
                  label="Update Payer Account"
                  buttonProps={{ type: "link" }}
                  onSubmitSuccess={(account) => {
                    setHelp(null)
                    props.setSelectedPayer({ ...Params[0], ...account })
                  }}
                  initialValues={{
                    AllowToPayLater: "Not Allowed",
                    DefaultWaitlistPriority: 5,
                    PersonID: Params[0].PersonID
                  }}
                />
              </>
            )
          } else {
            props.setSelectedPayer({ ...Params[0], ...response.data })
            console.log({ ...Params[0], ...response.data })
          }
        })
      }
    } else props.setSelectedPayer([])
  }

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
        onSelectedItems={onSelectedItems}
        rules={[{ required: true, message: "Please Select a Payer" }]}
      />
    </Form>
  )
}
