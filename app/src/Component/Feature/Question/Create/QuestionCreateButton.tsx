import React, { useState } from "react"
import { Button } from "antd"
import { QuestionCreateModal } from "~/Component/Question/Create/QuestionCreateModal"

interface IQuestionCreateButtonProp {
  EventID?: number
  TagID?: number
}

export function QuestionCreateButton(props: IQuestionCreateButtonProp) {
  const [showModal, setShowModal] = useState(false)
  return (
    <>
      <Button
        type="primary"
        style={{ marginRight: "10px" }}
        disabled={!props.EventID || !props.TagID}
        onClick={() => {
          setShowModal(true)
        }}
      >
        + New Question
      </Button>
      {showModal && (
        <QuestionCreateModal EventID={props.EventID} TagID={props.TagID} closeModal={() => setShowModal(false)} />
      )}
    </>
  )
}
