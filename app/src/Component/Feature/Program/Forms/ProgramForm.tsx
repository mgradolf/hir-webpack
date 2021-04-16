import React, { useEffect, useState } from "react"
import { Form, Row, Col, message } from "antd"
import { FormInstance } from "antd/lib/form"
import { FormInput } from "~/Component/Common/Form/FormInput"
import { CustomFormConfigHook } from "~/Component/Common/Form/FormMetaShadowingProcessor"
import { FormDropDown } from "~/Component/Common/Form/FormDropDown"
import { ISimplifiedApiErrorMessage } from "@packages/api/lib/utils/HandleResponse/ProcessedApiError"
import { CustomFormModalOpenButton } from "~/Component/Common/Modal/FormModal/CustomFormModalOpenButton"
import { eventBus } from "~/utils/EventBus"
import { iconType } from "~/Component/Common/Form/Buttons/IconButton"
import { getPaymentGatewayAccounts, getProgramStatusCodes } from "~/ApiServices/Service/RefLookupService"
import { findAllUsers } from "~/ApiServices/Service/UserService"
import { FormTextArea } from "~/Component/Common/Form/FormTextArea"
import { getEntityById } from "~/ApiServices/Service/EntityService"
import { ProgramOfferingLookup } from "~/Component/Common/Form/FormLookupFields/ProgramOfferingLookup"
import { saveProgramWithEvent } from "~/ApiServices/BizApi/program/programIF"
import { Redirect } from "react-router"

interface IProgramFormProps {
  editMode: boolean
  initialValue: { [key: string]: any }
  formInstance: FormInstance
}

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 14 }
}

interface IProgramFieldNames {
  ProgramOfferingID: any
  ProgramCode: any
  Name: any
  Description: any
  AdminUserID: any
  ProgramStatusCodeID: any
  PaymentGatewayAccountID: any
  DefaultPaymentGatewayAccountID: any
}

const fieldNames: IProgramFieldNames = {
  ProgramOfferingID: "ProgramOfferingID",
  ProgramCode: "ProgramCode",
  Name: "Name",
  Description: "Description",
  AdminUserID: "AdminUserID",
  ProgramStatusCodeID: "ProgramStatusCodeID",
  PaymentGatewayAccountID: "PaymentGatewayAccountID",
  DefaultPaymentGatewayAccountID: "DefaultPaymentGatewayAccountID"
}

function ProgramForm(props: IProgramFormProps) {
  const ProgramFormConfig: { [key: string]: any } = CustomFormConfigHook(fieldNames, "ProgramForm") as {
    [key: string]: any
  }

  return (
    <Row>
      <Col xs={24} sm={24} md={24}>
        <ProgramOfferingLookup
          formInstance={props.formInstance}
          fieldName={fieldNames.ProgramOfferingID}
          {...(props.initialValue.ProgramOfferingID && {
            defaultValue: props.initialValue.ProgramOfferingID,
            disabled: !!props?.initialValue?.ProgramOfferingID
          })}
          label="Program Offering"
          onSelectedItems={(items: any[]) => {
            if (items && items.length > 0) {
              const offeringiD = typeof items[0] === "number" ? items[0] : items[0].ProgramOfferingID
              getEntityById("Offering", offeringiD).then((x) => {
                if (x.success) {
                  props.formInstance.setFieldsValue({
                    [fieldNames.ProgramCode]: x.data.OfferingCode,
                    [fieldNames.Name]: x.data.Name,
                    [fieldNames.Description]: x.data.Description,
                    [fieldNames.ProgramStatusCodeID]: 1
                  })
                }
              })
            }
          }}
        />

        <FormInput
          formInstance={props.formInstance}
          label={"Program Code"}
          ariaLabel={"Program Code"}
          fieldName={fieldNames.ProgramCode}
          {...ProgramFormConfig[fieldNames.ProgramCode]}
        />

        <FormInput
          formInstance={props.formInstance}
          label={"Program Name"}
          ariaLabel={"Program Name"}
          fieldName={fieldNames.Name}
          {...ProgramFormConfig[fieldNames.Name]}
        />

        <FormTextArea
          {...layout}
          formInstance={props.formInstance}
          label={"Description"}
          ariaLabel={"Program Description"}
          fieldName={fieldNames.Description}
          {...ProgramFormConfig[fieldNames.Description]}
        />

        <FormDropDown
          {...layout}
          formInstance={props.formInstance}
          label={"Contact Person"}
          ariaLabel={"Contact Person"}
          refLookupService={() => findAllUsers({})}
          displayKey="erpid"
          valueKey="erpid"
          fieldName={fieldNames.AdminUserID}
          {...ProgramFormConfig[fieldNames.AdminUserID]}
        />

        <FormDropDown
          {...layout}
          formInstance={props.formInstance}
          label={"Program Status"}
          ariaLabel={"Program Status"}
          refLookupService={getProgramStatusCodes}
          displayKey="Name"
          valueKey="StatusID"
          fieldName={fieldNames.ProgramStatusCodeID}
          {...ProgramFormConfig[fieldNames.ProgramStatusCodeID]}
        />

        <FormDropDown
          {...layout}
          formInstance={props.formInstance}
          label={"Selected Gateway"}
          ariaLabel={"Selected Gateway"}
          refLookupService={getPaymentGatewayAccounts}
          displayKey="Name"
          valueKey="ID"
          fieldName={fieldNames.PaymentGatewayAccountID}
          {...ProgramFormConfig[fieldNames.PaymentGatewayAccountID]}
        />

        <FormDropDown
          {...layout}
          formInstance={props.formInstance}
          label={"Default Gateway"}
          ariaLabel={"Default Gateway"}
          refLookupService={getPaymentGatewayAccounts}
          displayKey="Name"
          valueKey="ID"
          disabled={true}
          fieldName={fieldNames.DefaultPaymentGatewayAccountID}
          {...ProgramFormConfig[fieldNames.DefaultPaymentGatewayAccountID]}
        />
      </Col>
    </Row>
  )
}

