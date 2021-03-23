import * as React from "react"
import Modal from "~/Component/Common/Modal/index2"
import { useState } from "react"
import { Button, Form } from "antd"
import { IApplicationResubmitFieldNames } from "~/Component/Feature/ProgramApplication/Interfaces"
import ProgramApplicatioResubmitForm from "~/Component/Feature/ProgramApplication/ProgramApplicationResubmitForm"
import { PROGRAM_APP_REQ_ACCPETED, PROGRAM_APP_REQ_REJECTED, PROGRAM_APP_REQ_RESUBMIT } from "~/utils/Constants"

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

export default function ProgramApplicationResubmitFormModal({
  ProgramAppID,
  ProgramAdmReqID,
  closeModal
}: IProgramApplicationResubmitProps) {
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

export const ResubmitFormModalOpenButton = (props: {
  ProgramAppID: number
  ProgramAdmReqID: number
  CurrentStatusID: number | -1
}) => {
  const [showModal, setShowModal] = useState(false)
  return (
    <>
      {setShowModal && (
        <Button
          type="primary"
          style={{ marginRight: "10px" }}
          disabled={
            props.CurrentStatusID === PROGRAM_APP_REQ_RESUBMIT ||
            props.CurrentStatusID === PROGRAM_APP_REQ_ACCPETED ||
            props.CurrentStatusID === PROGRAM_APP_REQ_REJECTED
          }
          onClick={() => setShowModal && setShowModal(true)}
        >
          Resubmit
        </Button>
      )}
      {showModal && (
        <ProgramApplicationResubmitFormModal
          ProgramAppID={props.ProgramAppID}
          ProgramAdmReqID={props.ProgramAdmReqID}
          closeModal={() => setShowModal(false)}
        />
      )}
    </>
  )
}
