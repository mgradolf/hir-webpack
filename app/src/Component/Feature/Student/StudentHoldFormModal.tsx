import { Form } from "antd"
import React, { useState } from "react"
import Modal from "~/Component/Common/Modal/index2"
import { IStudentHoldFieldNames } from "~/Component/Feature/Student/Interfaces"
import StudentHoldForm from "~/Component/Feature/Student/Forms/StudentHoldForm"

interface IStudentHoldFormModalProps {
  initialData: { [key: string]: any }
  closeModal?: () => void
}

const fieldNames: IStudentHoldFieldNames = {
  StudentHoldID: "StudentHoldID",
  StudentID: "StudentID",
  HoldTypeID: "HoldTypeID",
  HoldReasonID: "HoldReasonID",
  StartDate: "StartDate",
  ReleaseDate: "ReleaseDate",
  Note: "Note",
  HoldBy: "HoldBy"
}

export function StudentHoldFormModal(props: IStudentHoldFormModalProps) {
  const [formInstance] = Form.useForm()
  const [apiCallInProgress, setApiCallInProgress] = useState(false)
  const [initialFormValue] = useState<{ [key: string]: any }>(props.initialData)

  return (
    <Modal width="1000px" apiCallInProgress={apiCallInProgress}>
      <StudentHoldForm
        fieldNames={fieldNames}
        initialFormValue={initialFormValue}
        formInstance={formInstance}
        setApiCallInProgress={setApiCallInProgress}
        closeModal={props.closeModal}
      />
    </Modal>
  )
}
