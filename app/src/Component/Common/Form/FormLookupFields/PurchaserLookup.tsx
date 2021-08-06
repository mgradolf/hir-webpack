import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Col, Row } from "antd"
import { PersonLookup } from "~/Component/Common/Form/FormLookupFields/PersonLookup"
import { PersonFormOpenButton } from "~/Component/Feature/Person/Forms/CreateEdit/PersonFormWithConfig"
import { findAccount } from "~/ApiServices/BizApi/account/accountIF"
import { IGeneratedField } from "~/Component/Common/Form/common"

export const PurchaserLookup = (props: IGeneratedField) => {
  // const [PersonFormInstance] = Form.useForm()
  const [help, setHelp] = useState<React.ReactNode>(null)
  const [defaultPersonIDLocalState, setDefaultPersonIDLocalState] = useState<number>()

  useEffect(() => {
    if (props.defaultValue) {
      setDefaultPersonIDLocalState(props.defaultValue)
      props.formInstance.setFieldsValue({ [props.fieldName]: props.defaultValue })
    } else {
      props.formInstance.setFieldsValue({ [props.fieldName]: undefined })
    }
    // eslint-disable-next-line
  }, [props.defaultValue])

  const setBuyerCriteria = (PersonProfile: { [key: string]: any }, AccountExist = true): boolean => {
    let buyerCriteriaFulfilled = true
    if (PersonProfile) {
      if (!(PersonProfile.Address && PersonProfile.EmailAddress && PersonProfile.TelephoneNumber) || !AccountExist) {
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
                  // setDefaultPersonIDLocalState(PersonProfile.PersonID)
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

  const findAndSetAccount = (Person: any) => {
    findAccount({ PersonID: Person.PersonID }).then((response) => {
      if (response.success && response.data === "") {
        setBuyerCriteria(Person, false)
      } else {
        // props.cartModelFunctionality.assignPerson({ ...Person, ...response.data })
        props.onSelectedItems && props.onSelectedItems({ ...Person, ...response.data })
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
    setHelp(null)
    if (Params.length && Params[0] && Params[0].PersonID) {
      const buyerCriteriaFulfilled = setBuyerCriteria(Params[0])
      if (buyerCriteriaFulfilled) {
        findAndSetAccount(Params[0])
      }
    } else {
      props.onSelectedItems && props.onSelectedItems({})
    }
  }

  return (
    <Row justify="start" gutter={4}>
      <Col span={21}>
        <PersonLookup
          {...props}
          labelColSpan={7}
          wrapperColSpan={17}
          help={help}
          defaultValue={defaultPersonIDLocalState}
          onSelectedItems={onSelectedItems}
          rules={[{ required: true }]}
        />
      </Col>
      <Col span={3}>
        <PersonFormOpenButton
          disableRole
          disableRedirect
          label={`Create New ${props.label}`}
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
  )
}
