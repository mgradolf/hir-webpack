import React from "react"
import { connect } from "react-redux"
import { showUpdateBudgetModal } from "~/Store/ModalState"
import { Dispatch } from "redux"
import { Button } from "antd"

interface IBudgetEditLinkProp {
  sectionId: number
  seatGroups: Array<any>
  sectionFinancialId: number
  openUpdateBudgetModal: (sectionId: number, seatGroups: Array<any>, sectionFinancialId: number) => void
}
function BudgetEditLink(props: IBudgetEditLinkProp) {
  return (
    <Button
      type="link"
      onClick={() => {
        props.openUpdateBudgetModal(props.sectionId, props.seatGroups, props.sectionFinancialId)
      }}
    >
      Edit
    </Button>
  )
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    openUpdateBudgetModal: (sectionId: number, seatGroups: Array<any>, sectionFinancialId: number) => {
      return dispatch(showUpdateBudgetModal(true, { sectionId, seatGroups, sectionFinancialId }))
    }
  }
}

export default connect(null, mapDispatchToProps)(BudgetEditLink)
