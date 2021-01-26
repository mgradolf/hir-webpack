import * as React from "react"
import Modal from "~/Component/Common/Modal/index2"
import { useState } from "react"
import { Form } from "antd"
import { IApplicationStatusFieldNames } from "~/Component/ProgramApplication/Interfaces"
import ProgramApplicationStatusForm from "~/Component/ProgramApplication/ProgramApplicationStatusForm"

interface IProgramApplicationStatusProps {
  ProgramAppID: number
  ProgramAdmReqID?: number
  StatusID: number
  closeModal?: () => void
}

const fieldNames: IApplicationStatusFieldNames = {
  StatusID: "StatusID",
  CommentText: "CommentText",
  ProgramAppID: "ProgramAppID",
  ProgramAdmReqID: "ProgramAdmReqID"
}

export default function ProgramApplicationStatusFormModal({
  ProgramAppID,
  ProgramAdmReqID,
  StatusID,
  closeModal
}: IProgramApplicationStatusProps) {
  const [formInstance] = Form.useForm()
  const [apiCallInProgress, setApiCallInProgress] = useState(false)

  formInstance.setFieldsValue({
    [fieldNames.StatusID]: StatusID
  })

  const handleCancel = () => {
    if (closeModal) {
      closeModal()
    }
  }

  return (
    <Modal
      width="800px"
      apiCallInProgress={apiCallInProgress}
      children={
        <>
          <ProgramApplicationStatusForm
            ProgramAppID={ProgramAppID}
            ProgramAdmReqID={ProgramAdmReqID}
            handleCancel={handleCancel}
            setApiCallInProgress={setApiCallInProgress}
            fieldNames={fieldNames}
            formInstance={formInstance}
          />
        </>
      }
    />
  )
}
