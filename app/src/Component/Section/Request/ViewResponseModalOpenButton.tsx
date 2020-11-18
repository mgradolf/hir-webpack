import React from "react"
import { Button } from "antd"
import { connect } from "react-redux"
import { showRequestViewResponseModal } from "~/Store/ModalState"
import { Dispatch } from "redux"

interface ICreateActionButtonProp {
  openViewResponseModal?: (requestJson: any) => void
  requestJson: any
}
function CreateActionButton(props: ICreateActionButtonProp) {
  return (
    <Button
      type="primary"
      style={{ marginLeft: "10px" }}
      onClick={() => (props.openViewResponseModal ? props.openViewResponseModal(props.requestJson) : null)}
    >
      View Response
    </Button>
  )
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    openViewResponseModal: (requestJson?: any) => dispatch(showRequestViewResponseModal(true, { requestJson }))
  }
}

export default connect(null, mapDispatchToProps)(CreateActionButton)
