import * as React from "react"
import { Form, Typography } from "antd"
import Modal from "~/component/Modal"
import { useEffect, useState } from "react"
import CreateForm1 from "~/component/Offering/CreateEdit/Form1"
import CreateForm2 from "~/component/Offering/CreateEdit/Form2"
import { IFieldNames } from "~/component/Offering/Interfaces"
import { connect } from "react-redux"
import { Dispatch } from "redux"
import { showCreateOfferingModal } from "~/store/ModalState"
import { createOffering, updateOffering } from "~/ApiServices/Service/OfferingService"
import { getOfferingById } from "~/ApiServices/Service/EntityService"
import { IApiResponse } from "@packages/api/lib/utils/Interfaces"

interface ICreateNewOfferingProps {
  offeringId?: number | undefined
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

function CreateNewOffering({ offeringId = 2, closeCreateOfferingModal }: ICreateNewOfferingProps) {
  const [initialFormValue, setInitialFormValue] = useState<{ [key: string]: any }>({})
  const [editOfferingEntity, setEditOfferingEntity] = useState<any | null>(null)
  const [formInstance] = Form.useForm()
  const [firstFormVisible, setFirstFormVisible] = useState(false)
  const [secondFormVisible, setSecondFormVisible] = useState(false)
  const [errorMessages, setErrorMessages] = useState<Array<string>>([])

  useEffect(() => {
    if (offeringId) {
      ;(async () => {
        const response = await getOfferingById(offeringId)
        if (response && response.success) {
          setEditOfferingEntity(response.data)
          setInitialFormValue(response.data)

          setFirstFormVisible(false)
          setSecondFormVisible(true)
        }
      })()
    } else {
      setFirstFormVisible(true)
      setSecondFormVisible(false)
    }
  }, [offeringId])

  const handleOk = async () => {
    if (firstFormVisible && formInstance.getFieldValue("OfferingTypeID")) {
      onOfferingTypeSelected()
    } else if (secondFormVisible) {
      console.log(formInstance.getFieldsValue())
      const validationPassed = await formInstance.validateFields()
      console.log("validationPassed ", validationPassed)
      const params = formInstance.getFieldsValue()

      const serviceMethoToCall: (params: { [key: string]: any }) => Promise<IApiResponse> = offeringId
        ? updateOffering
        : createOffering
      const response = await serviceMethoToCall(params)

      if (response && response.success) {
        console.log(response)
        formInstance.resetFields()
        handleCancel()
      }
    }
  }
  const handleCancel = () => {
    if (closeCreateOfferingModal) {
      closeCreateOfferingModal()
    }
    console.log("initialFormValue ", initialFormValue)
    console.log("editOfferingEntity ", editOfferingEntity)

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
      showModal={true}
      width="800px"
      loading={!(firstFormVisible || secondFormVisible)}
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

const mapDispatchToProps = (dispatch: Dispatch) => {
  return { closeCreateOfferingModal: () => dispatch(showCreateOfferingModal(false)) }
}

export default connect(undefined, mapDispatchToProps)(CreateNewOffering)
