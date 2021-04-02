import React, { useState } from "react"
import { Form, message } from "antd"
import { ISimplifiedApiErrorMessage } from "@packages/api/lib/utils/HandleResponse/ProcessedApiError"
import { CustomFormModalOpenButton } from "~/Component/Common/Modal/FormModal/CustomFormModalOpenButton"
import { IOfferingFieldNames } from "~/Component/Feature/Offering/Interfaces"
import { updateOffering } from "~/ApiServices/Service/OfferingService"
import { OFFERING_TRMINATION_TIME, UPDATE_SUCCESSFULLY } from "~/utils/Constants"
import { eventBus, REFRESH_PAGE } from "~/utils/EventBus"
import { EditOutlined } from "@ant-design/icons"

interface IOfferingEditLinkProp {
  initialValues: { [key: string]: any }
  component: React.FunctionComponent<any>
}

const fieldNames: IOfferingFieldNames = {
  OfferingID: "OfferingID",
  OfferingTypeID: "OfferingTypeID",
  OfferingCode: "OfferingCode",
  Name: "Name",
  Description: "Description",
  OrganizationID: "OrganizationID",
  IsQuickAdmit: "IsQuickAdmit",
  OfferingStatusCodeID: "OfferingStatusCodeID",
  OfferingStatusReleaseID: "OfferingStatusReleaseID",
  DefaultSectionTypeID: "DefaultSectionTypeID",
  RecurrenceRule: "RecurrenceRule",
  StartTermID: "StartTermID",
  EndTermID: "EndTermID",
  CreationDate: "CreationDate",
  TerminationDate: "TerminationDate",
  URL: "URL",
  HasApprovalProcess: "HasApprovalProcess",
  CourseID: "CourseID",
  EffectiveCreationDate: "EffectiveCreationDate",
  EffectiveTerminationDate: "EffectiveTerminationDate",
  SubmitInquiryToUserID: "SubmitInquiryToUserID",
  OfferingUsageType: "OfferingUsageType",
  PaymentGatewayAccountID: "PaymentGatewayAccountID"
}

export function OfferingEditLink(props: IOfferingEditLinkProp) {
  const [loading, setLoading] = useState(false)
  const [formInstance] = Form.useForm()
  const [apiCallInProgress, setApiCallInProgress] = useState(false)
  const [errorMessages, setErrorMessages] = useState<Array<ISimplifiedApiErrorMessage>>([])
  const [initialValues] = useState<{ [key: string]: any }>(props.initialValues || {})

  const chooseStartDate: boolean = props.initialValues.StartTermID != null ? false : true
  const chooseEndDate: string =
    props.initialValues.EndTermID != null ? OFFERING_TRMINATION_TIME.TERM : OFFERING_TRMINATION_TIME.DATE
  initialValues["ChooseStartDate"] = chooseStartDate
  initialValues["ChooseEndDate"] = chooseEndDate

  const onFormSubmission = async (closeModal: () => void) => {
    const params = formInstance.getFieldsValue(true)

    setLoading(true)
    setErrorMessages([])
    updateOffering(params)
      .then((response) => {
        setApiCallInProgress(false)
        if (response && response.success) {
          formInstance.resetFields()
          message.success(UPDATE_SUCCESSFULLY)
          eventBus.publish(REFRESH_PAGE)
          closeModal()
        } else {
          setErrorMessages(response.error)
        }
      })
      .catch((y) => console.error(y))
  }

  return (
    <CustomFormModalOpenButton
      formTitle={"Update Offering"}
      customForm={<props.component fieldNames={fieldNames} initialValue={initialValues} formInstance={formInstance} />}
      formInstance={formInstance}
      onFormSubmission={onFormSubmission}
      initialValues={initialValues}
      apiCallInProgress={apiCallInProgress}
      loading={loading}
      iconType="edit"
      buttonLabel="Update Offering"
      errorMessages={errorMessages}
      buttonProps={{ type: "primary", shape: "circle", icon: <EditOutlined /> }}
    />
  )
}
