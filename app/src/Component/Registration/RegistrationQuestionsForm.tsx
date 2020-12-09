import * as React from "react"
import { Spin, Form, Input, Select, Button, Row, Col, Card } from "antd"
import { searchQuestionResponse, saveTagAnswers } from "~/ApiServices/Service/QuestionService"
import { useEffect } from "react"
import { QUESTION_EVENT_TYPE_REGISTRATION, REGISTRATION_QUESTION_NOT_FOUND } from "~/utils/Constants"

const { useState } = React

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 10 }
}

interface IRegistrationQuestions {
  sectionID: any
  studentID: any
}

export default function RegistrationQuestionsForm(props: IRegistrationQuestions) {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)
  const [answerQuestions, setAnswerQuestions] = useState<Array<any>>([])
  const [initialFormValue] = useState<{ [key: string]: any }>({})

  useEffect(() => {
    ;(async function () {
      setLoading(true)
      const result = await searchQuestionResponse({
        EventID: QUESTION_EVENT_TYPE_REGISTRATION,
        SectionIDs: [props.sectionID],
        StudentIDs: [props.studentID]
      })

      if (result && result.success) {
        setAnswerQuestions(result.data)
        result.data.forEach((object: any) => {
          initialFormValue[`${object.TagQuestionID}_${object.PersonID}`] = object.AnswerText
        })
      }
      setLoading(false)
    })()
  }, [props, initialFormValue])

  const onFormSubmission = async () => {
    await form.validateFields()
    const params = form.getFieldsValue()

    const answerList: Array<any> = []
    const objectKeys = Object.keys(params)
    objectKeys.forEach((key) => {
      const divideIDs: Array<any> = key.split("_")
      let answerText = ""
      if (params[key] !== undefined) {
        answerText = params[key]
      } else {
        answerText = initialFormValue[key]
      }

      answerList.push({
        SectionID: Number(props.sectionID),
        PersonID: Number(divideIDs[1]),
        TagQuestionID: Number(divideIDs[0]),
        AnswerText: answerText
      })
    })

    console.log("params: ", answerList)

    setLoading(true)
    const response = await saveTagAnswers({
      Answers: answerList
    })
    if (response && response.success) {
      console.log("Successfully updated......")
      window.location.reload()
    }
    setLoading(false)
  }

  return (
    <Row>
      <Col xs={24} sm={24} md={16}>
        <Card
          title={"Update Question Responses"}
          actions={[
            <Button type="primary" disabled={answerQuestions.length === 0} onClick={onFormSubmission}>
              Update
            </Button>
          ]}
        >
          <Spin size="large" spinning={loading}>
            <Form form={form} style={{ height: "50vh", overflowY: "scroll", padding: "10px" }}>
              {answerQuestions.map((questionObj, index) => {
                const possibleOptions: Array<any> = questionObj.PossibleOptions
                if (possibleOptions !== null) {
                  return (
                    <Form.Item
                      key={index}
                      label={questionObj.Question}
                      {...layout}
                      name={`${questionObj.TagQuestionID}_${questionObj.PersonID}`}
                    >
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
                    <Form.Item
                      key={index}
                      label={questionObj.Question}
                      {...layout}
                      name={`${questionObj.TagQuestionID}_${questionObj.PersonID}`}
                    >
                      <Input aria-label={questionObj.Question} defaultValue={questionObj.AnswerText} />
                    </Form.Item>
                  )
                }
              })}

              {answerQuestions.length === 0 && (
                <div
                  style={{
                    textAlign: "center",
                    margin: "auto",
                    fontSize: "2em",
                    opacity: 0.5,
                    marginTop: "20vh",
                    width: "50%"
                  }}
                >
                  {REGISTRATION_QUESTION_NOT_FOUND}
                </div>
              )}
            </Form>
          </Spin>
        </Card>
      </Col>
    </Row>
  )
}
