import React from "react"
import { Button } from "antd"
import { connect } from "react-redux"
import { showCreateOfferingFinancialModal } from "~/store/ModalState"
import { Dispatch } from "redux"

interface ICreateActionButtonProp {
  offeringId: number
  openCreateOfferingFinancialModal?: (offeringId: number) => void
}
function CreateActionButton(props: ICreateActionButtonProp) {
  const onClick = () => {
    if (props.openCreateOfferingFinancialModal) props.openCreateOfferingFinancialModal(props.offeringId)
  }
  return (
    <Button type="primary" onClick={onClick}>
      + Create Offering Financial
    </Button>
  )
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    openCreateOfferingFinancialModal: (offeringId: number) =>
      dispatch(showCreateOfferingFinancialModal({ value: true, config: { offeringId } }))
  }
}

export default connect(null, mapDispatchToProps)(CreateActionButton)
