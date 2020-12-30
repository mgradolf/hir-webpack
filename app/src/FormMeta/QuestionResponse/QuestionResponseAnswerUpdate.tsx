import { Input, Select } from "antd"
import React, { useState } from "react"
import { saveTagAnswers } from "~/ApiServices/Service/QuestionService"
import { SaveOutlined } from "@ant-design/icons"

export const QuestionResponseAnswerUpdate = (props: { questionResponse: any }) => {
  const [currentAnswer, setCurrentAnswer] = useState(props.questionResponse.AnswerText)
  const [modifyingText, setModifyingText] = useState("")
  const [loading, setLoading] = useState(false)
  return props.questionResponse?.PossibleOptions && props.questionResponse?.PossibleOptions?.length > 0 ? (
    <Select
      style={{ width: "100%" }}
      loading={loading}
      value={currentAnswer}
      onChange={(value: string) => {
        setLoading(true)
        saveTagAnswers({
          Answers: [
            {
              AnswerText: value,
              SectionID: props.questionResponse.SectionID,
              PersonID: props.questionResponse.PersonID,
              TagQuestionID: props.questionResponse.TagQuestionID
            }
          ]
        })
          .then((x) => {
            if (x.success && x.data?.Message === "Success") setCurrentAnswer(value)
          })
          .finally(() => {
            setLoading(false)
          })
      }}
    >
      {props.questionResponse.PossibleOptions.map((x: any, i: number) => (
        <Select.Option key={i} value={x.Option}>
          {x.Option}
        </Select.Option>
      ))}
    </Select>
  ) : (
    <Input
      disabled={loading}
      defaultValue={currentAnswer}
      onChange={(event) => {
        setModifyingText(event.target.value)
      }}
      addonAfter={
        <SaveOutlined
          onClick={() => {
            setLoading(true)
            console.log(props.questionResponse)

            saveTagAnswers({
              Answers: [
                {
                  AnswerText: modifyingText,
                  PersonID: props.questionResponse.PersonID,
                  TagQuestionID: props.questionResponse.TagQuestionID
                }
              ]
            })
              .then((x) => {
                if (x.success && x.data?.Message === "Success") setCurrentAnswer(modifyingText)
              })
              .finally(() => {
                setLoading(false)
              })
          }}
        />
      }
    />
  )
}
