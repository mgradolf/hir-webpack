import * as React from "react"
import Modal from "~/Component/Common/Modal"
import { useState } from "react"
import { connect } from "react-redux"
import { Dispatch } from "redux"
import { showUpdateSectionScheduleInstructorModal } from "~/Store/ModalState"
import { Form } from "antd"
import { IScheduleInstructorFieldNames } from "~/Component/Feature/Section/Interfaces"
import ScheduleInstructorForm from "~/Component/Feature/Section/Schedule/ScheduleInstructorForm"

interface IScheduleProps {
  sectionId: number
  scheduleIds: any
  closeScheduleModal?: () => void
}

const fieldNames: IScheduleInstructorFieldNames = {
  ScheduleIDs: "ScheduleIDs",
  PersonIDs: "PersonIDs",
  ConflictCheck: "ConflictCheck"
}

function UpdateScheduleInstructor({ sectionId, scheduleIds, closeScheduleModal }: IScheduleProps) {
  const [formInstance] = Form.useForm()
  const [apiCallInProgress, setApiCallInProgress] = useState(false)

  const handleCancel = () => {
    if (closeScheduleModal) {
      closeScheduleModal()
    }
  }

  const initialFormValue: { [key in keyof IScheduleInstructorFieldNames]: any } = {
    ScheduleIDs: scheduleIds,
    PersonIDs: "",
    ConflictCheck: false
  }

  return (
    <Modal
      showModal={true}
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

const mapDispatchToProps = (dispatch: Dispatch) => {
  return { closeScheduleModal: () => dispatch(showUpdateSectionScheduleInstructorModal(false)) }
}

export default connect(undefined, mapDispatchToProps)(UpdateScheduleInstructor)
