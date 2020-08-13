import * as React from "react"
import { Modal, Form } from "antd"
import { getOfferingTypes } from "~/ApiServices/Service/RefLookupServiceWrap"
import { useEffect, useState } from "react"
import CreateForm1 from "~/component/Offering/CreateForm1"
import CreateForm2 from "~/component/Offering/CreateForm2"
import { IFieldNames } from "~/component/Offering/Interfaces"

interface ICreateNewOfferingProps {
  visible: boolean
  onClose: (flag: boolean) => void
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
    props.onClose(false)
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
      title="Create offering"
      visible={props.visible}
      okText="Create"
      maskClosable={false}
      bodyStyle={{ maxHeight: "60vh", overflow: "auto" }}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      {firstFormVisible && (
        <CreateForm1
          fieldNames={fieldNames}
          initialFormValue={initialFormValue}
          formInstance={formInstance}
          offeringTypes={offeringTypes}
          onOfferingTypeSelected={onOfferingTypeSelected}
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
        />
      )}
    </Modal>
  )
}
