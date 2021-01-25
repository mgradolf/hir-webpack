import * as React from "react"
import Modal from "~/Component/Common/Modal/index2"
import { useState } from "react"
import { Form } from "antd"
import { IApplicationResubmitFieldNames } from "~/Component/ProgramApplication/Interfaces"
import ProgramApplicatioResubmitForm from "./ProgramApplicationResubmitForm"

interface IProgramApplicationResubmitProps {
  ProgramAppID: number
  ProgramAdmReqID?: number
  closeModal?: () => void
}

const fieldNames: IApplicationResubmitFieldNames = {
  CommentText: "CommentText",
  ReasonText: "ReasonText",
  ProgramAppID: "ProgramAppID",
  ProgramAdmReqID: "ProgramAdmReqID"
}

export default function ProgramApplicationResubmitFormModal({ ProgramAppID, ProgramAdmReqID, closeModal }: IProgramApplicationResubmitProps) {
  const [formInstance] = Form.useForm()
  const [apiCallInProgress, setApiCallInProgress] = useState(false)

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
          <ProgramApplicatioResubmitForm
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
