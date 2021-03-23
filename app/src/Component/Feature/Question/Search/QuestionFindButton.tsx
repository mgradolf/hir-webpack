import React, { useState } from "react"
import { Button } from "antd"
import { QuestionFindModal } from "~/Component/Feature/Question/Search/QuestionFindModal"

interface IQuestionFindButtonProp {
  EventID?: number
  TagID?: number
}
export function QuestionFindButton(props: IQuestionFindButtonProp) {
  const [showModal, setShowModal] = useState(false)
  return (
    <>
      <Button
        type="primary"
        style={{ marginRight: "10px" }}
        disabled={!props.EventID || !props.TagID}
        onClick={() => setShowModal(true)}
      >
        + Add Question
      </Button>
      {showModal && (
        <QuestionFindModal TagID={props.TagID} EventID={props.EventID} closeModal={() => setShowModal(false)} />
      )}
    </>
  )
}
