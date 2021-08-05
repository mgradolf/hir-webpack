import React, { useState } from "react"
import { Form, message } from "antd"
import { FormInstance } from "antd/lib/form"
import { VOID_SUCCESSFULLY } from "~/utils/Constants"
import { FormInput } from "~/Component/Common/Form/FormInput"
import { ISimplifiedApiErrorMessage } from "@packages/api/lib/utils/HandleResponse/ProcessedApiError"
import { CustomFormModalOpenButton } from "~/Component/Common/Modal/FormModal/CustomFormModalOpenButton"
import { voidCertificateWithEvent } from "~/ApiServices/BizApi/certificate/studentCertificateIF"
import { FormTextArea } from "~/Component/Common/Form/FormTextArea"
import { Redirect } from "react-router"
import "~/Sass/utils.scss"

interface ICertificateVoidFormProps {
  StudentCertificateID: number
  formInstance: FormInstance
}

function CertificateVoidForm(props: ICertificateVoidFormProps) {
  return (
    <>
      <FormInput
        hidden
        formInstance={props.formInstance}
        label={"Student Certificate ID"}
        ariaLabel={"Student Certificate ID"}
        fieldName="StudentCertificateID"
      />

      <FormTextArea
        formInstance={props.formInstance}
        label={"Enter Comments (Optional)"}
        ariaLabel={"Enter Comments (Optional)"}
        fieldName="Comment"
      />
    </>
  )
}

export function CertificateVoidFormOpenButton(props: { IsVoid: boolean; StudentCertificateID: number }) {
  const [formInstance] = Form.useForm()
  const [redirectAfterVoid, setRedirectAfterVoid] = useState<string>()
  const [apiCallInProgress, setApiCallInProgress] = useState(false)
  const [errorMessages, setErrorMessages] = useState<Array<ISimplifiedApiErrorMessage>>([])
  const [initialValues] = useState<{ [key: string]: any }>({ StudentCertificateID: props.StudentCertificateID })

  const onFormSubmission = async (closeModal: () => void) => {
    formInstance.validateFields().then((x) => {
      const params = formInstance.getFieldsValue()
      setErrorMessages([])
      setApiCallInProgress(true)
      voidCertificateWithEvent(params)
        .then((response) => {
          console.log("validation passed ", response)
          setApiCallInProgress(false)
          if (response && response.success) {
            formInstance.resetFields()
            message.success(VOID_SUCCESSFULLY)
            setRedirectAfterVoid(`/course/certificate`)
            closeModal()
          } else {
            console.log("validation failed ", response.error)
            setErrorMessages(response.error)
          }
        })
        .catch((y) => console.error(y))
    })
  }

  return (
    <>
      {redirectAfterVoid && <Redirect to={redirectAfterVoid} />}
      <CustomFormModalOpenButton
        formTitle={"Void Certificate"}
        customForm={
          <CertificateVoidForm StudentCertificateID={props.StudentCertificateID} formInstance={formInstance} />
        }
        formInstance={formInstance}
        onFormSubmission={onFormSubmission}
        initialValues={initialValues}
        apiCallInProgress={apiCallInProgress}
        iconType="danger"
        loading={apiCallInProgress}
        errorMessages={errorMessages}
        buttonLabel={"Void Certificate"}
        buttonProps={{ type: "primary", danger: true }}
        disabled={props.IsVoid}
      />
    </>
  )
}
