import React, { useEffect, useState } from "react"
import { Row, Col, message, Select } from "antd"
import Form, { FormInstance } from "antd/lib/form"
import { IPersonFieldNames } from "~/Component/Feature/Person/Interfaces"
import { canPushPerson, createPersonRecordInRoles, getRegions, pushPerson } from "~/ApiServices/Service/PersonService"
import { ISimplifiedApiErrorMessage } from "@packages/api/lib/utils/HandleResponse/ProcessedApiError"
import { FormMultipleCheckbox } from "~/Component/Common/Form/FormMultipleCheckbox"
import { CustomFormModalOpenButton } from "~/Component/Common/Modal/FormModal/CustomFormModalOpenButton"
import { FormInput } from "~/Component/Common/Form/FormInput"
import { FormDatePicker } from "~/Component/Common/Form/FormDatePicker"
import { findDefaultCountry } from "~/ApiServices/BizApi/person/addressBookIF"
import { CustomFormConfigHook } from "~/Component/Common/Form/FormMetaShadowingProcessor"
import { AFFILIATED_ORGANIZATION_ACCOUNT_TYPE_ID, CREATE_SUCCESSFULLY } from "~/utils/Constants"
import { showConfirm } from "~/Component/Common/Modal/Confirmation"
import { iconType } from "~/Component/Common/Form/Buttons/IconButton"
import { ButtonType } from "antd/lib/button"
import { IApiResponse } from "@packages/api/lib/utils/Interfaces"
import { getAccountTypes, getCountries } from "~/ApiServices/Service/RefLookupService"
import { Redirect } from "react-router"
import { FormMultipleRadio } from "~/Component/Common/Form/FormMultipleRadio"
import { FormDropDown } from "~/Component/Common/Form/FormDropDown"
import { findAccount, findAccountForLookUp } from "~/ApiServices/BizApi/account/accountIF"

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
  CountryCodeID: "CountryCodeID",
  AccountTypeID: "AccountTypeID",
  AccountID: "AccountID"
}

