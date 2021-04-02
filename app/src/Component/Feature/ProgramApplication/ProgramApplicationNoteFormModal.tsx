import * as React from "react"
import Modal from "~/Component/Common/Modal/index2"
import { useState } from "react"
import { Button, Form } from "antd"
import { IApplicationNoteFieldNames } from "~/Component/Feature/ProgramApplication/Interfaces"
import ProgramApplicationNoteForm from "~/Component/Feature/ProgramApplication/ProgramApplicationNoteForm"

interface IProgramApplicationNoteProps {
  ProgramAppID: number
  ProgramAdmReqID?: number
  closeModal?: () => void
}

const fieldNames: IApplicationNoteFieldNames = {
  CommentText: "CommentText",
  ProgramAppID: "ProgramAppID",
  ProgramAdmReqID: "ProgramAdmReqID"
}

export default function ProgramApplicationNoteFormModal({
  ProgramAppID,
  ProgramAdmReqID,
  closeModal
}: IProgramApplicationNoteProps) {
  const [formInstance] = Form.useForm()
  const [apiCallInProgress, setApiCallInProgress] = useState(false)

  formInstance.setFieldsValue({
    [fieldNames.ProgramAppID]: ProgramAppID
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
          <ProgramApplicationNoteForm
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

export const NoteFormModalOpenButton = (props: { ProgramAppID: number; ProgramAdmReqID: number }) => {
  const [showModal, setShowModal] = useState(false)
  return (
    <>
      {setShowModal && (
        <Button
          type="primary"
          className="programApplicationAddNoteBtn"
          onClick={() => setShowModal && setShowModal(true)}
        >
          Add Note
        </Button>
      )}
      {showModal && (
        <ProgramApplicationNoteFormModal
          ProgramAppID={props.ProgramAppID}
          ProgramAdmReqID={props.ProgramAdmReqID}
          closeModal={() => setShowModal(false)}
        />
      )}
    </>
  )
}
