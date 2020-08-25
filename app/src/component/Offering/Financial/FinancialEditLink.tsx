import React from "react"
import { Button } from "antd"
import { connect } from "react-redux"
import { showCreateOfferingFinancialModal } from "~/store/ModalState"
import { Dispatch } from "redux"

interface IFinancialEditLinkProp {
  offeringId: number
  financialId?: number
  openFinancialModal: (offeringId: number, financialId?: number) => void
}
function FinancialEditLink(props: IFinancialEditLinkProp) {
  return (
    <Button
      block
      type="link"
      onClick={() => {
        props.openFinancialModal(props.offeringId, props.financialId)
      }}
    >
      Edit
    </Button>
  )
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    openFinancialModal: (offeringId: number, financialId?: number) => {
      return dispatch(showCreateOfferingFinancialModal(true, { offeringId, financialId }))
    }
  }
}

export default connect(null, mapDispatchToProps)(FinancialEditLink)
