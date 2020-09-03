import React from "react"
import { Button } from "antd"
import { connect } from "react-redux"
import { showCreateOfferingModal } from "~/store/ModalState"
import { Dispatch } from "redux"

interface IOfferingEditLinkProp {
  OfferingId: number
  PrimaryType: boolean | false
  openCreateOfferingModal: (OfferingId: number) => void
}
function OfferingEditLink(props: IOfferingEditLinkProp) {
  return (
    <Button
      type={props.PrimaryType ? "primary" : "link"}
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
      return dispatch(showCreateOfferingModal({ value: true, config: { OfferingId } }))
    }
  }
}

export default connect(null, mapDispatchToProps)(OfferingEditLink)
