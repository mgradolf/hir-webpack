import * as React from "react"
import Modal from "~/Component/Common/Modal/index2"
import { useState } from "react"
import { Button, Form } from "antd"
import { IApplicationStatusFieldNames } from "~/Component/Feature/ProgramApplication/Interfaces"
import ProgramApplicationStatusForm from "~/Component/Feature/ProgramApplication/ProgramApplicationStatusForm"
import { PROGRAM_APP_REQ_ACCPETED, PROGRAM_APP_REQ_REJECTED, PROGRAM_APP_REQ_RESUBMIT } from "~/utils/Constants"

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

export const RejectFormModalOpenButton = (props: {
  ProgramAppID: number
  ProgramAdmReqID: number
  CurrentStatusID: number | -1
}) => {
  const [showModal, setShowModal] = useState(false)
  return (
    <>
      {setShowModal && (
        <Button
          danger
          type="primary"
          style={{ marginRight: "10px" }}
          disabled={
            props.CurrentStatusID === PROGRAM_APP_REQ_REJECTED || props.CurrentStatusID === PROGRAM_APP_REQ_RESUBMIT
          }
          onClick={() => setShowModal && setShowModal(true)}
        >
          Reject
        </Button>
      )}
      {showModal && (
        <ProgramApplicationStatusFormModal
          ProgramAppID={props.ProgramAppID}
          ProgramAdmReqID={props.ProgramAdmReqID}
          StatusID={PROGRAM_APP_REQ_REJECTED}
          closeModal={() => setShowModal(false)}
        />
      )}
    </>
  )
}

export const AcceptFormModalOpenButton = (props: {
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
          disabled={props.CurrentStatusID === PROGRAM_APP_REQ_ACCPETED}
          onClick={() => setShowModal && setShowModal(true)}
        >
          Accept
        </Button>
      )}
      {showModal && (
        <ProgramApplicationStatusFormModal
          ProgramAppID={props.ProgramAppID}
          ProgramAdmReqID={props.ProgramAdmReqID}
          StatusID={PROGRAM_APP_REQ_ACCPETED}
          closeModal={() => setShowModal(false)}
        />
      )}
    </>
  )
}
