import React from "react"
import { Button } from "antd"
import { connect } from "react-redux"
import { showCreateSectionSeatGroupModal } from "~/Store/ModalState"
import { Dispatch } from "redux"

interface ICreateActionButtonProp {
  sectionId: number
  openCreateSectionSeatGroupModal?: (sectionId: number) => void
}
function CreateActionButton(props: ICreateActionButtonProp) {
  const onClick = () => {
    if (props.openCreateSectionSeatGroupModal) props.openCreateSectionSeatGroupModal(props.sectionId)
  }
  return (
    <Button type="primary" onClick={onClick}>
      + Create Seat Group
    </Button>
  )
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    openCreateSectionSeatGroupModal: (sectionId: number) =>
      dispatch(showCreateSectionSeatGroupModal(true, { sectionId }))
  }
}

export default connect(null, mapDispatchToProps)(CreateActionButton)
