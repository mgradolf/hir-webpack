import React from "react"
import { connect } from "react-redux"
import { showCreateSectionSeatGroupModal } from "~/Store/ModalState"
import { Dispatch } from "redux"
import { Button } from "antd"

interface ISeatGroupEditLinkProp {
  sectionId: number
  seatgroupId?: number
  programId?: number
  programCode?: string
  isDefault?: boolean
  openSeatGroupModal: (
    sectionId: number,
    seatgroupId?: number,
    programId?: number,
    programCode?: string,
    isDefault?: boolean
  ) => void
}
function SeatGroupEditLink(props: ISeatGroupEditLinkProp) {
  const { sectionId, seatgroupId, programId, programCode, isDefault } = props
  return (
    <Button
      type="link"
      onClick={() => {
        props.openSeatGroupModal(sectionId, seatgroupId, programId, programCode, isDefault)
      }}
    >
      Edit
    </Button>
  )
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    openSeatGroupModal: (
      sectionId: number,
      seatgroupId?: number,
      programId?: number,
      programCode?: string,
      isDefault?: boolean
    ) => {
      return dispatch(
        showCreateSectionSeatGroupModal(true, { sectionId, seatgroupId, programId, programCode, isDefault })
      )
    }
  }
}

export default connect(null, mapDispatchToProps)(SeatGroupEditLink)
