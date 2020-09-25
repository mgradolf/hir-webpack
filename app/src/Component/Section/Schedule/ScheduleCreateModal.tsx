import React from "react"
import { Button } from "antd"
import { connect } from "react-redux"
import { showCreateSectionScheduleModal } from "~/store/ModalState"
import { Dispatch } from "redux"

interface ICreateActionButtonProp {
  sectionId: number
  scheduleIds?: any
  openCreateSectionScheduleModal?: (sectionId: number, scheduleIds: any) => void
}
function CreateActionButton(props: ICreateActionButtonProp) {
  const onClick = () => {
    if (props.openCreateSectionScheduleModal) props.openCreateSectionScheduleModal(props.sectionId, props.scheduleIds)
  }
  return (
    <>
      {Array.isArray(props.scheduleIds) && (
        <Button type="link" onClick={onClick}>
          Schedule
        </Button>
      )}
      {!Array.isArray(props.scheduleIds) && (
        <Button type="primary" onClick={onClick}>
          + Create Schedule
        </Button>
      )}
    </>
  )
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    openCreateSectionScheduleModal: (sectionId: number, scheduleIds: any) =>
      dispatch(showCreateSectionScheduleModal(true, { sectionId, scheduleIds }))
  }
}

export default connect(null, mapDispatchToProps)(CreateActionButton)
