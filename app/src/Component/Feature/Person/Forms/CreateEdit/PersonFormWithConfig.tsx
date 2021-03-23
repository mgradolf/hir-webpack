import React, { useEffect, useState } from "react"
import { Row, Col } from "antd"
import Form, { FormInstance } from "antd/lib/form"
import { IPersonFieldNames } from "~/Component/Feature/Person/Interfaces"
import { createPersonRecordInRoles } from "~/ApiServices/Service/PersonService"
import { ISimplifiedApiErrorMessage } from "@packages/api/lib/utils/HandleResponse/ProcessedApiError"
import { FormMultipleCheckbox } from "~/Component/Common/Form/FormMultipleCheckbox"
import { CustomFormModalOpenButton } from "~/Component/Common/Modal/FormModal/CustomFormModalOpenButton"
import { FormInput } from "~/Component/Common/Form/FormInput"
import { FormDatePicker } from "~/Component/Common/Form/FormDatePicker"
import { SearchRegion } from "~/Component/Common/Form/CustomFormFields/SearchRegion"
import { findDefaultCountry } from "~/ApiServices/BizApi/person/addressBookIF"
import { CustomFormConfigHook } from "~/Component/Common/Form/FormMetaShadowingProcessor"

interface IPersonFormProps {
  editMode: boolean
  formInstance: FormInstance
}

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 14 }
}

const rolesOption = [
  { label: "Student", value: 1 },
  { label: "Instructor", value: 2 },
  { label: "Purchaser", value: 3 }
]

const fieldNames: IPersonFieldNames = {
  Roles: "Roles",
  FirstName: "FirstName",
  LastName: "LastName",
  Birthday: "Birthday",
  EmailAddress: "EmailAddress",
  TelephoneNumber: "TelephoneNumber",
  AddressLine1: "AddressLine1",
  AddressLine2: "AddressLine2",
  AddressLine3: "AddressLine3",
  Locality: "Locality",
  PostalCode: "PostalCode",
  RegionCodeID: "RegionCodeID",
  CountryCodeID: "CountryCodeID"
}

