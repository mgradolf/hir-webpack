import React from "react"
import { Button } from "antd"
import { connect } from "react-redux"
import { showCreateOfferingModal } from "~/store/ModalState"
import { Dispatch } from "redux"

interface IOfferingEditLinkProp {
  OfferingId: number
  openCreateOfferingModal: (OfferingId: number) => void
}
function OfferingEditLink(props: IOfferingEditLinkProp) {
  return (
    <Button
      block
      type="link"
      onClick={() => {
        props.openCreateOfferingModal(props.OfferingId)
      }}
    >
      Edit
    </Button>
  )
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    openCreateOfferingModal: (OfferingId: number) => {
      console.log("dispacthing ", OfferingId)
      return dispatch(showCreateOfferingModal({ value: true, config: { OfferingId } }))
    }
  }
}

export default connect(null, mapDispatchToProps)(OfferingEditLink)
