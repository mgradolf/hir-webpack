import React from "react"
import { Button } from "antd"
import { connect } from "react-redux"
import { showUpdateSectionScheduleInstructorModal } from "~/Store/ModalState"
import { Dispatch } from "redux"

interface ICreateActionButtonProp {
  scheduleIds: any
  openCreateScheduleInstructorModal?: (scheduleIds: any) => void
}
function CreateActionButton(props: ICreateActionButtonProp) {
  const onClick = () => {
    if (props.openCreateScheduleInstructorModal) props.openCreateScheduleInstructorModal(props.scheduleIds)
  }
  return (
    <Button type="link" onClick={onClick}>
      Instructor
    </Button>
  )
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    openCreateScheduleInstructorModal: (scheduleIds: any) =>
      dispatch(showUpdateSectionScheduleInstructorModal(true, { scheduleIds }))
  }
}

export default connect(null, mapDispatchToProps)(CreateActionButton)
