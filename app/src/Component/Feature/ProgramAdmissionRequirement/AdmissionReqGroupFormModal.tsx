import * as React from "react"
import { useState, useEffect } from "react"
import { Form, Typography } from "antd"
import Modal from "~/Component/Common/Modal/index2"
import AdmissionReqGroupForm from "~/Component/Feature/ProgramAdmissionRequirement/AdmissionReqGroupForm"
import { getProgramAdmReqGroup } from "~/ApiServices/BizApi/program/programIF"

interface IAdmissionReqGroupProps {
  ProgramID: number
  ProgramAdmReqGroupID?: number
  closeModal?: () => void
}

export default function AdmissionReqGroupFormModal({
  closeModal,
  ProgramID,
  ProgramAdmReqGroupID
}: IAdmissionReqGroupProps) {
  const [loading, setLoading] = useState(false)
  const [initialFormValue] = useState<{ [key: string]: any }>({})
  const [formInstance] = Form.useForm()
  const [apiCallInProgress, setApiCallInProgress] = useState(false)
  const [errorMessages] = useState<Array<string>>([])

  const handleCancel = () => {
    if (closeModal) {
      closeModal()
    }
  }

  useEffect(() => {
    if (ProgramAdmReqGroupID) {
      ;(async () => {
        setLoading(true)
        const response = await getProgramAdmReqGroup({ ProgramAdmReqGroupID: ProgramAdmReqGroupID })

        if (response && response.success) {
          formInstance.setFieldsValue(response.data)
          if (response.data.MinMeet !== 0) {
            initialFormValue["RequirementMeet"] = false
          } else {
            initialFormValue["RequirementMeet"] = true
          }
        } else {
          if (closeModal) {
            closeModal()
          }
        }
        setLoading(false)
      })()
    }
  }, [ProgramAdmReqGroupID, closeModal, formInstance, initialFormValue])

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
          <AdmissionReqGroupForm
            ProgramID={ProgramID}
            ProgramAdmReqGroupID={ProgramAdmReqGroupID}
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
