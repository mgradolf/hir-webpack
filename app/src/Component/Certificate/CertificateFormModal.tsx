import "~/Sass/utils.scss"
import React, { useState } from "react"
import Modal from "~/Component/Common/Modal/index2"
import { Form, Button, Card } from "antd"
import { ISSUE_CERTIFICATE_SAVE_SUCCESS } from "~/utils/Constants"
import { issueCertificate, previewCertificate } from "~/ApiServices/Service/RegistrationService"
import Notification from "~/utils/notification"
import { ICertificateFieldNames } from "~/Component/Registration/Interfaces"
import CertificateForm from "~/Component/Certificate/CertificateForm"
import { ISimplifiedApiErrorMessage } from "@packages/api/lib/utils/HandleResponse/ProcessedApiError"
import { RESPONSE_TYPE } from "@packages/api/lib/utils/Interfaces"

interface ICertificateFormProps {
  isProgram?: boolean
  closeModal?: () => void
  initialFormValue?: { [key: string]: any }
}

const fieldNames: ICertificateFieldNames = {
  SectionID: "SectionID",
  StudentID: "StudentID",
  ProgramID: "ProgramID",
  CertificateID: "CertificateID",
  IssueDate: "IssueDate",
  ExpirationDate: "ExpirationDate",
  Comment: "Comment",
  IsProgram: "IsProgram"
}

export default function CertificateFormModal(props: ICertificateFormProps) {
  const [formInstance] = Form.useForm()
  const [initialFormValue] = useState<{ [key: string]: any }>(
    props.initialFormValue !== undefined ? props.initialFormValue : {}
  )
  const [apiCallInProgress, setApiCallInProgress] = useState(false)
  const [errorMessages, setErrorMessages] = useState<Array<ISimplifiedApiErrorMessage>>([])

  initialFormValue["IsProgram"] = props.isProgram

  const handleCancel = () => {
    if (props.closeModal) {
      props.closeModal()
    }
  }

  const viewCertificate = async () => {
    await formInstance.validateFields()
    const params = formInstance.getFieldsValue()
    params[RESPONSE_TYPE.PDF] = true

    console.log("Params: ", params)
    setApiCallInProgress(true)
    const response = await previewCertificate(params)
    if (response.data) {
      const file = new Blob([response.data], { type: "application/pdf" })
      const fileURL = URL.createObjectURL(file)
      window.open(fileURL)
    } else {
      setErrorMessages(response.error)
      console.log(response.error)
      console.log(errorMessages)
    }
    setApiCallInProgress(false)
  }

  const onFormSubmission = async () => {
    await formInstance.validateFields()
    const params = formInstance.getFieldsValue()

    setApiCallInProgress(true)
    setErrorMessages([])
    const response = await issueCertificate(params)
    if (response && response.success) {
      Notification(ISSUE_CERTIFICATE_SAVE_SUCCESS)
    } else {
      setErrorMessages(response.error)
      console.log(response.error)
      console.log(errorMessages)
    }
    setApiCallInProgress(false)
  }

  return (
    <Modal width="800px" loading={false} apiCallInProgress={apiCallInProgress}>
      <>
        <Card
          style={{ overflowY: "scroll", height: "65vh" }}
          title="Issue a Certificate"
          actions={[
            <Button onClick={handleCancel}>Cancel</Button>,
            <Button type="primary" onClick={viewCertificate}>
              Preview
            </Button>,
            <Button onClick={onFormSubmission}>Submit</Button>
          ]}
        >
          <CertificateForm
            fieldNames={fieldNames}
            formInstance={formInstance}
            initialFormValue={initialFormValue}
            setApiCallInProgress={setApiCallInProgress}
            errorMessages={errorMessages}
          />
        </Card>
      </>
    </Modal>
  )
}
