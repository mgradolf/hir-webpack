import * as React from "react"
import Modal from "~/Component/Common/Modal/index2"
import { useState } from "react"
import ScheduleForm from "~/Component/Feature/Section/Schedule/ScheduleForm"
import { Form } from "antd"
import { IScheduleFieldNames } from "~/Component/Feature/Section/Interfaces"

interface IScheduleProps {
  scheduleIds?: number
  sectionId: number
  closeModal?: () => void
}

const fieldNames: IScheduleFieldNames = {
  SectionID: "SectionID",
  MeetingTypeID: "MeetingTypeID",
  StartTime: "StartTime",
  EndTime: "EndTime",
  MeetingDate: "MeetingDate",
  Occurrences: "Occurrences",
  Mon: "Mon",
  Tue: "Tue",
  Wed: "Wed",
  Thu: "Thu",
  Fri: "Fir",
  Sat: "Sat",
  Sun: "Sun",
  Frequency: "Frequency",
  ExcludeHoliday: "ExcludeHoliday"
}

export default function CreateNewSchedule({ scheduleIds, closeModal, sectionId }: IScheduleProps) {
  const [formInstance] = Form.useForm()
  const [apiCallInProgress, setApiCallInProgress] = useState(false)
  const [initialFormValue] = useState<{ [key: string]: any }>({})

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
          <ScheduleForm
            sectionId={sectionId}
            scheduleIds={scheduleIds}
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
