import React from "react"
import { connect } from "react-redux"
import { showCreateSectionScheduleModal } from "~/store/ModalState"
import { Dispatch } from "redux"
import { Button } from "antd"

interface IScheduleEditLinkProp {
  sectionId: number
  scheduleIds?: number
  openScheduleModal: (sectionId: number, scheduleIds?: number) => void
}
function ScheduleEditLink(props: IScheduleEditLinkProp) {
  return (
    <Button
      type="link"
      onClick={() => {
        props.openScheduleModal(props.sectionId, props.scheduleIds)
      }}
    >
      Edit
    </Button>
  )
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    openScheduleModal: (sectionId: number, scheduleIds?: number) => {
      return dispatch(showCreateSectionScheduleModal(true, { sectionId, scheduleIds }))
    }
  }
}

export default connect(null, mapDispatchToProps)(ScheduleEditLink)
