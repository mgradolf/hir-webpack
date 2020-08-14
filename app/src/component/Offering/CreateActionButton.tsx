import React, { useState } from "react"
import { Button } from "antd"
import { connect } from "react-redux"
import { showCreateOfferingModal } from "~/store/ModalState"
import { Dispatch } from "redux"

interface ICreateActionButtonProp {
  openCreateOfferingModal?: () => void
}
function CreateActionButton(props: ICreateActionButtonProp) {
  return (
    <Button type="primary" onClick={props.openCreateOfferingModal}>
      + Create Offering
    </Button>
  )
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return { openCreateOfferingModal: () => dispatch(showCreateOfferingModal(true)) }
}

export default connect(null, mapDispatchToProps)(CreateActionButton)