function PersonForm(props: {
  editMode: boolean
  formInstance: FormInstance
  Roles?: number[]
  disableRole?: boolean
  PersonID?: number
}) {
  const [defaultCountryCodeID, setDefaultCountryCodeID] = useState()
  const [emailIsRequired, setEmailIsRequired] = useState(false)
  const [addressline1Required, setAddressline1Required] = useState(false)
  const [telephoneIsRequired, setTelephoneIsRequired] = useState(false)
  const [cityIsRequired, setCityIsRequired] = useState(false)
  const [zipIsRequired, setZipIsRequired] = useState(false)
  const [stateIsRequired, setStateIsRequired] = useState(false)
  const [accountTypeIsRequired, setAccountTypeIsRequired] = useState(false)
  const [affiliateAccountIsRequired, setAffiliateAccountIsRequired] = useState(false)
  const [personAccountDoesNotExist, setPersonAccountDoesNotExist] = useState(true)
  const PersonformConfig: IPersonFieldNames = CustomFormConfigHook(
    fieldNames,
    "PersonFormWithConfig"
  ) as IPersonFieldNames

  const [countries, setCountries] = useState<any[]>([])
  const [regiondCodes, setRegiondCodes] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  const checkRoles = (items?: number[]) => {
    if ((props.Roles && props.Roles.includes(3)) || (items && items.includes(3))) {
      // 3 means Purchase is selected
      setAccountTypeIsRequired(true)
      setEmailIsRequired(true)
      setAddressline1Required(true)
      setTelephoneIsRequired(true)
      setCityIsRequired(true)
      setZipIsRequired(true)
      setStateIsRequired(true)
    } else {
      props.formInstance.setFields([
        { name: fieldNames.TelephoneNumber, errors: [] },
        { name: fieldNames.AddressLine1, errors: [] },
        { name: fieldNames.Locality, errors: [] },
        { name: fieldNames.RegionCodeID, errors: [] },
        { name: fieldNames.PostalCode, errors: [] }
      ])
      setAccountTypeIsRequired(false)
      setEmailIsRequired(false)
      setTelephoneIsRequired(false)
      setAddressline1Required(false)
      setCityIsRequired(false)
      setZipIsRequired(false)
      setStateIsRequired(false)
    }
  }

  useEffect(() => {
    checkRoles()
    if (props.PersonID) {
      findAccount({ PersonID: props.PersonID }).then((response) => {
        if (response.success && response.data && response.data.AccountID) {
          setPersonAccountDoesNotExist(false)
        }
      })
    }
    findDefaultCountry().then((result) => {
      if (result.success && result.data) {
        setDefaultCountryCodeID(result.data.CountryID)
        props.formInstance.setFieldsValue({
          CountryCodeID: result.data.CountryID
        })
      }
    })
    // eslint-disable-next-line
  }, [props.Roles])

  useEffect(() => {
    getCountries().then((x) => {
      if (x.success && Array.isArray(x.data)) {
        setCountries(x.data)
      }
    })
    // eslint-disable-next-line
  }, [defaultCountryCodeID])

  useEffect(() => {
    if (defaultCountryCodeID) {
      setLoading(true)
      getRegions({ CountryCodeID: defaultCountryCodeID }).then((x) => {
        if (x.success && Array.isArray(x.data)) setRegiondCodes(x.data)
        setLoading(false)
      })
    } else {
      setRegiondCodes([])
    }
  }, [defaultCountryCodeID])

  return (
    <>
      <Row>
        <Col xs={24} sm={24} md={12}>
          <FormMultipleCheckbox
            disabled={props.disableRole}
            label={"Roles"}
            formInstance={props.formInstance}
            options={rolesOption}
            onChangeCallback={(items: number[]) => checkRoles(items)}
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
            label={"First Name"}
            ariaLabel={"Frist Name"}
            fieldName="FirstName"
            maxLength="50"
            {...PersonformConfig.FirstName}
            rules={[{ required: true, message: "Please enter first name!" }]}
          />

          <FormInput
            {...layout}
            formInstance={props.formInstance}
            label={"Last Name"}
            ariaLabel={"Last Name"}
            fieldName="LastName"
            maxLength="50"
            {...PersonformConfig.LastName}
            rules={[{ required: true, message: "Please enter last name!" }]}
          />

          {personAccountDoesNotExist && (
            <>
              <FormMultipleRadio
                {...layout}
                formInstance={props.formInstance}
                label="Account Type"
                ariaLabel="Account Type"
                fieldName="AccountTypeID"
                displayKey="Name"
                valueKey="ID"
                refLookupService={getAccountTypes}
                disabled={!accountTypeIsRequired}
                {...PersonformConfig.AccountTypeID}
                onChangeCallback={(value: number) => {
                  if (value === AFFILIATED_ORGANIZATION_ACCOUNT_TYPE_ID) setAffiliateAccountIsRequired(true)
                  else {
                    setAffiliateAccountIsRequired(false)
                    props.formInstance.setFieldsValue({ [PersonformConfig.AccountID]: undefined })
                  }
                }}
                rules={[{ required: accountTypeIsRequired, message: "Please select Account Type!" }]}
              />
              <FormDropDown
                {...layout}
                formInstance={props.formInstance}
                label="Affiliated Account"
                ariaLabel="Affiliated Account"
                fieldName="AccountID"
                displayKey="AccountDescriptor"
                valueKey="AccountID"
                refLookupService={() =>
                  findAccountForLookUp({ AccountTypeID: AFFILIATED_ORGANIZATION_ACCOUNT_TYPE_ID })
                }
                disabled={!(accountTypeIsRequired && affiliateAccountIsRequired)}
                {...PersonformConfig.AccountID}
                rules={[{ required: affiliateAccountIsRequired, message: "Please select Affiliated Account!" }]}
              />{" "}
            </>
          )}

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
            label={"Email"}
            ariaLabel={"Email"}
            fieldName="EmailAddress"
            maxLength="255"
            {...PersonformConfig.EmailAddress}
            {...(emailIsRequired && {
              rules: [{ required: true, message: "Please enter valid Email!", type: "email" }]
            })}
          />

          <FormInput
            {...layout}
            formInstance={props.formInstance}
            label={"Telephone"}
            ariaLabel={"Telephone"}
            fieldName="TelephoneNumber"
            maxLength="32"
            {...(telephoneIsRequired && {
              rules: [{ required: true, message: "Please enter Telephone Number!" }]
            })}
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
            maxLength="128"
            {...PersonformConfig.AddressLine1}
            {...(addressline1Required && { rules: [{ required: true, message: "Address Line 1 is required" }] })}
          />

          <FormInput
            {...layout}
            formInstance={props.formInstance}
            label={"Address Line 2"}
            ariaLabel={"Address Line 2"}
            fieldName="AddressLine2"
            maxLength="128"
            {...PersonformConfig.AddressLine2}
          />

          <FormInput
            {...layout}
            formInstance={props.formInstance}
            label={"Address Line 3"}
            ariaLabel={"Address Line 3"}
            fieldName="AddressLine3"
            maxLength="128"
            {...PersonformConfig.AddressLine3}
          />

          <FormInput
            {...layout}
            formInstance={props.formInstance}
            label={"City"}
            ariaLabel={"City"}
            fieldName="Locality"
            maxLength="64"
            {...PersonformConfig.Locality}
            {...(cityIsRequired && { rules: [{ required: true, message: "City is required" }] })}
          />

          <Form.Item
            colon={false}
            name="RegionCodeID"
            label="State"
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 14 }}
            {...PersonformConfig.RegionCodeID}
            {...(stateIsRequired && { rules: [{ required: true, message: "State is required" }] })}
          >
            <Select
              showSearch
              filterOption={(inputValue, options) => {
                return !!(
                  options &&
                  typeof options.children === "string" &&
                  options.children.toLowerCase().startsWith(inputValue.toLowerCase())
                )
              }}
              allowClear={true}
              loading={loading}
              aria-label="Region Code"
            >
              {regiondCodes &&
                regiondCodes.map(({ ID, Description }, i) => (
                  <Select.Option value={ID} key={`${ID}_${i}`} children={Description} />
                ))}
            </Select>
          </Form.Item>

          <FormInput
            {...layout}
            formInstance={props.formInstance}
            label={"Postal Code"}
            ariaLabel={"Postal Code"}
            fieldName="PostalCode"
            maxLength="32"
            {...PersonformConfig.PostalCode}
            {...(zipIsRequired && { rules: [{ required: true, message: "Postal code is required" }] })}
          />

          <Form.Item
            colon={false}
            label="Country"
            name="CountryCodeID"
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 14 }}
            // rules={[{ required: true, message: "Please select country!" }]}
            {...PersonformConfig.CountryCodeID}
          >
            <Select
              showSearch
              filterOption={(inputValue, options) => {
                return !!(
                  options &&
                  typeof options.children === "string" &&
                  options.children.toLowerCase().startsWith(inputValue.toLowerCase())
                )
              }}
              allowClear={true}
              loading={loading}
              aria-label="Country Code"
              onChange={(value: any) => {
                setDefaultCountryCodeID(value)
                props.formInstance.setFieldsValue({ RegionCodeID: null })
              }}
            >
              {countries &&
                countries.map(({ Description, ID }) => (
                  <Select.Option value={ID} key={`${ID}_${Description}`} children={Description} />
                ))}
            </Select>
          </Form.Item>
        </Col>
      </Row>
    </>
  )
}

