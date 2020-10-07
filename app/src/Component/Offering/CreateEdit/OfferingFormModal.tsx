import * as React from "react"
import { Form } from "antd"
import Modal from "~/Component/Common/Modal"
import { useEffect, useState } from "react"
import CreateForm1 from "~/Component/Offering/CreateEdit/Form1"
import CreateForm2 from "~/Component/Offering/CreateEdit/Form2"
import { IOfferingFieldNames } from "~/Component/Offering/Interfaces"
import { connect } from "react-redux"
import { Dispatch } from "redux"
import { showCreateOfferingModal } from "~/Store/ModalState"
import { getOfferingById } from "~/ApiServices/Service/EntityService"
import { redirect } from "~/Store/ConnectedRoute"

interface ICreateNewOfferingProps {
  offeringId?: number
  redirect?: (url: string) => void
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

function CreateNewOffering(props: ICreateNewOfferingProps) {
  const [editMode, setEditMode] = useState(false)
  const [initialFormValue, setInitialFormValue] = useState<{ [key: string]: any }>({})
  const [formInstance] = Form.useForm()
  const [firstFormVisible, setFirstFormVisible] = useState(false)
  const [secondFormVisible, setSecondFormVisible] = useState(false)
  const [apiCallInProgress, setApiCallInProgress] = useState(false)

  const handleCancel = () => {
    if (props.closeCreateOfferingModal) {
      props.closeCreateOfferingModal()
    }
    goBackToOfferingTypeForm()
  }

  useEffect(() => {
    ;(async () => {
      if (props.offeringId) {
        const response = await getOfferingById(props.offeringId)
        setEditMode(true)
        if (response && response.success) {
          Object.keys(response.data).forEach((x) => {
            formInstance.setFieldsValue({ [x]: response.data[x] })
          })

          setFirstFormVisible(false)
          setSecondFormVisible(true)
        } else {
          if (props.closeCreateOfferingModal) {
            props.closeCreateOfferingModal()
          }
        }
      } else {
        setFirstFormVisible(true)
        setSecondFormVisible(false)
      }
    })()
  }, [props, formInstance])

  const onOfferingTypeSelected = (selectedOfferingType: { [key: string]: any }) => {
    setFirstFormVisible(false)
    setSecondFormVisible(true)

    formInstance.setFieldsValue({ [fieldNames.OfferingTypeID]: selectedOfferingType.OfferingTypeID })
    formInstance.setFieldsValue({ [fieldNames.OfferingCode]: selectedOfferingType.OfferingCode })
    formInstance.setFieldsValue({ [fieldNames.Name]: selectedOfferingType.Name })
    formInstance.setFieldsValue({ [fieldNames.Description]: selectedOfferingType.OfferingTypeDescription })
    formInstance.setFieldsValue({ [fieldNames.URL]: selectedOfferingType.URL })
    formInstance.setFieldsValue({ [fieldNames.CreationDate]: selectedOfferingType.CreationDate })
    formInstance.setFieldsValue({ [fieldNames.StartTermID]: selectedOfferingType.CreationDateOfTermTypeID })
    formInstance.setFieldsValue({ [fieldNames.TerminationDate]: selectedOfferingType.TerminationDate })
    formInstance.setFieldsValue({ [fieldNames.EndTermID]: selectedOfferingType.TerminationDateOfTermTypeID })
    formInstance.setFieldsValue({ [fieldNames.RecurrenceRule]: selectedOfferingType.RecurrenceRule })
    formInstance.setFieldsValue({ [fieldNames.OrganizationID]: selectedOfferingType.OrganizationID })
    formInstance.setFieldsValue({ [fieldNames.IsQuickAdmit]: selectedOfferingType.IsQuickAdmit })
    formInstance.setFieldsValue({ [fieldNames.HasApprovalProcess]: selectedOfferingType.HasApprovalProcess })
    formInstance.setFieldsValue({ [fieldNames.SubmitInquiryToUserID]: selectedOfferingType.SubmitInquiryToUserID })
    formInstance.setFieldsValue({ [fieldNames.OfferingUsageType]: selectedOfferingType.OfferingUsageType })
    formInstance.setFieldsValue({ [fieldNames.OfferingStatusCodeID]: selectedOfferingType.OfferingStatusCodeI })
    // [fieldNames.OfferingID]: selectedOfferingType.,
    // [fieldNames.PaymentGatewayAccountID]: selectedOfferingType.,
    // [fieldNames.DefaultSectionTypeID]: selectedOfferingType.,
    // [fieldNames.OfferingStatusReleaseID]: selectedOfferingType.,
    // [fieldNames.CourseID]: selectedOfferingType.,
    // [fieldNames.EffectiveCreationDate]: selectedOfferingType.,
    // [fieldNames.EffectiveTerminationDate]: selectedOfferingType.,
  }

  const goBackToOfferingTypeForm = () => {
    setInitialFormValue({})
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
              goBackToFirstForm={goBackToOfferingTypeForm}
              setApiCallInProgress={setApiCallInProgress}
            />
          )}
        </>
      }
    />
  )
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    closeCreateOfferingModal: () => dispatch(showCreateOfferingModal({ value: false })),
    redirect: (url: string) => dispatch(redirect(url))
  }
}

export default connect(undefined, mapDispatchToProps)(CreateNewOffering)
