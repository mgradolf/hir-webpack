import * as React from "react"
import Modal from "~/Component/Common/Modal"
import { useState } from "react"
import { connect } from "react-redux"
import { Dispatch } from "redux"
import { showUpdateSectionScheduleNoteModal } from "~/Store/ModalState"
import { Form } from "antd"
import { IScheduleNoteFieldNames } from "~/Component/Section/Interfaces"
import ScheduleNoteForm from "~/Component/Section/Schedule/ScheduleNoteForm"

interface IScheduleProps {
  scheduleIds: any
  closeModal?: () => void
}

const fieldNames: IScheduleNoteFieldNames = {
  ScheduleIDs: "ScheduleIDs",
  InfoValue: "InfoValue",
  MeetingInformationTypeID: "MeetingInformationTypeID"
}

function UpdateScheduleNote({ scheduleIds, closeModal }: IScheduleProps) {
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
      showModal={true}
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

const mapDispatchToProps = (dispatch: Dispatch) => {
  return { closeModal: () => dispatch(showUpdateSectionScheduleNoteModal(false)) }
}

export default connect(undefined, mapDispatchToProps)(UpdateScheduleNote)
