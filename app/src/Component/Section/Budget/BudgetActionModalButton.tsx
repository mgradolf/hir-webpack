import React from "react"
import { Button } from "antd"
import { connect } from "react-redux"
import { showCreateBudgetModal } from "~/Store/ModalState"
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
      + Create Budget Financials
    </Button>
  )
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    openCreateBudgetModal: (sectionId: number) => dispatch(showCreateBudgetModal(true, { sectionId }))
  }
}

export default connect(null, mapDispatchToProps)(CreateActionButton)
