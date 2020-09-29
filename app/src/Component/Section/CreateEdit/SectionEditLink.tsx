import React from "react"
import { Button } from "antd"
import { connect } from "react-redux"
import { showCreateSectionModal } from "~/Store/ModalState"
import { Dispatch } from "redux"

interface ISectionEditLinkProp {
  SectionID: number
  PrimaryType: boolean | false
  style?: { [key: string]: string }
  openSectionEditModal: (OfferingId: number) => void
}
function SectionEditLink(props: ISectionEditLinkProp) {
  return (
    <Button
      style={props.style}
      type={props.PrimaryType ? "primary" : "link"}
      onClick={() => {
        props.openSectionEditModal(props.SectionID)
      }}
    >
      Edit
    </Button>
  )
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    openSectionEditModal: (SectionID: number) => {
      return dispatch(showCreateSectionModal(true, { SectionID }))
    }
  }
}

export default connect(null, mapDispatchToProps)(SectionEditLink)
