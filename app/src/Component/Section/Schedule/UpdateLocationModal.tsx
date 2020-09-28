import React from "react"
import { Button } from "antd"
import { connect } from "react-redux"
import { showUpdateSectionScheduleLocationModal } from "~/Store/ModalState"
import { Dispatch } from "redux"

interface ICreateActionButtonProp {
  scheduleIds: any
  openCreateScheduleLocationModal?: (scheduleIds: any) => void
}
function CreateActionButton(props: ICreateActionButtonProp) {
  const onClick = () => {
    if (props.openCreateScheduleLocationModal) props.openCreateScheduleLocationModal(props.scheduleIds)
  }
  return (
    <Button type="link" onClick={onClick}>
      Location
    </Button>
  )
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    openCreateScheduleLocationModal: (scheduleIds: any) =>
      dispatch(showUpdateSectionScheduleLocationModal(true, { scheduleIds }))
  }
}

export default connect(null, mapDispatchToProps)(CreateActionButton)
