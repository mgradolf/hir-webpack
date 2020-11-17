import * as React from "react"
import Modal from "~/Component/Common/Modal"
import { connect } from "react-redux"
import { Dispatch } from "redux"
import { showRequestQuestionAnswerModal, showRequestResolutionModal } from "~/Store/ModalState"
import { Card, Button, Form, Input, Select } from "antd"
import { findPublishedAndActiveQuestionsWithOptions } from "~/ApiServices/Service/RequestActivityService"
import { IParamsToBeDispatched } from "~/Pages/Request/Details"
import { eventBus, EVENT_REQUEST_RESOLUTION } from "~/utils/EventBus"
import { useEffect } from "react"
import { REQUEST_PROCESS_ACTION_NAME } from "~/utils/Constants"

const { useState } = React

const layout = {
  labelCol: { span: 12 }
}

interface IAnswerQuestionsModal {
  taskJson?: any
  fromVerification?: boolean
  closeAnswerQuestionsModal: (fromVerification: any) => void
}

function AnswerQuestionsModal(props: IAnswerQuestionsModal) {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)
  const [answerQuestions, setAnswerQuestions] = useState<Array<any>>([])
  const initialAnswer = props.taskJson.UpdatedResponse !== undefined ? props.taskJson.UpdatedResponse : {}

  useEffect(() => {
    ; (async function () {
      setLoading(true)
      const result = await findPublishedAndActiveQuestionsWithOptions({
        SeatGroupID: props.taskJson.TaskData.SeatGroupID,
        SeatGroupID2: props.taskJson.TaskData.SeatGroupID,
        PersonID: props.taskJson.TaskData.RecipientPersonID,
        PersonID2: props.taskJson.TaskData.RecipientPersonID,
        EventIDs: [1, 2]
      })

      if (result && result.success) {
        setAnswerQuestions(result.data)
      }
      setLoading(false)
    })()
  }, [props])

  const onFormSubmission = async () => {
    try {
      await form.validateFields()
      props.taskJson["UpdatedResponse"] = form.getFieldsValue()

      if (!props.fromVerification) {
        const params: any = {}
        params["QuestionAnswers"] = form.getFieldsValue()
        params["DependencyKey"] = props.taskJson.Issues[0].DependencyKey
        params["TaskKey"] = props.taskJson.Key
        params["ProcessActionName"] = REQUEST_PROCESS_ACTION_NAME.ANSWER_QUESTIONS

        const answer: IParamsToBeDispatched = {
          ValueUpdate: true,
          Params: params
        }
        eventBus.publish(EVENT_REQUEST_RESOLUTION, answer)
      }
      props.closeAnswerQuestionsModal && props.closeAnswerQuestionsModal(props.fromVerification)
    } catch (errorInfo) {
      console.log("Failed:", errorInfo)
    }
  }

  return (
    <Modal showModal={true} width="800px" apiCallInProgress={loading} closable={true}>
      <Card
        title="Additional registration questions"
        actions={[
          <Button type="ghost" onClick={() => props.closeAnswerQuestionsModal(props.fromVerification)}>
            Cancel
          </Button>,
          <Button type="primary" onClick={onFormSubmission}>
            Update
          </Button>
        ]}
      >
        <Form
          initialValues={initialAnswer}
          form={form}
          style={{ height: "65vh", overflowY: "scroll", padding: "10px" }}
        >
          <Form.Item label="Student" {...layout}>
            <Input disabled value={props.taskJson.TaskData.RecipientPersonName} />
          </Form.Item>
          {answerQuestions.map((questionObj, index) => {
            const possibleOptions: Array<any> = questionObj.PossibleOptions
            if (possibleOptions !== null) {
              return (
                <Form.Item
                  key={index}
                  label={questionObj.Name}
                  {...layout}
                  rules={[{ required: questionObj.IsRequired, message: "Please select your answer!" }]}
                  name={questionObj.TagQuestionID}
                >
                  <Select aria-label={questionObj.Name}>
                    <>
                      {possibleOptions.map((x) => {
                        return (
                          <Select.Option key={`${x.TagQuestionID}_${x.Option}`} value={x.Option}>
                            {x.Option}
                          </Select.Option>
                        )
                      })}
                    </>
                  </Select>
                </Form.Item>
              )
            } else {
              return (
                <Form.Item
                  key={index}
                  label={questionObj.Name}
                  rules={[{ required: questionObj.IsRequired, message: "Please input your answer!" }]}
                  {...layout}
                  name={questionObj.TagQuestionID}
                >
                  <Input />
                </Form.Item>
              )
            }
          })}
        </Form>
      </Card>
    </Modal>
  )
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    closeAnswerQuestionsModal: (fromVerification: boolean) => {
      if (fromVerification) {
        return dispatch(showRequestQuestionAnswerModal(false))
      }
      return dispatch(showRequestResolutionModal(false))
    }
  }
}

export default connect(undefined, mapDispatchToProps)(AnswerQuestionsModal)
