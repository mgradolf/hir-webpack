import "~/Sass/utils.scss"
import React, { useState } from "react"
import { Form, Button } from "antd"
import { ISSUE_CERTIFICATE_SAVE_SUCCESS } from "~/utils/Constants"
import { issueCertificate, previewCertificate } from "~/ApiServices/Service/RegistrationService"
import Notification from "~/utils/notification"
import { ICertificateFieldNames } from "~/Component/Feature/Registration/Interfaces"
import { CertificateForm } from "~/Component/Feature/Certificate/CertificateForm"
import { ISimplifiedApiErrorMessage } from "@packages/api/lib/utils/HandleResponse/ProcessedApiError"
import { RESPONSE_TYPE } from "@packages/api/lib/utils/Interfaces"
import { eventBus, REFRESH_REGISTRATION_CERTIFICATE_PAGE } from "~/utils/EventBus"
import { CustomFormModalOpenButton } from "~/Component/Common/Modal/FormModal/CustomFormModalOpenButton"

interface ICertificateFormProps {
  isProgram?: boolean
  editMode?: boolean
  initialValues: { [key: string]: any }
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

export function CertificateFormModal(props: ICertificateFormProps) {
  const [formInstance] = Form.useForm()
  const [initialFormValue] = useState<{ [key: string]: any }>(
    props.initialValues !== undefined ? props.initialValues : {}
  )
  const [apiCallInProgress, setApiCallInProgress] = useState(false)
  const [loadingView, setLoadingView] = useState(false)
  const [errorMessages, setErrorMessages] = useState<Array<ISimplifiedApiErrorMessage>>([])

  initialFormValue["IsProgram"] = props.isProgram

  const viewCertificate = () => {
    formInstance.validateFields().then((params) => {
      params[RESPONSE_TYPE.PDF] = true

      setLoadingView(true)
      previewCertificate(params).then((response) => {
        if (response.success && response.data) {
          const file = new Blob([response.data], { type: "application/pdf" })
          const fileURL = URL.createObjectURL(file)
          window.open(fileURL)
        } else {
          setErrorMessages(response.error)
          console.log(response.error)
          console.log(errorMessages)
        }
        setLoadingView(false)
      })
    })
  }

  const onFormSubmission = async (closeModal: () => void) => {
    await formInstance.validateFields()
    const params = formInstance.getFieldsValue()

    setApiCallInProgress(true)
    setErrorMessages([])
    const response = await issueCertificate(params)
    if (response && response.success) {
      Notification(ISSUE_CERTIFICATE_SAVE_SUCCESS)
      eventBus.publish(REFRESH_REGISTRATION_CERTIFICATE_PAGE)
      closeModal()
    } else {
      setErrorMessages(response.error)
      console.log(response.error)
      console.log(errorMessages)
    }
    setApiCallInProgress(false)
  }

  return (
    <CustomFormModalOpenButton
      formTitle={props.editMode ? "Edit Issue Certificate" : "Issue Certificate"}
      customForm={
        <CertificateForm
          fieldNames={fieldNames}
          initialValue={props.initialValues}
          formInstance={formInstance}
          setApiCallInProgress={setApiCallInProgress}
        />
      }
      formInstance={formInstance}
      onFormSubmission={onFormSubmission}
      initialValues={props.initialValues}
      apiCallInProgress={apiCallInProgress}
      iconType={props.editMode ? "edit" : "create"}
      loading={apiCallInProgress}
      errorMessages={errorMessages}
      buttonLabel={props.editMode ? "Edit Issue Certificatee" : "Issue Certificate"}
      buttonProps={{ type: props.editMode ? "link" : "primary" }}
      extraButtons={[
        <Button type="primary" loading={loadingView} onClick={viewCertificate}>
          Preview
        </Button>
      ]}
    />
    // <Modal width="800px" loading={false} apiCallInProgress={apiCallInProgress}>
    //   <>
    //     <Card
    //       style={{ overflowY: "scroll", height: "65vh" }}
    //       title="Issue a Certificate"
    //       actions={[
    //         <Button onClick={handleCancel}>Cancel</Button>,
    //         <Button type="primary" onClick={viewCertificate}>
    //           Preview
    //         </Button>,
    //         <Button onClick={onFormSubmission}>Submit</Button>
    //       ]}
    //     >
    //       <CertificateForm
    //         fieldNames={fieldNames}
    //         formInstance={formInstance}
    //         initialFormValue={initialFormValue}
    //         setApiCallInProgress={setApiCallInProgress}
    //         errorMessages={errorMessages}
    //       />
    //     </Card>
    //   </>
    // </Modal>
  )
}
