import React from "react"
import { connect } from "react-redux"
import { showUpdateDiscountModal } from "~/Store/ModalState"
import { Dispatch } from "redux"
import { Button } from "antd"

interface IDiscountEditLinkProp {
  sectionId: number
  sectionDiscountId: number
  openUpdateDiscountModal: (sectionId: number, sectionDiscountId: number) => void
}
function DiscountEditLink(props: IDiscountEditLinkProp) {
  return (
    <Button
      type="link"
      onClick={() => {
        props.openUpdateDiscountModal(props.sectionId, props.sectionDiscountId)
      }}
    >
      Edit
    </Button>
  )
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    openUpdateDiscountModal: (sectionId: number, sectionDiscountId: number) => {
      return dispatch(showUpdateDiscountModal(true, { sectionId, sectionDiscountId }))
    }
  }
}

export default connect(null, mapDispatchToProps)(DiscountEditLink)
