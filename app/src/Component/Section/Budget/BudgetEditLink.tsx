import React from "react"
import { connect } from "react-redux"
import { showUpdateBudgetModal } from "~/Store/ModalState"
import { Dispatch } from "redux"
import { Button } from "antd"

interface IBudgetEditLinkProp {
  sectionId: number
  financialId: number
  seatGroups: Array<any>
  openUpdateBudgetModal: (sectionId: number, financialId: number, seatGroups: Array<any>) => void
}
function BudgetEditLink(props: IBudgetEditLinkProp) {
  return (
    <Button
      type="link"
      onClick={() => {
        props.openUpdateBudgetModal(props.sectionId, props.financialId, props.seatGroups)
      }}
    >
      Edit
    </Button>
  )
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    openUpdateBudgetModal: (sectionId: number, financialId: number, seatGroups: Array<any>) => {
      return dispatch(showUpdateBudgetModal(true, { sectionId, financialId, seatGroups }))
    }
  }
}

export default connect(null, mapDispatchToProps)(BudgetEditLink)
