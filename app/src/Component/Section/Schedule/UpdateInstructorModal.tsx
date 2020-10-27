import React from "react"
import { Button } from "antd"
import { connect } from "react-redux"
import { showUpdateSectionScheduleInstructorModal } from "~/Store/ModalState"
import { Dispatch } from "redux"

interface ICreateActionButtonProp {
  sectionId: number
  scheduleIds: any
  openCreateScheduleInstructorModal?: (scheduleIds: any, sectionId: number) => void
}
function CreateActionButton(props: ICreateActionButtonProp) {
  const onClick = () => {
    if (props.openCreateScheduleInstructorModal)
      props.openCreateScheduleInstructorModal(props.scheduleIds, props.sectionId)
  }
  return (
    <Button type="link" onClick={onClick}>
      Instructor
    </Button>
  )
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    openCreateScheduleInstructorModal: (scheduleIds: any, sectionId: number) =>
      dispatch(showUpdateSectionScheduleInstructorModal(true, { scheduleIds, sectionId }))
  }
}

export default connect(null, mapDispatchToProps)(CreateActionButton)
