import React, { useState } from "react"
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

  const setBuyerCriteria = (PersonProfile: { [key: string]: any }) => {
    if (PersonProfile) {
      if (!(PersonProfile.Address && PersonProfile.EmailAddress && PersonProfile.TelephoneNumber)) {
        setHelp(
          <>
            Selected Buyer does not meet Buyer Criteria
            <PersonFormOpenButton
              disableRole={true}
              label="Update Buyer"
              buttonType="link"
              helpKey="createPerson"
              initialValues={{ ...PersonProfile, Roles: [3] }}
              onSubmit={(response) => {
                if (response.success) {
                  setHelp(null)
                  findAndSetAccount(PersonProfile)
                }
              }}
            />
          </>
        )
      } else {
        setHelp(null)
      }
    } else {
      setHelp(null)
    }
  }

  const setBuyerAccounCriteria = (Person: { [key: string]: any }) => {
    setHelp(
      <>
        Selected Purchaser does not have any account
        <AccountFormOpenButton
          helpKey="createAccount"
          label="Update Buyer Account"
          buttonProps={{ type: "link" }}
          onSubmitSuccess={(account) => {
            setHelp(null)
            props.cartModelFunctionality.assignPerson({ ...Person, ...account })
          }}
          initialValues={{
            AllowToPayLater: "Not Allowed",
            DefaultWaitlistPriority: 5,
            PersonID: Person.PersonID
          }}
        />
      </>
    )
  }

  const findAndSetAccount = (Person: any) => {
    findAccount({ PersonID: Person.PersonID }).then((response) => {
      if (response.success && response.data === "") {
        props.cartModelFunctionality.assignPerson(Person)
        setBuyerAccounCriteria(Person)
      } else {
        props.cartModelFunctionality.assignPerson({ ...Person, ...response.data })
        // console.log({ ...Person, ...response.data })
      }
    })
  }

  const onSelectedItems = (Params: any[]) => {
    if (Params.length && Params[0] && Params[0].PersonID) {
      setBuyerCriteria(Params[0])
      if (!help) {
        findAndSetAccount(Params[0])
      }
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
        rules={[{ required: true, message: "Please Select a Buyer" }]}
      />
    </Form>
  )
}
