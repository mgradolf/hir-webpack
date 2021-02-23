import { Form } from "antd"
import React, { useState } from "react"
import Modal from "~/Component/Common/Modal/index2"
import { IInstructorScheduleFieldNames } from "~/Component/Instructor/Interfaces"
import InstructorScheduleForm from "~/Component/Instructor/Forms/InstructorScheduleForm"

interface IInstructorScheduleFormModalProps {
  PersonID?: number
  closeModal?: () => void
}

const fieldNames: IInstructorScheduleFieldNames = {
  ScheduleID: "ScheduleID",
  PersonID: "PersonID",
  Name: "Name",
  Description: "Description",
  StartDate: "StartDate",
  EndDate: "EndDate",
  RecurringDate: "RecurringDate",
  Days: "Days"
}

export default function InstructorScheduleFormModal(props: IInstructorScheduleFormModalProps) {
  const [formInstance] = Form.useForm()
  const [editMode] = useState(false)
  const [apiCallInProgress, setApiCallInProgress] = useState(false)
  const [initialFormValue] = useState<{ [key: string]: any }>({ PersonID: props.PersonID })

  return (
    <Modal width="1000px" apiCallInProgress={apiCallInProgress}>
      <InstructorScheduleForm
        title={"Schedule"}
        editMode={editMode}
        fieldNames={fieldNames}
        initialFormValue={initialFormValue}
        formInstance={formInstance}
        setApiCallInProgress={setApiCallInProgress}
        closeModal={props.closeModal}
      />
    </Modal>
  )
}