export function ProgramFormOpenButton(props: {
  editMode: boolean
  iconType?: iconType
  ProgramID?: number
  ProgramOfferingID?: number
}) {
  const [loading] = useState(false)
  const [formInstance] = Form.useForm()
  const [initialValues, setInitialValues] = useState<{ [key: string]: any }>({})
  const [apiCallInProgress, setApiCallInProgress] = useState(false)
  const [errorMessages, setErrorMessages] = useState<Array<ISimplifiedApiErrorMessage>>([])
  const [redirectTo, setRedirectTo] = useState<string>()

  useEffect(() => {
    if (props.ProgramID) {
      getEntityById("Program", props.ProgramID).then((x) => {
        if (x.success) {
          console.log(x.data)
          setInitialValues({ ...x.data, ProgramOfferingID: x.data.OfferingID })
        }
      })
    }
    if (props.ProgramOfferingID) {
      getEntityById("Offering", props.ProgramOfferingID).then((x) => {
        if (x.success) {
          formInstance.setFieldsValue({
            [fieldNames.ProgramCode]: x.data.OfferingCode,
            [fieldNames.Name]: x.data.Name,
            [fieldNames.Description]: x.data.Description,
            [fieldNames.ProgramStatusCodeID]: 1
          })
        }
      })
    }
  }, [props.ProgramID, props.ProgramOfferingID, formInstance])

  const onFormSubmission = async (closeModal: () => void) => {
    formInstance.validateFields().then((x) => {
      setErrorMessages([])
      saveProgramWithEvent({ ...x, ProgramID: props.ProgramID })
        .then((response) => {
          setApiCallInProgress(false)
          if (response && response.success) {
            formInstance.resetFields()
            message.success("Program Created")
            eventBus.publishSimilarEvents(/REFRESH.*/i)
            closeModal()
            if (!props.ProgramID && !props.ProgramOfferingID) {
              setRedirectTo(`/program/${response.data.ProgramID}`)
            }
          } else {
            console.log("validation failed ", response.error)
            setErrorMessages(response.error)
          }
        })
        .catch((y) => console.error(y))
    })
  }

  return (
    <>
      {redirectTo && <Redirect to={redirectTo} />}
      <CustomFormModalOpenButton
        formTitle={props.editMode ? "Edit Program" : "Add New Program"}
        customForm={<ProgramForm editMode={true} initialValue={initialValues} formInstance={formInstance} />}
        formInstance={formInstance}
        onFormSubmission={onFormSubmission}
        initialValues={initialValues}
        apiCallInProgress={apiCallInProgress}
        iconType={props.iconType}
        loading={loading}
        errorMessages={errorMessages}
        buttonLabel={props.editMode ? "Edit Program" : "Add New Program"}
        buttonProps={{ type: props.editMode ? "link" : "primary" }}
      />
    </>
  )
}
