import * as React from "react"
import { Form, Typography } from "antd"
import Modal from "~/component/Modal"
import { useEffect, useState } from "react"
import CreateForm1 from "~/component/Offering/CreateEdit/Form1"
import CreateForm2 from "~/component/Offering/CreateEdit/Form2"
import { IOfferingFieldNames } from "~/component/Offering/Interfaces"
import { connect } from "react-redux"
import { Dispatch } from "redux"
import { showCreateOfferingModal } from "~/store/ModalState"
import { getOfferingById } from "~/ApiServices/Service/EntityService"
import { updateOffering, createOffering } from "~/ApiServices/Service/OfferingService"
import { REFRESH_OFFERING_PAGE } from "~/utils/EventList"
import EventBus from "~/utils/EventBus"
import { IApiResponse } from "@packages/api/lib/utils/Interfaces"

interface ICreateNewOfferingProps {
  offeringId?: number
  closeCreateOfferingModal?: () => void
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

function CreateNewOffering({ offeringId, closeCreateOfferingModal }: ICreateNewOfferingProps) {
  const [editMode, setEditMode] = useState(false)
  const [initialFormValue, setInitialFormValue] = useState<{ [key: string]: any }>({})
  const [formInstance] = Form.useForm()
  const [firstFormVisible, setFirstFormVisible] = useState(false)
  const [secondFormVisible, setSecondFormVisible] = useState(false)
  const [apiCallInProgress, setApiCallInProgress] = useState(false)
  const [errorMessages] = useState<Array<string>>([])

  const handleCancel = () => {
    if (closeCreateOfferingModal) {
      closeCreateOfferingModal()
    }
    goBackToOfferingTypeForm()
  }

  const handleOk = async () => {
    console.log(formInstance.getFieldsValue())
    const validationPassed = await formInstance.validateFields()
    console.log("validationPassed ", validationPassed)
    const params = formInstance.getFieldsValue() as IOfferingFieldNames
    console.log(params)
    const serviceMethoToCall: (params: { [key: string]: any }) => Promise<IApiResponse> = offeringId
      ? updateOffering
      : createOffering

    setApiCallInProgress(true)
    const response = await serviceMethoToCall(params)
    setApiCallInProgress(false)

    if (response && response.success) {
      formInstance.resetFields()
      EventBus.publish(REFRESH_OFFERING_PAGE)
      handleCancel()
    } else {
      console.log(response)
    }
  }

  useEffect(() => {
    if (offeringId) {
      ;(async () => {
        const response = await getOfferingById(offeringId)
        setEditMode(true)
        if (response && response.success) {
          Object.keys(response.data).forEach((x) => {
            formInstance.setFieldsValue({ [x]: response.data[x] })
          })

          setFirstFormVisible(false)
          setSecondFormVisible(true)
        } else {
          if (closeCreateOfferingModal) {
            closeCreateOfferingModal()
          }
        }
      })()
    } else {
      setFirstFormVisible(true)
      setSecondFormVisible(false)
    }
  }, [offeringId, closeCreateOfferingModal, formInstance])

  const onOfferingTypeSelected = (selectedOfferingType: { [key: string]: any }) => {
    setFirstFormVisible(false)
    setSecondFormVisible(true)

    setInitialFormValue({
      [fieldNames.OfferingTypeID]: selectedOfferingType.OfferingTypeID,
      [fieldNames.OfferingCode]: selectedOfferingType.OfferingCode,
      [fieldNames.Name]: selectedOfferingType.Name,
      [fieldNames.Description]: selectedOfferingType.Description,
      [fieldNames.URL]: selectedOfferingType.URL,
      [fieldNames.CreationDate]: selectedOfferingType.CreationDate,
      [fieldNames.StartTermID]: selectedOfferingType.CreationDateOfTermTypeID,
      [fieldNames.TerminationDate]: selectedOfferingType.TerminationDate,
      [fieldNames.EndTermID]: selectedOfferingType.TerminationDateOfTermTypeID,
      [fieldNames.RecurrenceRule]: selectedOfferingType.RecurrenceRule,
      [fieldNames.OrganizationID]: selectedOfferingType.OrganizationID,
      [fieldNames.IsQuickAdmit]: selectedOfferingType.IsQuickAdmit,
      [fieldNames.HasApprovalProcess]: selectedOfferingType.HasApprovalProcess,
      [fieldNames.SubmitInquiryToUserID]: selectedOfferingType.SubmitInquiryToUserID,
      [fieldNames.OfferingUsageType]: selectedOfferingType.OfferingUsageType,
      [fieldNames.OfferingStatusCodeID]: selectedOfferingType.OfferingStatusCodeID
      // [fieldNames.OfferingID]: selectedOfferingType.,
      // [fieldNames.PaymentGatewayAccountID]: selectedOfferingType.,
      // [fieldNames.DefaultSectionTypeID]: selectedOfferingType.,
      // [fieldNames.OfferingStatusReleaseID]: selectedOfferingType.,
      // [fieldNames.CourseID]: selectedOfferingType.,
      // [fieldNames.EffectiveCreationDate]: selectedOfferingType.,
      // [fieldNames.EffectiveTerminationDate]: selectedOfferingType.,
    })
  }

  const goBackToOfferingTypeForm = () => {
    setSecondFormVisible(false)
    setFirstFormVisible(true)
  }

  return (
    <Modal
      showModal={true}
      width="800px"
      loading={!(firstFormVisible || secondFormVisible)}
      apiCallInProgress={apiCallInProgress}
      children={
        <>
          {errorMessages.length && (
            <ul>
              <li>
                {errorMessages.map((item) => {
                  return <Typography.Text type="danger">{item}</Typography.Text>
                })}
              </li>
            </ul>
          )}
          {firstFormVisible && !editMode && (
            <CreateForm1
              fieldNames={fieldNames}
              initialFormValue={initialFormValue}
              formInstance={formInstance}
              handleCancel={handleCancel}
              handleSelected={onOfferingTypeSelected}
            />
          )}
          {secondFormVisible && (
            <CreateForm2
              editMode={editMode}
              fieldNames={fieldNames}
              initialFormValue={initialFormValue}
              formInstance={formInstance}
              resetForm={setInitialFormValue}
              goBackToFirstForm={goBackToOfferingTypeForm}
              handleCancel={handleCancel}
              onFormSubmission={handleOk}
            />
          )}
        </>
      }
    />
  )
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return { closeCreateOfferingModal: () => dispatch(showCreateOfferingModal({ value: false })) }
}

export default connect(undefined, mapDispatchToProps)(CreateNewOffering)
