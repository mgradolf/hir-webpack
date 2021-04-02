import React from "react"
import { Button } from "antd"
import { connect } from "react-redux"
import { showCreateDiscountModal } from "~/Store/ModalState"
import { Dispatch } from "redux"

interface ICreateActionButtonProp {
  sectionId: number
  openCreateBudgetModal?: (sectionId: number) => void
}
function CreateActionButton(props: ICreateActionButtonProp) {
  const onClick = () => {
    if (props.openCreateBudgetModal) props.openCreateBudgetModal(props.sectionId)
  }
  return (
    <Button type="primary" onClick={onClick}>
      + Add Discount Program
    </Button>
  )
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    openCreateBudgetModal: (sectionId: number) => dispatch(showCreateDiscountModal(true, { sectionId }))
  }
}

export default connect(null, mapDispatchToProps)(CreateActionButton)
