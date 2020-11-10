import * as React from "react"
import { Spin, Form, Input, Select, Button } from "antd"
import { searchQuestionResponse } from "~/ApiServices/Service/QuestionService"
import { useEffect } from "react"
import { QUESTION_EVENT_TYPE_REGISTRATION } from "~/utils/Constants"

const { useState } = React

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 6 }
}

const btnLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 8 }
}

interface IRegistrationQuestions {
  secitonID: any
  studentID: any
}

export default function RegistrationQuestionsForm(props: IRegistrationQuestions) {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)
  const [answerQuestions, setAnswerQuestions] = useState<Array<any>>([])

  useEffect(() => {
    ;(async function () {
      setLoading(true)
      const result = await searchQuestionResponse({
        EventID: QUESTION_EVENT_TYPE_REGISTRATION,
        SectionIDs: [props.secitonID],
        StudentIDs: [props.studentID]
      })

      if (result && result.success) {
        setAnswerQuestions(result.data)
      }
      setLoading(false)
    })()
  }, [props])

  const onFormSubmission = async () => {
    await form.validateFields()
    const params = form.getFieldsValue()
    console.log("params: ", params)
  }

  return (
    <Spin size="large" spinning={loading}>
      <Form form={form} style={{ height: "65vh", overflowY: "scroll", padding: "10px" }}>
        {answerQuestions.map((questionObj, index) => {
          const possibleOptions: Array<any> = questionObj.PossibleOptions
          if (possibleOptions !== null) {
            return (
              <Form.Item key={index} label={questionObj.Question} {...layout} name={questionObj.TagQuestionID}>
                <Select aria-label={questionObj.Question} defaultValue={questionObj.AnswerText}>
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
              <Form.Item key={index} label={questionObj.Question} {...layout} name={questionObj.TagQuestionID}>
                <Input defaultValue={questionObj.AnswerText} />
              </Form.Item>
            )
          }
        })}

        {!loading && (
          <Form.Item {...btnLayout}>
            <Button type="primary" style={{ float: "right" }} onClick={onFormSubmission}>
              Update
            </Button>
          </Form.Item>
        )}
      </Form>
    </Spin>
  )
}
