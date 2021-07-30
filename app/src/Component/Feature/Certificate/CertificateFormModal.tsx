import "~/Sass/utils.scss"
import React, { useState } from "react"
import { Form, Button, message } from "antd"
import { ISSUE_CERTIFICATE_SAVE_SUCCESS, REGISTRATION_ENROLLMENT_STATUS_COMPLETED } from "~/utils/Constants"
import { issueCertificate, previewCertificate } from "~/ApiServices/Service/RegistrationService"
import { ICertificateFieldNames } from "~/Component/Feature/Registration/Interfaces"
import { CertificateForm } from "~/Component/Feature/Certificate/CertificateForm"
import { ISimplifiedApiErrorMessage } from "@packages/api/lib/utils/HandleResponse/ProcessedApiError"
import { RESPONSE_TYPE } from "@packages/api/lib/utils/Interfaces"
import { CustomFormModalOpenButton } from "~/Component/Common/Modal/FormModal/CustomFormModalOpenButton"
import { Redirect } from "react-router"

interface ICertificateFormProps {
  isProgram?: boolean
  editMode?: boolean
  initialValues: { [key: string]: any }
}

const fieldNames: ICertificateFieldNames = {
  SectionID: "SectionID",
  SectionNumber: "SectionNumber",
  StudentID: "StudentID",
  StudentName: "StudentName",
  ProgramID: "ProgramID",
  CertificateID: "CertificateID",
  IssueDate: "IssueDate",
  ExpirationDate: "ExpirationDate",
  Comment: "Comment",
  IsProgram: "IsProgram"
}

export function CertificateFormModal(props: ICertificateFormProps) {
  const [formInstance] = Form.useForm()
  const [redirectAfterCreate, setRedirectAfterCreate] = useState<string>()
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
      message.success(ISSUE_CERTIFICATE_SAVE_SUCCESS)
      if (props.isProgram) {
        setRedirectAfterCreate(`/program/certificate/${response.data.StudentCertificateID}`)
      } else {
        setRedirectAfterCreate(`/course/certificate/${response.data.StudentCertificateID}`)
      }
      closeModal()
    } else {
      setErrorMessages(response.error)
      console.log(response.error)
      console.log(errorMessages)
    }
    setApiCallInProgress(false)
  }

  return (
     <>
      {redirectAfterCreate && <Redirect to={redirectAfterCreate} />}
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
        disabled={
          props.initialValues.EnrollmentStatus !== undefined &&
          props.initialValues.EnrollmentStatus !== REGISTRATION_ENROLLMENT_STATUS_COMPLETED
        }
      />
    </>
  )
}
