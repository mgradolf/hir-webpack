import * as React from "react"
import Modal from "~/Component/Common/Modal/index2"
import { useEffect, useState } from "react"
import { searchEnrollment } from "~/ApiServices/BizApi/program/programEnrollmentIF"
import { Form } from "antd"
import { IEnrollmentFieldNames } from "~/Component/ProgramEnrollment/Interfaces"
import ProgramEnrollmentForm from "~/Component/ProgramEnrollment/ProgramEnrollmentForm"

interface IUpdateProgramEnrollmentProps {
  enrollmentID: number
  closeModal?: () => void
}

const fieldNames: IEnrollmentFieldNames = {
  StatusID: "StatusID",
  StatusName: "StatusName",
  CommentText: "CommentText",
  MeetRequirement: "MeetRequirement",
  ProgramEnrollmentID: "ProgramEnrollmentID"
}

export default function UpdateProgramEnrollment({ enrollmentID, closeModal }: IUpdateProgramEnrollmentProps) {
  const [formInstance] = Form.useForm()
  const [apiCallInProgress, setApiCallInProgress] = useState(false)
  const [initialFormValue] = useState<{ [key: string]: any }>({})

  const handleCancel = () => {
    if (closeModal) {
      closeModal()
    }
  }

  useEffect(() => {
    if (enrollmentID) {
      ;(async () => {
        setApiCallInProgress(true)
        const response = await searchEnrollment({ enrollmentID })
        if (response && response.success) {
          formInstance.setFieldsValue(response.data[0])
        } else {
          if (closeModal) {
            closeModal()
          }
        }
        setApiCallInProgress(false)
      })()
    }
  }, [enrollmentID, closeModal, formInstance])

  return (
    <Modal
      width="800px"
      apiCallInProgress={apiCallInProgress}
      children={
        <>
          <ProgramEnrollmentForm
            enrollmentID={enrollmentID}
            handleCancel={handleCancel}
            setApiCallInProgress={setApiCallInProgress}
            initialFormValue={initialFormValue}
            fieldNames={fieldNames}
            formInstance={formInstance}
          />
        </>
      }
    />
  )
}
