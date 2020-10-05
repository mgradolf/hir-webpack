import * as React from "react"
import Modal from "~/Component/Common/Modal"
import { useState } from "react"
import { connect } from "react-redux"
import { Dispatch } from "redux"
import { showUpdateSectionScheduleLocationModal } from "~/Store/ModalState"
import { Form } from "antd"
import { IScheduleLocationFieldNames } from "~/Component/Section/Interfaces"
import ScheduleLocationForm from "~/Component/Section/Schedule/ScheduleLocationForm"

interface IScheduleProps {
  scheduleIds: any
  closeScheduleModal?: () => void
}

const fieldNames: IScheduleLocationFieldNames = {
  ScheduleIDs: "ScheduleIDs",
  SiteID: "SiteID",
  BuildingID: "BuildingID",
  RoomID: "RoomID",
  ConflictCheck: "ConflictCheck"
}

function UpdateScheduleLocation({ scheduleIds, closeScheduleModal }: IScheduleProps) {
  const [formInstance] = Form.useForm()
  const [apiCallInProgress, setApiCallInProgress] = useState(false)

  console.log("Schedule IDs: " + JSON.stringify(scheduleIds))

  const handleCancel = () => {
    if (closeScheduleModal) {
      closeScheduleModal()
    }
  }

  const initialFormValue: { [key in keyof IScheduleLocationFieldNames]: any } = {
    ScheduleIDs: scheduleIds,
    SiteID: "",
    BuildingID: "",
    RoomID: "",
    ConflictCheck: ""
  }

  return (
    <Modal
      showModal={true}
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

const mapDispatchToProps = (dispatch: Dispatch) => {
  return { closeScheduleModal: () => dispatch(showUpdateSectionScheduleLocationModal(false)) }
}

export default connect(undefined, mapDispatchToProps)(UpdateScheduleLocation)
