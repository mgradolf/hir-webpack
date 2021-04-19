import * as React from "react"
import Modal from "~/Component/Common/Modal/index2"
import { useState } from "react"
import { Form } from "antd"
import { IScheduleInstructorFieldNames } from "~/Component/Feature/Section/Interfaces"
import ScheduleInstructorForm from "~/Component/Feature/Section/Schedule/ScheduleInstructorForm"

interface IScheduleProps {
  sectionId: number
  scheduleIds: any
  closeModal?: () => void
}

const fieldNames: IScheduleInstructorFieldNames = {
  ScheduleIDs: "ScheduleIDs",
  PersonIDs: "PersonIDs",
  ConflictCheck: "ConflictCheck"
}

export default function UpdateScheduleInstructor({ sectionId, scheduleIds, closeModal }: IScheduleProps) {
  const [formInstance] = Form.useForm()
  const [apiCallInProgress, setApiCallInProgress] = useState(false)

  const handleCancel = () => {
    if (closeModal) {
      closeModal()
    }
  }

  const initialFormValue: { [key in keyof IScheduleInstructorFieldNames]: any } = {
    ScheduleIDs: scheduleIds,
    PersonIDs: "",
    ConflictCheck: false
  }

  return (
    <Modal
      width="800px"
      apiCallInProgress={apiCallInProgress}
      children={
        <>
          <ScheduleInstructorForm
            sectionId={sectionId}
            fieldNames={fieldNames}
            formInstance={formInstance}
            handleCancel={handleCancel}
            initialFormValue={initialFormValue}
            scheduleIds={scheduleIds}
            setApiCallInProgress={setApiCallInProgress}
          />
        </>
      }
    />
  )
}
