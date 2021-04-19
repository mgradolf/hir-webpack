import * as React from "react"
import Modal from "~/Component/Common/Modal/index2"
import { useState } from "react"
import { Form } from "antd"
import { IScheduleNoteFieldNames } from "~/Component/Feature/Section/Interfaces"
import ScheduleNoteForm from "~/Component/Feature/Section/Schedule/ScheduleNoteForm"

interface IScheduleProps {
  scheduleIds: any
  closeModal?: () => void
}

const fieldNames: IScheduleNoteFieldNames = {
  ScheduleIDs: "ScheduleIDs",
  InfoValue: "InfoValue",
  MeetingInformationTypeID: "MeetingInformationTypeID"
}

export default function UpdateScheduleNote({ scheduleIds, closeModal }: IScheduleProps) {
  const [formInstance] = Form.useForm()
  const [apiCallInProgress, setApiCallInProgress] = useState(false)

  const handleCancel = () => {
    if (closeModal) {
      closeModal()
    }
  }

  const initialFormValue: { [key in keyof IScheduleNoteFieldNames]: any } = {
    ScheduleIDs: scheduleIds,
    InfoValue: "",
    MeetingInformationTypeID: null
  }

  return (
    <Modal
      width="800px"
      apiCallInProgress={apiCallInProgress}
      children={
        <>
          <ScheduleNoteForm
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
