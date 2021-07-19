import React, { useEffect, useState } from "react"
import { Col, Form, Row } from "antd"
import { PersonLookup } from "~/Component/Common/Form/FormLookupFields/PersonLookup"
import { PersonFormOpenButton } from "~/Component/Feature/Person/Forms/CreateEdit/PersonFormWithConfig"
import { findAccount } from "~/ApiServices/BizApi/account/accountIF"
// import { AccountFormOpenButton } from "~/Component/Feature/Account/Forms/AccountFormWithConfig"
import { CartModelFunctionality } from "~/Component/Feature/Order/Model/CartModelFunctionality"
import { IBuyer } from "~/Component/Feature/Order/Model/Interface/IModel"
import { Link } from "react-router-dom"
import { getOrCreateAccountForPurchaser } from "~/ApiServices/Service/AccountService"

export const SelectBuyer = (props: { buyer: IBuyer; cartModelFunctionality: CartModelFunctionality }) => {
  const [PersonFormInstance] = Form.useForm()
  const [help, setHelp] = useState<React.ReactNode>(null)
  const [defaultPersonIDLocalState, setDefaultPersonIDLocalState] = useState<number>()

  useEffect(() => {
    if (props.buyer && props.buyer.PersonID) setDefaultPersonIDLocalState(props.buyer.PersonID)
  }, [props.buyer])

  const setBuyerCriteria = (PersonProfile: { [key: string]: any }): boolean => {
    let buyerCriteriaFulfilled = true
    if (PersonProfile) {
      if (!(PersonProfile.Address && PersonProfile.EmailAddress && PersonProfile.TelephoneNumber)) {
        buyerCriteriaFulfilled = false
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
                  setDefaultPersonIDLocalState(PersonProfile.PersonID)
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
    return buyerCriteriaFulfilled
  }

  // const setBuyerAccounCriteria = (Person: { [key: string]: any }) => {
  //   setHelp(
  //     <>
  //       Selected Purchaser does not have any account
  //       <AccountFormOpenButton
  //         helpKey="createAccount"
  //         label="Update Buyer Account"
  //         buttonProps={{ type: "link" }}
  //         onSubmitSuccess={(account) => {
  //           setHelp(null)
  //           props.cartModelFunctionality.assignPerson({ ...Person, ...account })
  //         }}
  //         initialValues={{
  //           AllowToPayLater: "Not Allowed",
  //           DefaultWaitlistPriority: 5,
  //           PersonID: Person.PersonID
  //         }}
  //       />
  //     </>
  //   )
  // }

  const findAndSetAccount = (Person: any) => {
    findAccount({ PersonID: Person.PersonID }).then((response) => {
      if (response.success && response.data === "") {
        props.cartModelFunctionality.assignPerson(Person)
        // setBuyerAccounCriteria(Person)
        // TODO call personal account create api for this person
        getOrCreateAccountForPurchaser({
          PurchaserPersonID: Person.PersonID
        }).then((response) => {
          if (response.success) {
            setHelp(
              <>
                <Link target="_blank" to={`/account/${response.data.AccountID}`}>
                  {response.data.PersonName}
                </Link>{" "}
                has a Personal Account
              </>
            )
          }
        })
      } else {
        props.cartModelFunctionality.assignPerson({ ...Person, ...response.data })
        setHelp(
          <>
            <Link target="_blank" to={`/account/${response.data.AccountID}`}>
              {response.data.AccountDescriptor}
            </Link>{" "}
            has an {response.data.TypeName}
          </>
        )
      }
    })
  }

  const onSelectedItems = (Params: any[]) => {
    if (Params.length && Params[0] && Params[0].PersonID) {
      const buyerCriteriaFulfilled = setBuyerCriteria(Params[0])
      if (buyerCriteriaFulfilled) {
        findAndSetAccount(Params[0])
      }
    } else {
      props.cartModelFunctionality.assignPerson()
      setHelp(null)
    }
  }

  return (
    <Form form={PersonFormInstance}>
      <Row gutter={6}>
        <Col span={20}>
          <PersonLookup
            labelColSpan={6}
            wrapperColSpan={18}
            help={help}
            label="Select Buyer"
            fieldName="PersonID"
            defaultValue={defaultPersonIDLocalState}
            formInstance={PersonFormInstance}
            onSelectedItems={onSelectedItems}
            rules={[{ required: true, message: "Please Select a Buyer" }]}
          />
        </Col>
        <Col span={4}>
          <PersonFormOpenButton
            disableRole
            disableRedirect
            label="Create New Buyer"
            buttonIcon="create"
            buttonType="link"
            helpKey="createPerson"
            initialValues={{ Roles: [3] }}
            onSubmit={(response) => {
              if (response.success) {
                setHelp(null)
                setDefaultPersonIDLocalState(response.data.PersonID)
                findAndSetAccount(response.data)
              }
              console.log("response on submit ", response)
            }}
          />
        </Col>
      </Row>
    </Form>
  )
}
