import React from "react"
import { Button } from "antd"
import { connect } from "react-redux"
import { showCreateOfferingPrerequisiteGroupModal } from "~/store/ModalState"
import { Dispatch } from "redux"

interface ICreateActionButtonProp {
  offeringId: number
  openCreateOfferingRequisiteGroupModal?: (offeringId: number) => void
}

function CreateActionButton(props: ICreateActionButtonProp) {
  const onClick = () => {
    if (props.openCreateOfferingRequisiteGroupModal) props.openCreateOfferingRequisiteGroupModal(props.offeringId)
  }
  return (
    <Button type="primary" style={{ marginRight: "5px" }} onClick={onClick}>
      + Add Group
    </Button>
  )
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    openCreateOfferingRequisiteGroupModal: (offeringId: number) =>
      dispatch(showCreateOfferingPrerequisiteGroupModal(true, { offeringId }))
  }
}

export default connect(null, mapDispatchToProps)(CreateActionButton)
