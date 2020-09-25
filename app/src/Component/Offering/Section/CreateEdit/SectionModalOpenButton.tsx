import React from "react"
import { Button } from "antd"
import { connect } from "react-redux"
import { showCreateSectionModal } from "~/store/ModalState"
import { Dispatch } from "redux"

interface ICreateActionButtonProp {
  openCreateSectionModal?: (OfferingID: number) => void
  OfferingID: number
}
function CreateActionButton(props: ICreateActionButtonProp) {
  return (
    <Button
      type="primary"
      style={{ float: "right" }}
      onClick={() => (props.openCreateSectionModal ? props.openCreateSectionModal(props.OfferingID) : null)}
    >
      + Create Section
    </Button>
  )
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    openCreateSectionModal: (OfferingID?: number) => dispatch(showCreateSectionModal(true, { OfferingID }))
  }
}

export default connect(null, mapDispatchToProps)(CreateActionButton)
