import React, { useEffect, useState } from "react"
import { Row, Col, message, Select } from "antd"
import Form, { FormInstance } from "antd/lib/form"
import { ISimplifiedApiErrorMessage } from "@packages/api/lib/utils/HandleResponse/ProcessedApiError"
import { CustomFormModalOpenButton } from "~/Component/Common/Modal/FormModal/CustomFormModalOpenButton"
import { FormInput } from "~/Component/Common/Form/FormInput"
import {
  getOfferingStatusTypes,
  getOrganizations,
  getPaymentGatewayAccounts
} from "~/ApiServices/Service/RefLookupService"
import { FormDropDown } from "~/Component/Common/Form/FormDropDown"
import { CREATE_SUCCESSFULLY, PAYMENT_GATEWAY_ACCOUNT_ID_STUB, UPDATE_SUCCESSFULLY } from "~/utils/Constants"
import { BaseButtonProps } from "antd/lib/button/button"
import { iconType } from "~/Component/Common/Form/Buttons/IconButton"
import { Redirect } from "react-router"
import { FormTextArea } from "~/Component/Common/Form/FormTextArea"
import { createOrUpdateProgramOffering } from "~/ApiServices/Service/ProgramService"
import { eventBus, REFRESH_PAGE } from "~/utils/EventBus"
import { getEntityById } from "~/ApiServices/Service/EntityService"

interface IProgramOfferingFormProps {
  formInstance: FormInstance
  editMode: boolean
}

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 14 }
}

const fieldNames = {
  ProgramOfferingCode: "ProgramOfferingCode",
  Name: "Name",
  Description: "Description",
  OrganizationID: "OrganizationID",
  ProgramOfferingStatusCodeID: "ProgramOfferingStatusCodeID",
  PaymentGatewayAccountID: "PaymentGatewayAccountID",
  DefaultPaymentGatewayAccountID: "DefaultPaymentGatewayAccountID",
  ProgramOfferingID: "ProgramOfferingID",
  oca: "oca"
}

function ProgramOfferingForm(props: IProgramOfferingFormProps) {
  const [offeringStatusTypes, setOfferingStatusTypes] = useState<Array<any>>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    ;(async function () {
      setLoading(true)
      const result = await getOfferingStatusTypes()
      if (result.success && result.data) {
        setOfferingStatusTypes(result.data)
        setLoading(false)
      }
    })()
  }, [])

  return (
    <Row>
      <Col xs={24} sm={24} md={12}>
        <FormInput
          label="ProgramOfferingID"
          fieldName={fieldNames.ProgramOfferingID}
          formInstance={props.formInstance}
          hidden
        />
        <FormInput
          {...layout}
          formInstance={props.formInstance}
          label={"Program Offering Code"}
          ariaLabel={"Program Offering Code"}
          fieldName={fieldNames.ProgramOfferingCode}
          maxLength={16}
          rules={[{ required: true, message: "Program Offering Code is required!" }]}
        />
        <Form.Item
          colon={false}
          label="Offering Status"
          name={fieldNames.ProgramOfferingStatusCodeID}
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 16 }}
          rules={[{ required: true, message: "Please select offering status!" }]}
        >
          <Select disabled={!props.editMode} loading={loading} aria-label="Offering Status">
            {offeringStatusTypes &&
              offeringStatusTypes.map(({ Name, StatusID }, i) => (
                <Select.Option value={StatusID} key={`${StatusID}_${i}`}>
                  {Name}
                </Select.Option>
              ))}
          </Select>
        </Form.Item>
        <FormTextArea
          {...layout}
          label={"Description"}
          ariaLabel={"Description"}
          formInstance={props.formInstance}
          fieldName={fieldNames.Description}
          maxLength={3000}
        />
        <FormDropDown
          {...layout}
          formInstance={props.formInstance}
          label={"Default Gateway"}
          ariaLabel={"Default Gateway"}
          fieldName={fieldNames.DefaultPaymentGatewayAccountID}
          refLookupService={getPaymentGatewayAccounts}
          displayKey="Name"
          valueKey="ID"
          disabled
        />
      </Col>
      <Col xs={24} sm={24} md={12}>
        <FormInput label="oca" fieldName={fieldNames.oca} formInstance={props.formInstance} hidden />
        <FormInput
          {...layout}
          formInstance={props.formInstance}
          label={"Program Offering Name"}
          ariaLabel={"Program Offering Name"}
          maxLength={128}
          fieldName={fieldNames.Name}
          rules={[{ required: true, message: "Program Offering Name is required!" }]}
        />
        <FormDropDown
          {...layout}
          formInstance={props.formInstance}
          label={"Department"}
          ariaLabel={"Department"}
          fieldName={fieldNames.OrganizationID}
          refLookupService={getOrganizations}
          displayKey="Name"
          valueKey="OrganizationID"
        />
        <FormDropDown
          {...layout}
          formInstance={props.formInstance}
          label={"Selected Gateway"}
          ariaLabel={"Selected Gateway"}
          fieldName={fieldNames.PaymentGatewayAccountID}
          refLookupService={getPaymentGatewayAccounts}
          displayKey="Name"
          valueKey="ID"
        />
      </Col>
    </Row>
  )
}

