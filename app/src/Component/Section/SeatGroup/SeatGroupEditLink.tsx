import React from "react"
import { connect } from "react-redux"
import { showCreateSectionSeatGroupModal } from "~/Store/ModalState"
import { Dispatch } from "redux"
import { Button } from "antd"

interface ISeatGroupEditLinkProp {
  sectionId: number
  seatgroupId?: number
  openSeatGroupModal: (sectionId: number, seatgroupId?: number) => void
}
function SeatGroupEditLink(props: ISeatGroupEditLinkProp) {
  return (
    <Button
      type="link"
      onClick={() => {
        props.openSeatGroupModal(props.sectionId, props.seatgroupId)
      }}
    >
      Edit
    </Button>
  )
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    openSeatGroupModal: (sectionId: number, seatgroupId?: number) => {
      return dispatch(showCreateSectionSeatGroupModal(true, { sectionId, seatgroupId }))
    }
  }
}

export default connect(null, mapDispatchToProps)(SeatGroupEditLink)
