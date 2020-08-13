import * as React from "react"
import { Form } from "antd"
import Modal from "~/component/Modal"
import { getOfferingTypes } from "~/ApiServices/Service/RefLookupServiceWrap"
import { useEffect, useState } from "react"
import CreateForm1 from "~/component/Offering/CreateForm1"
import CreateForm2 from "~/component/Offering/CreateForm2"
import { IFieldNames } from "~/component/Offering/Interfaces"

interface ICreateNewOfferingProps {
  visible: boolean
  onClose: () => void
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

const initialFormValue: { [key: string]: any } = { [fieldNames.OfferingTypeID]: 1000 }

export default function CreateNewOffering(props: ICreateNewOfferingProps) {
  const [offeringTypes, setofferingTypes] = useState([])
  const [formInstance] = Form.useForm()
  // const [showModal, setShowModal] = useState(true)
  const [firstFormVisible, setFirstFormVisible] = useState(true)
  const [secondFormVisible, setSecondFormVisible] = useState(false)

  useEffect(() => {
    ;(async () => {
      const [response] = await getOfferingTypes()
      if (response) {
        setofferingTypes(response.data)
      }
    })()
  }, [])

  const handleOk = () => {
    if (firstFormVisible && formInstance.getFieldValue("OfferingTypeID")) {
      onOfferingTypeSelected()
    } else if (secondFormVisible) {
      formInstance.validateFields().then(() => {
        handleCancel()
      })
    }
  }
  const handleCancel = () => {
    props.onClose()
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
      showModal={props.visible}
      width="500px"
      children={
        <>
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
              onFormSubmission={() => {
                console.log(formInstance)
              }}
              goBackToFirstForm={goBackToOfferingTypeForm}
              handleOk={handleOk}
            />
          )}
        </>
      }
    />
  )
}
