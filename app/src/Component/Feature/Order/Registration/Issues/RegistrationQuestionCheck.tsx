import React, { useEffect, useState } from "react"
import { Button, Card, Form, Spin, Input, Select } from "antd"
import { findPublishedAndActiveQuestionsWithOptions } from "~/ApiServices/Service/RequestActivityService"
import Modal from "~/Component/Common/Modal/index2"
import { IOverride, IRegistrationRequest } from "~/Component/Feature/Order/Model/Interface/IModel"

import { CartModelFunctionality } from "~/Component/Feature/Order/Model/CartModelFunctionality"
import zIndex from "~/utils/zIndex"
import { FormInstance } from "antd/lib/form"

export const QuestionResponseAnswerUpdate = (props: {
  questionResponses: any[]
  loading: boolean
  formInstance: FormInstance
}) => {
  return (
    <>
      {props.loading ? (
        <Spin style={{ display: "block", margin: "auto" }} size="large" spinning={true} />
      ) : (
        <Form
          form={props.formInstance}
          style={{
            maxHeight: "70vh",
            overflowY: "scroll"
          }}
        >
          {props.questionResponses.map((questionResponse) => (
            <>
              {questionResponse?.PossibleOptions && questionResponse?.PossibleOptions?.length > 0 ? (
                <Form.Item
                  label={questionResponse.Name}
                  name={questionResponse.TagQuestionID}
                  required={questionResponse.IsRequired}
                >
                  <Select style={{ width: "100%" }}>
                    {questionResponse.PossibleOptions.map((x: any, i: number) => (
                      <Select.Option key={i} value={x.Option}>
                        {x.Option}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              ) : (
                <Form.Item
                  label={questionResponse.Name}
                  name={questionResponse.TagQuestionID}
                  required={questionResponse.IsRequired}
                >
                  <Input />
                </Form.Item>
              )}
            </>
          ))}
        </Form>
      )}
    </>
  )
}

const RegistrationQuestionCheckModal = (props: {
  item: IRegistrationRequest
  cartModelFunctionality: CartModelFunctionality
}) => {
  const [showModal, setShowModal] = useState(false)
  const [questions, setQuestions] = useState<any[]>([])
  const [formInstance] = Form.useForm()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (showModal) {
      setLoading(true)
      findPublishedAndActiveQuestionsWithOptions({
        SeatGroupID: props.item.SeatGroupID,
        SeatGroupID2: props.item.SeatGroupID,
        PersonID: props.item.RecipientPersonID,
        PersonID2: props.item.RecipientPersonID,
        EventIDs: [1, 2]
      })
        .then((response) => {
          if (response.success) {
            setQuestions(response.data)
          }
        })
        .finally(() => setLoading(false))
    }
    // eslint-disable-next-line
  }, [showModal])
  return (
    <>
      <Button type="link" style={{ cursor: "pointer", fontWeight: 900 }} onClick={() => setShowModal(true)}>
        Click here to Answer the questions.
      </Button>
      {showModal && (
        <Modal width="600px" zIndex={zIndex.defaultModal + 10}>
          <Card
            title="Additional Registration Questions"
            actions={[
              <Button
                onClick={() => {
                  setShowModal(false)
                }}
              >
                Close
              </Button>,
              <Button
                type="primary"
                onClick={() => {
                  props.cartModelFunctionality.addAnswerMap(props.item.RequestID, formInstance.getFieldsValue())
                  setShowModal(false)
                }}
              >
                Apply
              </Button>
            ]}
          >
            <QuestionResponseAnswerUpdate loading={loading} formInstance={formInstance} questionResponses={questions} />
          </Card>
        </Modal>
      )}
    </>
  )
}

export const RegistrationQuestionCheck = (props: {
  item: IRegistrationRequest
  cartModelFunctionality: CartModelFunctionality
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
          <br />
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
            Click here to {props.overRide.AnswerQuestion ? "Unwave it" : "Wave it"}
          </Button>
          Or
          <RegistrationQuestionCheckModal {...props} />
        </li>
      )}
    </>
  )
}
