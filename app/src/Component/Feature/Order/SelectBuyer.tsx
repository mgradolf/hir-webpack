import React, { useEffect, useState } from "react"
import { Form } from "antd"
import { PersonLookup } from "~/Component/Common/Form/FormLookupFields/PersonLookup"
import { PersonFormOpenButton } from "~/Component/Feature/Person/Forms/CreateEdit/PersonFormWithConfig"
import { findAccount } from "~/ApiServices/BizApi/account/accountIF"
import { AccountFormOpenButton } from "~/Component/Feature/Account/Forms/AccountFormWithConfig"
import { CartModelFunctionality } from "~/Component/Feature/Order/Model/CartModelFunctionality"
import { IBuyer } from "~/Component/Feature/Order/Model/Interface/IModel"

export const SelectBuyer = (props: {
  buyer: IBuyer
  cartModelFunctionality: CartModelFunctionality
  defaultPersonID?: number
}) => {
  const [PersonFormInstance] = Form.useForm()
  const [help, setHelp] = useState<React.ReactNode>(null)
  useEffect(() => {
    if (props.buyer.PersonProfile) {
      if (
        !props.buyer.PersonProfile.Address ||
        !props.buyer.PersonProfile.EmailAddress ||
        !props.buyer.PersonProfile.TelephoneNumber
      ) {
        setHelp(
          <>
            Selected Payer does not meet Payer Criteria{" "}
            <PersonFormOpenButton
              label="Update Payer"
              buttonType="link"
              helpKey="createPerson"
              initialValues={{ ...props.buyer.PersonProfile, Roles: [3] }}
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
  }, [props.buyer.PersonProfile])

  const onSelectedItems = (Params: any[]) => {
    if (Params.length) {
      findAccount({ PersonID: Params[0].PersonID }).then((response) => {
        if (response.success && response.data === "") {
          props.cartModelFunctionality.assignPerson(Params[0])
          setHelp(
            <>
              Selected Purchaser does not have any account
              <AccountFormOpenButton
                helpKey="createAccount"
                label="Update Payer Account"
                buttonProps={{ type: "link" }}
                onSubmitSuccess={(account) => {
                  setHelp(null)
                  props.cartModelFunctionality.assignPerson({ ...Params[0], ...account })
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
          props.cartModelFunctionality.assignPerson({ ...Params[0], ...response.data })
          console.log({ ...Params[0], ...response.data })
        }
      })
    } else props.cartModelFunctionality.assignPerson()
  }

  return (
    <Form form={PersonFormInstance}>
      <PersonLookup
        labelColSpan={6}
        wrapperColSpan={18}
        help={help}
        label="Select Buyer"
        fieldName="PersonID"
        defaultValue={props.defaultPersonID}
        formInstance={PersonFormInstance}
        onSelectedItems={onSelectedItems}
        rules={[{ required: true, message: "Please Select a Payer" }]}
      />
    </Form>
  )
}
