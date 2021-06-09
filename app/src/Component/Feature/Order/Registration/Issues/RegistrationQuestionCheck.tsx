import { Button } from "antd"
import React from "react"
import { IOverride, IRegistrationRequest } from "~/Component/Feature/Order/Model/Interface/IModel"

export const RegistrationQuestionCheck = (props: {
  item: IRegistrationRequest
  overRide: IOverride
  setOverRide: (overRide: IOverride) => void
}) => {
  return (
    <>
      {!props.item.issues?.RegistrationQuestionCheck_passed && (
        <li style={{ marginBottom: "15px" }}>
          <span
            style={{
              color: props.overRide.AnswerQuestion ? "green" : "red",
              textDecorationLine: props.overRide.AnswerQuestion ? "line-through" : "none"
            }}
          >
            There are unanswered Registration Questions.
          </span>
          &nbsp;
          <Button
            type="link"
            style={{ cursor: "pointer", color: props.overRide.AnswerQuestion ? "red" : "green" }}
            onClick={() => {
              props.setOverRide({
                ...props.overRide,
                AnswerQuestion: !props.overRide.AnswerQuestion
              })
            }}
          >
            Click here to {props.overRide.AnswerQuestion ? "Unwave it" : "Wave it"}.
          </Button>
          <br />
          <Button type="link" style={{ cursor: "pointer", fontWeight: 900 }}>
            Click here to Answer the questions.
          </Button>
        </li>
      )}
    </>
  )
}