export function PersonFormOpenButton(props: {
  initialValues?: { [key: string]: any }
  label?: string
  buttonIcon?: iconType
  buttonType?: ButtonType
  helpKey?: string
  onSubmit?: (Params: IApiResponse) => void
  disableRole?: boolean
  disableRedirect?: boolean
}) {
  const [formInstance] = Form.useForm()
  const [apiCallInProgress, setApiCallInProgress] = useState(false)
  const [loading] = useState(false)
  const [errorMessages, setErrorMessages] = useState<Array<ISimplifiedApiErrorMessage>>([])
  const [redirectAfterCreate, setRedirectAfterCreate] = useState<string>()

  const redirect = (response: IApiResponse, closeModal: () => void) => {
    formInstance.resetFields()
    closeModal()
    if (!props.disableRedirect) setRedirectAfterCreate(`/person/${response.data.PersonID}`)
  }

  const onFormSubmission = async (closeModal: () => void) => {
    formInstance.validateFields().then((x) => {
      const params = formInstance.getFieldsValue()
      const createPerson = (): any =>
        createPersonRecordInRoles(params).then((response) => {
          setApiCallInProgress(false)
          if (response && response.success) {
            redirect(response, closeModal)
          } else {
            console.log("validation failed ", response.error)
            setErrorMessages(response.error)
          }
          props.onSubmit && props.onSubmit(response)
          return response
        })
      setErrorMessages([])
      setApiCallInProgress(true)
      if (props.initialValues && props.initialValues.PersonID && Object.keys(props.initialValues).length > 2)
        pushPerson({ ...params, PersonID: props.initialValues.PersonID }).then((response) => {
          setApiCallInProgress(false)
          if (response && response.success) {
            formInstance.resetFields()
            closeModal()
          } else {
            console.log("validation failed ", response.error)
            setErrorMessages(response.error)
          }
          props.onSubmit && props.onSubmit(response)
          return response
        })
      else
        canPushPerson(params).then((response) => {
          console.log("Response:", response)
          setApiCallInProgress(false)
          if (response && response.success) {
            if (response.data.IsDuplicate) {
              showConfirm(() => {
                setApiCallInProgress(true)
                return createPerson()
              })
            } else {
              setApiCallInProgress(true)
              createPersonRecordInRoles(params)
                .then((response) => {
                  console.log("validation passed ", response)
                  setApiCallInProgress(false)
                  props.onSubmit && props.onSubmit(response)
                  if (response && response.success) {
                    message.success(CREATE_SUCCESSFULLY)
                    redirect(response, closeModal)
                  } else {
                    console.log("validation failed ", response.error)
                    setErrorMessages(response.error)
                  }
                })
                .catch((y) => console.error(y))
            }
          }
        })
    })
  }
  return (
    <>
      {redirectAfterCreate && <Redirect to={redirectAfterCreate} />}
      <CustomFormModalOpenButton
        formTitle={props.label ? props.label : "Create Person"}
        helpKey={props.helpKey}
        customForm={
          <PersonForm
            disableRole={props.disableRole}
            Roles={props.initialValues && props.initialValues.Roles}
            editMode={false}
            formInstance={formInstance}
            PersonID={props.initialValues && props.initialValues.PersonID ? props.initialValues.PersonID : undefined}
          />
        }
        formInstance={formInstance}
        onFormSubmission={onFormSubmission}
        initialValues={props.initialValues || {}}
        apiCallInProgress={apiCallInProgress}
        loading={loading}
        errorMessages={errorMessages}
        buttonLabel={`${props.label ? props.label : "+ Create Person"}`}
        buttonProps={{ type: props.buttonType ? props.buttonType : "primary" }}
        iconType={props.buttonIcon}
      />
    </>
  )
}
