import React from "react"
import { Button } from "antd"
import { connect } from "react-redux"
import { showUpdateSectionScheduleNoteModal } from "~/Store/ModalState"
import { Dispatch } from "redux"

interface ICreateActionButtonProp {
  scheduleIds: any
  openCreateScheduleNoteModal?: (scheduleIds: any) => void
}
function CreateActionButton(props: ICreateActionButtonProp) {
  const onClick = () => {
    if (props.openCreateScheduleNoteModal) props.openCreateScheduleNoteModal(props.scheduleIds)
  }
  return (
    <Button type="link" onClick={onClick}>
      Note
    </Button>
  )
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    openCreateScheduleNoteModal: (scheduleIds: any) =>
      dispatch(showUpdateSectionScheduleNoteModal(true, { scheduleIds }))
  }
}

export default connect(null, mapDispatchToProps)(CreateActionButton)
