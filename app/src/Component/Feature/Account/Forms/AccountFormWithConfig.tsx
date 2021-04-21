import React, { useEffect, useState } from "react"
import { Row, Col, message, Select } from "antd"
import Form, { FormInstance } from "antd/lib/form"
import { ISimplifiedApiErrorMessage } from "@packages/api/lib/utils/HandleResponse/ProcessedApiError"
import { CustomFormModalOpenButton } from "~/Component/Common/Modal/FormModal/CustomFormModalOpenButton"
import { FormInput } from "~/Component/Common/Form/FormInput"
import { CustomFormConfigHook } from "~/Component/Common/Form/FormMetaShadowingProcessor"
import { IAccountFieldNames } from "~/Component/Feature/Account/Interfaces"
import { getAccountTypes } from "~/ApiServices/Service/RefLookupService"
import { FormDropDown } from "~/Component/Common/Form/FormDropDown"
import { PersonLookup } from "~/Component/Common/Form/FormLookupFields/PersonLookup"
import { pushAccount } from "~/ApiServices/Service/AccountService"
import { CREATE_SUCCESSFULLY } from "~/utils/Constants"

interface IAccountFormProps {
  formInstance: FormInstance
}

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 14 }
}

const fieldNames: IAccountFieldNames = {
  AccountID: "AccountID",
  AccountTypeID: "AccountTypeID",
  Name: "Name",
  PersonID: "PersonID",
  PrimaryAccountAffiliationID: "PrimaryAccountAffiliationID",
  PaymentTerm: "PaymentTerm",
  AllowToPayLater: "AllowToPayLater",
  IsPublic: "IsPublic",
  IsApprovalRequired: "IsApprovalRequired",
  DefaultWaitlistPriority: "DefaultWaitlistPriority",
  FEID: "FEID"
}

function AccountForm(props: IAccountFormProps) {
  const [isRequiredPrimaryContact, setIsRequiredPrimaryContact] = useState<boolean>(false)
  const [accountTypes, setAccountTypes] = useState<Array<any>>([])
  const AccountFormConfig: IAccountFieldNames = CustomFormConfigHook(
    fieldNames,
    "AccountFormWithConfig"
  ) as IAccountFieldNames

  useEffect(() => {
    ;(async function () {
      const result = await getAccountTypes()
      if (result.success && result.data) {
        setAccountTypes(result.data)
      }
    })()
  }, [])

  const accountTypeHandler = (value: any) => {
    if (value === 1000) {
      setIsRequiredPrimaryContact(true)
    } else {
      setIsRequiredPrimaryContact(false)
    }
  }

  return (
    <Row>
      <Col xs={24} sm={24} md={12}>
        <Form.Item
          {...layout}
          label={"Account Type"}
          name={fieldNames.AccountTypeID}
          {...AccountFormConfig.AccountTypeID}
          rules={[{ required: true, message: "Please select account type!" }]}
        >
          <Select aria-label="Account Type" onChange={accountTypeHandler}>
            {accountTypes.map((x) => {
              return (
                <Select.Option key={x.ID} value={x.ID}>
                  {x.Name}
                </Select.Option>
              )
            })}
          </Select>
        </Form.Item>

        <FormInput
          {...layout}
          formInstance={props.formInstance}
          label={"Account Name"}
          ariaLabel={"Account Name"}
          fieldName="Name"
          {...AccountFormConfig.Name}
          rules={[{ required: true, message: "Please enter account name!" }]}
        />

        <FormDropDown
          {...layout}
          formInstance={props.formInstance}
          label={"Allow To Pay Later"}
          ariaLabel={"Allow To Pay Later"}
          options={[
            { label: "Pay Later", value: "Pay Later" },
            { label: "Purchase Order", value: "Purchase Order" },
            { label: "Not Allowed", value: "Not Allowed" }
          ]}
          fieldName={fieldNames.AllowToPayLater}
          {...AccountFormConfig.AllowToPayLater}
        />

        <FormDropDown
          {...layout}
          formInstance={props.formInstance}
          label={"Approval Required"}
          ariaLabel={"Approval Required"}
          options={[
            { label: "Yes", value: true },
            { label: "No", value: false }
          ]}
          fieldName={fieldNames.IsApprovalRequired}
          {...AccountFormConfig.IsApprovalRequired}
        />
      </Col>

      <Col xs={24} sm={24} md={12}>
        <PersonLookup
          formInstance={props.formInstance}
          label={"Primary Contact"}
          fieldName={fieldNames.PersonID}
          rules={[{ required: isRequiredPrimaryContact, message: "Please select primary contact!" }]}
        />

        <FormInput
          {...layout}
          formInstance={props.formInstance}
          label={"Payment Term"}
          ariaLabel={"Payment Term"}
          fieldName={fieldNames.PaymentTerm}
          {...AccountFormConfig.PaymentTerm}
        />

        <FormDropDown
          {...layout}
          formInstance={props.formInstance}
          label={"Public"}
          ariaLabel={"Public"}
          options={[
            { label: "Yes", value: true },
            { label: "No", value: false }
          ]}
          fieldName={fieldNames.IsPublic}
          {...AccountFormConfig.IsPublic}
        />

        <FormInput
          {...layout}
          formInstance={props.formInstance}
          label={"Tax ID"}
          ariaLabel={"Tax ID"}
          fieldName={fieldNames.FEID}
          {...AccountFormConfig.FEID}
        />
      </Col>
    </Row>
  )
}

export function AccountFormOpenButton(props: {
  helpKey?: string
  initialValues?: { [key: string]: any }
  label?: string
}) {
  const [formInstance] = Form.useForm()
  // const [showModal, setShowModal] = useState(false)
  const [apiCallInProgress, setApiCallInProgress] = useState(false)
  const [loading] = useState(false)
  const [errorMessages, setErrorMessages] = useState<Array<ISimplifiedApiErrorMessage>>([])
  const [initialValues] = useState<{ [key: string]: any }>(props.initialValues || {})

  const onFormSubmission = () => {
    formInstance.validateFields().then((x) => {
      const params = formInstance.getFieldsValue()
      setErrorMessages([])
      setApiCallInProgress(true)
      pushAccount(params)
        .then((response) => {
          console.log("validation passed ", response)
          setApiCallInProgress(false)
          if (response && response.success) {
            message.success(CREATE_SUCCESSFULLY)
            formInstance.resetFields()
            // setShowModal(false)
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
      helpKey={props.helpKey}
      formTitle={props.label ? props.label : "Create Account"}
      customForm={<AccountForm formInstance={formInstance} />}
      formInstance={formInstance}
      onFormSubmission={onFormSubmission}
      initialValues={initialValues}
      apiCallInProgress={apiCallInProgress}
      loading={loading}
      iconType="create"
      errorMessages={errorMessages}
      buttonLabel={`${props.label ? props.label : "Create Account"}`}
      buttonProps={{ type: "primary" }}

      // showModal={showModal}
      // setShowModal={(show: boolean) => {
      //   if (!show) formInstance.resetFields()
      // setShowModal(show)
      // }}
    />
  )
}