function PersonForm(props: IPersonFormProps) {
  const [defaultCountryCodeID, setdefaultCountryCodeID] = useState()
  const [addressline1Required, setAddressline1Required] = useState(false)
  const PersonformConfig: IPersonFieldNames = CustomFormConfigHook(
    fieldNames,
    "PersonFormWithConfig"
  ) as IPersonFieldNames

  useEffect(() => {
    findDefaultCountry().then((result) => {
      if (result.success && result.data) {
        setdefaultCountryCodeID(result.data.CountryID)
      }
    })
  }, [])
  return (
    <>
      <Row>
        <Col xs={24} sm={24} md={12}>
          <FormMultipleCheckbox
            label={"Roles"}
            formInstance={props.formInstance}
            options={rolesOption}
            onChangeCallback={(items: number[]) => {
              if (items.includes(3)) {
                // 3 means instructor is selected, so address line 1 is required now
                setAddressline1Required(true)
              } else {
                setAddressline1Required(false)
              }
            }}
            fieldName="Roles"
            {...PersonformConfig.Roles}
          />
        </Col>
      </Row>
      <Row>
        <Col xs={24} sm={24} md={12}>
          <FormInput
            {...layout}
            formInstance={props.formInstance}
            defaultValue={{}}
            label={"First Name"}
            ariaLabel={"Frist Name"}
            fieldName="FirstName"
            {...PersonformConfig.FirstName}
            rules={[{ required: true, message: "Please enter first name!" }]}
          />

          <FormInput
            {...layout}
            formInstance={props.formInstance}
            label={"Last Name"}
            ariaLabel={"Last Name"}
            fieldName="LastName"
            {...PersonformConfig.LastName}
            rules={[{ required: true, message: "Please enter last name!" }]}
          />

          <FormDatePicker
            label={"Date Of Birth"}
            formInstance={props.formInstance}
            {...layout}
            aria-label="Pick BirthDate"
            placeholder="YYYY/MM/DD"
            fieldName="Birthday"
            {...PersonformConfig.Birthday}
          />

          <FormInput
            {...layout}
            formInstance={props.formInstance}
            label={"Email Address"}
            ariaLabel={"Email Address"}
            fieldName="EmailAddress"
            {...PersonformConfig.EmailAddress}
            rules={[{ required: true, message: "Please enter valid email address!", type: "email" }]}
          />

          <FormInput
            {...layout}
            formInstance={props.formInstance}
            label={"Telephone"}
            ariaLabel={"Telephone"}
            fieldName="TelephoneNumber"
            {...PersonformConfig.TelephoneNumber}
          />
        </Col>

        <Col xs={24} sm={24} md={12}>
          <FormInput
            {...layout}
            formInstance={props.formInstance}
            label={"Address Line 1"}
            ariaLabel={"Address Line 1"}
            fieldName="AddressLine1"
            {...PersonformConfig.AddressLine1}
            {...(addressline1Required && { rules: [{ required: true, message: "Address Line 1 is required" }] })}
          />

          <FormInput
            {...layout}
            formInstance={props.formInstance}
            label={"Address Line 2"}
            ariaLabel={"Address Line 2"}
            fieldName="AddressLine2"
            {...PersonformConfig.AddressLine2}
          />

          <FormInput
            {...layout}
            formInstance={props.formInstance}
            label={"Address Line 3"}
            ariaLabel={"Address Line 3"}
            fieldName="AddressLine3"
            {...PersonformConfig.AddressLine3}
          />

          <FormInput
            {...layout}
            formInstance={props.formInstance}
            label={"City"}
            ariaLabel={"City"}
            fieldName="Locality"
            {...PersonformConfig.Locality}
          />

          <FormInput
            {...layout}
            formInstance={props.formInstance}
            label={"Postal Code"}
            ariaLabel={"Postal Code"}
            fieldName="PostalCode"
            {...PersonformConfig.PostalCode}
          />

          <SearchRegion
            {...layout}
            label={"State/Province"}
            formInstance={props.formInstance}
            {...layout}
            defaultValue={defaultCountryCodeID}
            fieldName="RegionCodeID"
            {...PersonformConfig.RegionCodeID}
          />
        </Col>
      </Row>
    </>
  )
}

export function PersonFormOpenButton(props: { initialValues?: { [key: string]: any }; label?: string }) {
  const [formInstance] = Form.useForm()
  const [showModal, setShowModal] = useState(false)
  const [apiCallInProgress, setApiCallInProgress] = useState(false)
  // const [loading, setLoading] = useState(false)
  const [loading] = useState(false)
  const [errorMessages, setErrorMessages] = useState<Array<ISimplifiedApiErrorMessage>>([])
  const [initialValues] = useState<{ [key: string]: any }>(props.initialValues || {})

  const onFormSubmission = () => {
    formInstance.validateFields().then((x) => {
      const params = formInstance.getFieldsValue()
      setErrorMessages([])
      setApiCallInProgress(true)
      createPersonRecordInRoles(params)
        .then((response) => {
          console.log("validation passed ", response)
          setApiCallInProgress(false)
          if (response && response.success) {
            setShowModal(false)
          } else {
            console.log("validation failed ", response.error)
            setErrorMessages(response.error)
          }
        })
        .catch((y) => console.error(y))
    })
  }
  return (
    <CustomFormModalOpenButton
      formTitle={props.label ? props.label : "Create Person"}
      customForm={<PersonForm editMode={false} formInstance={formInstance} />}
      formInstance={formInstance}
      onFormSubmission={onFormSubmission}
      initialValues={initialValues}
      apiCallInProgress={apiCallInProgress}
      loading={loading}
      errorMessages={errorMessages}
      buttonLabel={`+ ${props.label ? props.label : "Create Person"}`}
      buttonProps={{ type: "primary" }}
      showModal={showModal}
      setShowModal={(show: boolean) => {
        if (!show) formInstance.resetFields()
        setShowModal(show)
      }}
    />
  )
}
