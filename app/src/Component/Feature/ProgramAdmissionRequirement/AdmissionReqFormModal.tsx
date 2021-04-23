import { Form, Typography } from "antd"
import * as React from "react"
import { useState } from "react"
import Modal from "~/Component/Common/Modal/index2"
import { AdmissionReqForm } from "~/Component/Feature/ProgramAdmissionRequirement/AdmissionReqForm"

interface IAdmissionReqFormProps {
  ProgramAdmReqGroupID?: number
  closeModal?: () => void
}

export function AdmissionReqFormModal(props: IAdmissionReqFormProps) {
  const [loading] = useState(false)
  const [initialFormValue] = useState<{ [key: string]: any }>({})
  const [formInstance] = Form.useForm()
  const [apiCallInProgress, setApiCallInProgress] = useState(false)
  const [errorMessages] = useState<Array<string>>([])

  const handleCancel = () => {
    if (props.closeModal) {
      props.closeModal()
    }
  }

  return (
    <Modal
      width="1000px"
      loading={loading}
      apiCallInProgress={apiCallInProgress}
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
          <AdmissionReqForm
            ProgramAdmReqGroupID={props.ProgramAdmReqGroupID}
            formInstance={formInstance}
            initialFormValue={initialFormValue}
            handleCancel={handleCancel}
            setApiCallInProgress={setApiCallInProgress}
          />
        </>
      }
    />
  )
}
