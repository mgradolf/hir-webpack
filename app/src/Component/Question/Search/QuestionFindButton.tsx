import React from "react"
import { Button } from "antd"
import { connect } from "react-redux"
import { showQuestionFindModal } from "~/Store/ModalState"
import { Dispatch } from "redux"

interface IQuestionFindButtonProp {
  openQuestionFindModal?: (config: any) => void
  SectionID: number
  EventID?: number
  TagTypeID?: number
  TagID?: number
}
function QuestionFindButton(props: IQuestionFindButtonProp) {
  return (
    <Button
      type="primary"
      style={{ float: "right", zIndex: 10, marginRight: "10px" }}
      disabled={!props.EventID || !props.TagID}
      onClick={() => {
        props.openQuestionFindModal &&
          props.openQuestionFindModal({
            SectionID: props.SectionID,
            EventID: props.EventID,
            TagTypeID: props.TagTypeID,
            TagID: props.TagID
          })
      }}
    >
      + Find Question
    </Button>
  )
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    openQuestionFindModal: (config: any) => dispatch(showQuestionFindModal(true, config))
  }
}

export default connect(null, mapDispatchToProps)(QuestionFindButton)
