import { Form, Typography } from "antd"
import * as React from "react"
import { useEffect, useState } from "react"

import { getProgramAdmReq } from "~/ApiServices/BizApi/program/programIF"
import Modal from "~/Component/Common/Modal/index2"
import { AdmissionReqForm } from "~/Component/Feature/ProgramAdmissionRequirement/AdmissionReqForm"

interface IAdmissionReqFormProps {
  ProgramAdmReqGroupID?: number
  ProgramAdmReqID?: number
  closeModal?: () => void
}

export function AdmissionReqFormModal(props: IAdmissionReqFormProps) {
  const [loading, setLoading] = useState(false)
  const [initialFormValue] = useState<{ [key: string]: any }>({})
  const [formInstance] = Form.useForm()
  const [apiCallInProgress, setApiCallInProgress] = useState(false)
  const [errorMessages] = useState<Array<string>>([])

  useEffect(() => {
    if (props.ProgramAdmReqID) {
      ;(async () => {
        setLoading(true)
        const response = await getProgramAdmReq({ ProgramAdmReqID: props.ProgramAdmReqID })

        if (response && response.success) {
          formInstance.setFieldsValue(response.data)
        } else {
          if (props.closeModal) {
            props.closeModal()
          }
        }
        setLoading(false)
      })()
    }
    // eslint-disable-next-line
  }, [])

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
            ProgramAdmReqID={props.ProgramAdmReqID}
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