export function ProgramOfferingFormOpenButton(props: {
  editMode: boolean
  initialValues?: { [key: string]: any }
  iconType?: iconType
  buttonProps?: BaseButtonProps
}) {
  const [formInstance] = Form.useForm()
  const [apiCallInProgress, setApiCallInProgress] = useState(false)
  const [redirectAfterCreate, setRedirectAfterCreate] = useState<string>()
  const [loading] = useState(false)
  const [errorMessages, setErrorMessages] = useState<Array<ISimplifiedApiErrorMessage>>([])
  const [initialValues, setInitialValues] = useState<{ [key: string]: any }>(
    props.editMode
      ? {}
      : {
          DefaultPaymentGatewayAccountID: PAYMENT_GATEWAY_ACCOUNT_ID_STUB,
          ProgramOfferingStatusCodeID: 0
        }
  )

  useEffect(() => {
    if (props.initialValues && props.initialValues.ProgramOfferingID !== undefined) {
      getEntityById("Offering", props.initialValues.ProgramOfferingID).then((response) => {
        setInitialValues({
          ...response.data,
          ProgramOfferingID: response.data.OfferingID,
          ProgramOfferingStatusCodeID: response.data.OfferingStatusCodeID,
          ProgramOfferingCode: response.data.OfferingCode,
          DefaultPaymentGatewayAccountID: PAYMENT_GATEWAY_ACCOUNT_ID_STUB
        })
      })
    }
    setErrorMessages([])
    // eslint-disable-next-line
  }, [])

  const onFormSubmission = (closeModal: () => void) => {
    formInstance.validateFields().then((params) => {
      setErrorMessages([])
      setApiCallInProgress(true)
      createOrUpdateProgramOffering(params)
        .then((response) => {
          setApiCallInProgress(false)
          if (response && response.success) {
            if (props.editMode) {
              formInstance.resetFields()
              message.success(UPDATE_SUCCESSFULLY)
              eventBus.publish(REFRESH_PAGE)
              closeModal()
            } else {
              message.success(CREATE_SUCCESSFULLY)
              formInstance.resetFields()
              setRedirectAfterCreate(`/program/offering/${response.data.ProgramOfferingID}`)
              closeModal()
            }
          } else {
            setErrorMessages(response.error)
          }
        })
        .catch((y) => console.error(y))
    })
  }
  return (
    <>
      {redirectAfterCreate && <Redirect to={redirectAfterCreate} />}
      <CustomFormModalOpenButton
        formTitle={props.editMode ? "Update Program Offering" : "Create Program Offering"}
        customForm={<ProgramOfferingForm formInstance={formInstance} editMode={props.editMode} />}
        formInstance={formInstance}
        onFormSubmission={onFormSubmission}
        initialValues={initialValues}
        apiCallInProgress={apiCallInProgress}
        loading={loading}
        iconType={props.iconType}
        errorMessages={errorMessages}
        buttonLabel={props.editMode ? "Update Program Offering" : "Create Program Offering"}
        buttonProps={props.buttonProps}
      />
    </>
  )
}
