import * as React from "react"
import { Form, Typography } from "antd"
import Modal from "~/component/Modal"
import { getOfferingTypes } from "~/ApiServices/Service/RefLookupServiceWrap"
import { useEffect, useState } from "react"
import CreateForm1 from "~/component/Offering/CreateEdit/Form1"
import CreateForm2 from "~/component/Offering/CreateEdit/Form2"
import { IFieldNames } from "~/component/Offering/Interfaces"
import { AppState } from "~/store"
import { connect } from "react-redux"
import { Dispatch } from "redux"
import { showCreateOfferingModal } from "~/store/ModalState"
import { createOfferingWrap } from "~/ApiServices/Service/OfferingServiceWrap"

interface ICreateNewOfferingProps {
  createOfferingModal?: boolean
  closeCreateOfferingModal?: () => void
}

const fieldNames: IFieldNames = {
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

const initialFormValue: { [key: string]: any } = {}

function CreateNewOffering(props: ICreateNewOfferingProps) {
  const [offeringTypes, setofferingTypes] = useState([])
  const [formInstance] = Form.useForm()
  const [firstFormVisible, setFirstFormVisible] = useState(true)
  const [secondFormVisible, setSecondFormVisible] = useState(false)
  const [errorMessages, setErrorMessages] = useState<Array<string>>([])

  useEffect(() => {
    ;(async () => {
      const [response] = await getOfferingTypes()
      if (response) {
        setofferingTypes(response.data)
      }
    })()
  }, [])

  const handleOk = async () => {
    if (firstFormVisible && formInstance.getFieldValue("OfferingTypeID")) {
      onOfferingTypeSelected()
    } else if (secondFormVisible) {
      console.log(formInstance.getFieldsValue())

      const validationPassed = await formInstance.validateFields()
      console.log("validationPassed ", validationPassed)
      const params = formInstance.getFieldsValue()
      const [response, error] = await createOfferingWrap(params)

      if (response) {
        console.log(response)
        formInstance.resetFields()
        handleCancel()
      } else if (error) {
      }
    }
  }
  const handleCancel = () => {
    if (props.closeCreateOfferingModal) {
      props.closeCreateOfferingModal()
    }
    goBackToOfferingTypeForm()
  }

  const onOfferingTypeSelected = () => {
    setFirstFormVisible(false)
    setSecondFormVisible(true)
  }

  const goBackToOfferingTypeForm = () => {
    setSecondFormVisible(false)
    setFirstFormVisible(true)
  }

  return (
    <Modal
      showModal={props.createOfferingModal ? props.createOfferingModal : false}
      width="800px"
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
          {firstFormVisible && (
            <CreateForm1
              fieldNames={fieldNames}
              initialFormValue={initialFormValue}
              formInstance={formInstance}
              offeringTypes={offeringTypes}
              handleCancel={handleCancel}
              handleSelected={handleOk}
            />
          )}
          {secondFormVisible && (
            <CreateForm2
              fieldNames={fieldNames}
              initialFormValue={initialFormValue}
              formInstance={formInstance}
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

const mapStateToProps = (state: AppState) => {
  return {
    createOfferingModal: state.modalState.createOfferingModal
  }
}
const mapDispatchToProps = (dispatch: Dispatch) => {
  return { closeCreateOfferingModal: () => dispatch(showCreateOfferingModal(false)) }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateNewOffering)
