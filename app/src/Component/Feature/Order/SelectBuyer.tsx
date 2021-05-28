import React, { useEffect, useState } from "react"
import { Form } from "antd"
import { PersonLookup } from "~/Component/Common/Form/FormLookupFields/PersonLookup"
import { PersonFormOpenButton } from "~/Component/Feature/Person/Forms/CreateEdit/PersonFormWithConfig"
import { findAccount } from "~/ApiServices/BizApi/account/accountIF"
import { AccountFormOpenButton } from "~/Component/Feature/Account/Forms/AccountFormWithConfig"
import { CartModel } from "~/Component/Feature/Order/Model/CartModel"

export const SelectBuyer = (props: {
  cartModelState: CartModel
  setCartModelState: (model: CartModel) => void
  defaultPersonID?: number
}) => {
  const [PersonFormInstance] = Form.useForm()
  const [help, setHelp] = useState<React.ReactNode>(null)
  useEffect(() => {
    if (props.cartModelState.PersonProfile) {
      if (
        !props.cartModelState.PersonProfile.Address ||
        !props.cartModelState.PersonProfile.EmailAddress ||
        !props.cartModelState.PersonProfile.TelephoneNumber
      ) {
        setHelp(
          <>
            Selected Payer does not meet Payer Criteria{" "}
            <PersonFormOpenButton
              label="Update Payer"
              buttonType="link"
              helpKey="createPerson"
              initialValues={{ ...props.cartModelState.PersonProfile, Roles: [3] }}
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
  }, [props.cartModelState.PersonProfile])

  const onSelectedItems = (Params: any[]) => {
    if (Params.length) {
      findAccount({ PersonID: Params[0].PersonID }).then((response) => {
        if (response.success && response.data === "") {
          props.cartModelState.assignPerson(Params[0])
          setHelp(
            <>
              Selected Purchaser does not have any account
              <AccountFormOpenButton
                helpKey="createAccount"
                label="Update Payer Account"
                buttonProps={{ type: "link" }}
                onSubmitSuccess={(account) => {
                  setHelp(null)
                  props.cartModelState.assignPerson({ ...Params[0], ...account })
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
          props.cartModelState.assignPerson({ ...Params[0], ...response.data })
          console.log({ ...Params[0], ...response.data })
        }
      })
    } else props.cartModelState.assignPerson()
  }

  return (
    <Form form={PersonFormInstance}>
      <PersonLookup
        labelColSpan={6}
        wrapperColSpan={18}
        help={help}
        label="Select Payer"
        fieldName="PersonID"
        defaultValue={props.defaultPersonID}
        formInstance={PersonFormInstance}
        onSelectedItems={onSelectedItems}
        rules={[{ required: true, message: "Please Select a Payer" }]}
      />
    </Form>
  )
}
