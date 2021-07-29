import React, { useEffect, useState } from "react"
import { Form, message } from "antd"
import { ISimplifiedApiErrorMessage } from "@packages/api/lib/utils/HandleResponse/ProcessedApiError"
import { CustomFormModalOpenButton } from "~/Component/Common/Modal/FormModal/CustomFormModalOpenButton"
import { IOfferingFieldNames } from "~/Component/Feature/Offering/Interfaces"
import { searchOffering, updateOffering } from "~/ApiServices/Service/OfferingService"
import { OFFERING_TRMINATION_TIME, UPDATE_SUCCESSFULLY } from "~/utils/Constants"
import { eventBus, REFRESH_PAGE } from "~/utils/EventBus"
import { EditOutlined } from "@ant-design/icons"
import { getEntityById } from "~/ApiServices/Service/EntityService"

interface IOfferingEditLinkProp {
  OfferingID: number
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
  const [apiCallInProgress] = useState(false)
  const [errorMessages, setErrorMessages] = useState<Array<ISimplifiedApiErrorMessage>>([])
  const [initialValues, setInitialValue] = useState<{ [key: string]: any }>({})

  useEffect(() => {
    const getOfferingDetails = () => {
      setLoading(true)
      return Promise.all([
        searchOffering({ OfferingID: props.OfferingID }),
        getEntityById("Offering", props.OfferingID)
      ]).then((responses) => {
        const response1 = responses[0]
        const response2 = responses[1]
        if (response1.success && response2.success) {
          setLoading(false)
          response2.data = {
            ...response2.data,
            ...response1.data[0]
          }
          const chooseStartDate: boolean = response2.data.StartTermID != null ? false : true
          const chooseEndDate: string =
            response2.data.EndTermID != null ? OFFERING_TRMINATION_TIME.TERM : OFFERING_TRMINATION_TIME.DATE
          setInitialValue({ ...response2.data, ChooseStartDate: chooseStartDate, ChooseEndDate: chooseEndDate })
          return response2
        } else if (response2.success) {
          const chooseStartDate: boolean = response2.data.StartTermID != null ? false : true
          const chooseEndDate: string =
            response2.data.EndTermID != null ? OFFERING_TRMINATION_TIME.TERM : OFFERING_TRMINATION_TIME.DATE
          setInitialValue({ ...response2.data, ChooseStartDate: chooseStartDate, ChooseEndDate: chooseEndDate })
          return response2
        } else {
          response1.data = response1.data[0]
          const chooseStartDate: boolean = response1.data.StartTermID != null ? false : true
          const chooseEndDate: string =
            response1.data.EndTermID != null ? OFFERING_TRMINATION_TIME.TERM : OFFERING_TRMINATION_TIME.DATE
          setInitialValue({ ...response1.data, ChooseStartDate: chooseStartDate, ChooseEndDate: chooseEndDate })
          return response1
        }
      })
    }
    getOfferingDetails()
  }, [props.OfferingID])

  const onFormSubmission = async (closeModal: () => void) => {
    const params = formInstance.getFieldsValue(true)

    setLoading(true)
    setErrorMessages([])
    updateOffering(params).then((response) => {
      setLoading(false)
      if (response && response.success) {
        formInstance.resetFields()
        message.success(UPDATE_SUCCESSFULLY)
        eventBus.publish(REFRESH_PAGE)
        closeModal()
      } else {
        setErrorMessages(response.error)
      }
    })
  }

  return (
    <>
      {Object.keys(initialValues).length > 0 && (
        <CustomFormModalOpenButton
          formTitle={"Update Offering"}
          customForm={
            <props.component fieldNames={fieldNames} initialValue={initialValues} formInstance={formInstance} />
          }
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
      )}
    </>
  )
}
