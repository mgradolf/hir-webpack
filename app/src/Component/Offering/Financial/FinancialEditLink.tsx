import React from "react"
import { connect } from "react-redux"
import { showCreateOfferingFinancialModal } from "~/Store/ModalState"
import { Dispatch } from "redux"
import { Button } from "antd"

interface IFinancialEditLinkProp {
  offeringId: number
  financialId?: number
  openFinancialModal: (offeringId: number, financialId?: number) => void
}
function FinancialEditLink(props: IFinancialEditLinkProp) {
  return (
    <Button
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
