import React from "react"
import { Button } from "antd"
import { connect } from "react-redux"
import { showAddContactModal } from "~/Store/ModalState"
import { Dispatch } from "redux"

interface ICreateActionButtonProp {
  openAddModal?: (AccountID: number) => void
  AccountID: number
}
function CreateActionButton(props: ICreateActionButtonProp) {
  return <Button onClick={() => (props.openAddModal ? props.openAddModal(props.AccountID) : null)}>Add</Button>
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    openAddModal: (AccountID?: number) => dispatch(showAddContactModal(true, { AccountID }))
  }
}

export default connect(null, mapDispatchToProps)(CreateActionButton)
