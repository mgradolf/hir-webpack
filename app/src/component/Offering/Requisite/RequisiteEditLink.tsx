import React from "react"
import { Button } from "antd"
import { connect } from "react-redux"
import { showCreateOfferingPrerequisiteGroupModal } from "~/store/ModalState"
import { Dispatch } from "redux"

interface IRequisiteGroupEditLinkProp {
  offeringId: number
  requisiteGroupId?: number
  openOfferingRequisiteGroupModal: (offeringId: number, requisiteGroupId?: number) => void
}
function RequisiteGroupEditLink(props: IRequisiteGroupEditLinkProp) {
  return (
    <Button
      type="primary"
      style={{ marginRight: "5px" }}
      onClick={() => {
        props.openOfferingRequisiteGroupModal(props.offeringId, props.requisiteGroupId)
      }}
    >
      Edit
    </Button>
  )
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    openOfferingRequisiteGroupModal: (offeringId: number, requisiteGroupId?: number) => {
      return dispatch(showCreateOfferingPrerequisiteGroupModal(true, { offeringId, requisiteGroupId }))
    }
  }
}

export default connect(null, mapDispatchToProps)(RequisiteGroupEditLink)
