import React from "react"
import { Button } from "antd"
import { connect } from "react-redux"
import { showQuestionCreateModal } from "~/Store/ModalState"
import { Dispatch } from "redux"

interface IQuestionCreateButtonProp {
  openQuestionCreateModal?: (config: IQuestionCreateButtonProp) => void
  SectionID: number
  EventID?: number
  TagTypeID?: number
  TagID?: number
}
function QuestionCreateButton(props: IQuestionCreateButtonProp) {
  return (
    <Button
      type="primary"
      style={{ float: "right", zIndex: 10 }}
      disabled={!props.EventID || !props.TagTypeID || !props.TagID}
      onClick={() => {
        props.openQuestionCreateModal &&
          props.openQuestionCreateModal({
            SectionID: props.SectionID,
            EventID: props.EventID,
            TagTypeID: props.TagTypeID,
            TagID: props.TagID
          })
      }}
    >
      + Create Question
    </Button>
  )
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    openQuestionCreateModal: (config: IQuestionCreateButtonProp) => dispatch(showQuestionCreateModal(true, config))
  }
}

export default connect(null, mapDispatchToProps)(QuestionCreateButton)
