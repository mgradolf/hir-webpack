import React from "react"
import { Button } from "antd"
import { connect } from "react-redux"
import { showSectionCommmentModal } from "~/Store/ModalState"
import { Dispatch } from "redux"

interface ICommentCreateModalOpenButtonProp {
  openModal?: (SectionID: number) => void
  SectionID: number
}
function CommentCreateModalOpenButton(props: ICommentCreateModalOpenButtonProp) {
  return (
    <Button
      type="primary"
      style={{ float: "right" }}
      onClick={() => (props.openModal ? props.openModal(props.SectionID) : null)}
    >
      + Create Section Comment
    </Button>
  )
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    openModal: (SectionID: number) => dispatch(showSectionCommmentModal(true, { SectionID }))
  }
}

export default connect(null, mapDispatchToProps)(CommentCreateModalOpenButton)
