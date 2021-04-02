import React from "react"
import { Button } from "antd"
import { connect } from "react-redux"
import { showCopySectionModal } from "~/Store/ModalState"
import { Dispatch } from "redux"

interface ISectionCopyModalOpenButton {
  openSectionCopyModal?: (sectionID: number, sectionNumber: string) => void
  SectionID: number
  SectionNumber: string
}
function SectionCopyModalOpenButton(props: ISectionCopyModalOpenButton) {
  return (
    <Button
      type="primary"
      style={{ zIndex: 10 }}
      onClick={() => {
        props.openSectionCopyModal && props.openSectionCopyModal(props.SectionID, props.SectionNumber)
      }}
    >
      Copy Section
    </Button>
  )
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    openSectionCopyModal: (sectionID: number, sectionNumber: string) =>
      dispatch(showCopySectionModal(true, { SectionID: sectionID, SectionNumber: sectionNumber }))
  }
}

export default connect(null, mapDispatchToProps)(SectionCopyModalOpenButton)
