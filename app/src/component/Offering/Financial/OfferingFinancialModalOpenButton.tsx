import React from "react"
import { Button } from "antd"
import { connect } from "react-redux"
import { showCreateOfferingFinancialModal } from "~/store/ModalState"
import { Dispatch } from "redux"

interface ICreateActionButtonProp {
  openCreateOfferingFinancialModal?: () => void
}
function CreateActionButton(props: ICreateActionButtonProp) {
  return (
    <Button type="primary" onClick={props.openCreateOfferingFinancialModal}>
      + Create Offering Financial
    </Button>
  )
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return { openCreateOfferingFinancialModal: () => dispatch(showCreateOfferingFinancialModal({ value: true })) }
}

export default connect(null, mapDispatchToProps)(CreateActionButton)
