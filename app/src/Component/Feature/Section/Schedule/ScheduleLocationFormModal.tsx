import * as React from "react"
import Modal from "~/Component/Common/Modal/index2"
import { useState } from "react"
import { Form } from "antd"
import { IScheduleLocationFieldNames } from "~/Component/Feature/Section/Interfaces"
import ScheduleLocationForm from "~/Component/Feature/Section/Schedule/ScheduleLocationForm"

interface IScheduleProps {
  scheduleIds: any
  closeModal?: () => void
}

const fieldNames: IScheduleLocationFieldNames = {
  ScheduleIDs: "ScheduleIDs",
  SiteID: "SiteID",
  BuildingID: "BuildingID",
  RoomID: "RoomID",
  ConflictCheck: "ConflictCheck"
}

export default function UpdateScheduleLocation({ scheduleIds, closeModal }: IScheduleProps) {
  const [formInstance] = Form.useForm()
  const [apiCallInProgress, setApiCallInProgress] = useState(false)

  const handleCancel = () => {
    if (closeModal) {
      closeModal()
    }
  }

  const initialFormValue: { [key in keyof IScheduleLocationFieldNames]: any } = {
    ScheduleIDs: scheduleIds,
    SiteID: "",
    BuildingID: "",
    RoomID: "",
    ConflictCheck: false
  }

  return (
    <Modal
      width="800px"
      apiCallInProgress={apiCallInProgress}
      children={
        <>
          <ScheduleLocationForm
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
