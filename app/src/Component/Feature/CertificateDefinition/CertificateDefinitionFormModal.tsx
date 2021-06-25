import React, { useState } from "react"
import { Form, message } from "antd"
import { SAVE_SUCCESSFULLY, UPDATE_SUCCESSFULLY } from "~/utils/Constants"
import { CertificateDefinitionForm } from "~/Component/Feature/CertificateDefinition/CertificateDefinitionForm"
import { ISimplifiedApiErrorMessage } from "@packages/api/lib/utils/HandleResponse/ProcessedApiError"
import { CustomFormModalOpenButton } from "~/Component/Common/Modal/FormModal/CustomFormModalOpenButton"
import { Redirect } from "react-router"
import { saveOrUpdateCertificate } from "~/ApiServices/Service/CertificateService"
import "~/Sass/utils.scss"
import { eventBus, REFRESH_PAGE } from "~/utils/EventBus"

interface ICertificateDefinitionFormProps {
  editMode?: boolean
  initialValues: { [key: string]: any }
}

export function CertificateDefinitionFormModal(props: ICertificateDefinitionFormProps) {
  const [formInstance] = Form.useForm()
  const [redirectAfterCreate, setRedirectAfterCreate] = useState<string>()
  const [apiCallInProgress, setApiCallInProgress] = useState(false)
  const [errorMessages, setErrorMessages] = useState<Array<ISimplifiedApiErrorMessage>>([])

  const onFormSubmission = async (closeModal: () => void) => {
    await formInstance.validateFields()
    const params = formInstance.getFieldsValue(true)

    const parameters = params["ParameterName"]
    const paramValues: { [key: string]: any } = {}
    parameters.map((x: any) => {
      paramValues[x] = params[x]
      return paramValues
    })
    params["StaticParameter"] = paramValues

    setApiCallInProgress(true)
    setErrorMessages([])
    const response = await saveOrUpdateCertificate(params)
    if (response && response.success) {
      if (!props.editMode) {
        message.success(SAVE_SUCCESSFULLY)
        setRedirectAfterCreate(`/data/certificate/${response.data.CertificateID}`)
      } else {
        eventBus.publish(REFRESH_PAGE)
        message.success(UPDATE_SUCCESSFULLY)
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
        formTitle={props.editMode ? "Update Certificate" : "Create Certificate"}
        customForm={
          <CertificateDefinitionForm
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
        buttonLabel={props.editMode ? "Update Certificatee" : "Create Certificate"}
        buttonProps={{ type: props.editMode ? "link" : "primary" }}
      />
    </>
  )
}
