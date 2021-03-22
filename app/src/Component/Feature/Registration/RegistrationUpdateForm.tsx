import React, { useEffect, useState } from "react"
import { Form, Button, Input, Select, Switch, DatePicker, Spin, Card, Divider } from "antd"
import { ISimplifiedApiErrorMessage } from "@packages/api/lib/utils/HandleResponse/ProcessedApiError"
import { OldFormError } from "~/Component/Common/OldForm/OldFormError"
import { DATE_TIME_FORMAT, QUESTION_EVENT_TYPE_REGISTRATION, REQUEST_DATE_TIME_FORMAT } from "~/utils/Constants"
import { getGradeScaleType, getCreditType } from "~/ApiServices/Service/RefLookupService"
import { editRegistration } from "~/ApiServices/Service/RegistrationService"
import { IRegistrationFieldNames } from "~/Component/Registration/Interfaces"
import { eventBus, REFRESH_REGISTRATION_DETAIL_PAGE } from "~/utils/EventBus"
import { searchQuestionResponse, saveTagAnswers } from "~/ApiServices/Service/QuestionService"
import "~/Sass/utils.scss"
import moment from "moment"

interface IRegistrationUpdateFormProps {
  initialFormValue: { [key: string]: any }
  closeModal?: () => void
  handleCancel: () => void
}

const fieldNames: IRegistrationFieldNames = {
  SectionID: "SectionID",
  StudentID: "StudentID",
  SeatGroupID: "SeatGroupID",
  IsRepeat: "IsRepeat",
  IsCompleteOnTermination: "IsCompleteOnTermination",
  StatusDate: "StatusDate",
  CreationTime: "CreationTime",
  TerminationTime: "TerminationTime",
  GradeScaleTypeID: "GradeScaleTypeID",
  TranscriptCreditTypeID: "TranscriptCreditTypeID",
  AttendanceExpected: "AttendanceExpected"
}

const layout = {
  labelCol: { span: 10 }
}

export default function RegistrationUpdateForm(props: IRegistrationUpdateFormProps) {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState<boolean>(false)
  const [gradeScaleItems, setGradeScaleItems] = useState<Array<any>>([])
  const [transcriptItems, setTranscriptItems] = useState<Array<any>>([])
  const [errorMessages, setErrorMessages] = useState<Array<ISimplifiedApiErrorMessage>>([])
  const [answerQuestions, setAnswerQuestions] = useState<Array<any>>([])

  const creationTime = props.initialFormValue.CreationTime
  const terminationTime = props.initialFormValue.TerminationTime
  const completionDate = props.initialFormValue.CompletionDate

  useEffect(() => {
    ;(async function () {
      const result = await getGradeScaleType()
      if (result && result.success) {
        setGradeScaleItems(result.data)
      }
    })()
    ;(async function () {
      const result = await getCreditType()
      if (result && result.success) {
        setTranscriptItems(result.data)
      }
    })()
    ;(async function () {
      setLoading(true)
      const result = await searchQuestionResponse({
        EventID: QUESTION_EVENT_TYPE_REGISTRATION,
        SectionIDs: [props.initialFormValue.SectionID],
        StudentIDs: [props.initialFormValue.StudentID]
      })

      if (result && result.success) {
        setAnswerQuestions(result.data)
        result.data.forEach((object: any) => {
          props.initialFormValue[`${object.TagQuestionID}_${object.PersonID}`] = object.AnswerText
        })
      }
      setLoading(false)
    })()
    // eslint-disable-next-line
  }, [form])

  const onFormSubmission = async () => {
    await form.validateFields()
    const params = form.getFieldsValue()
    console.log("Params: ", params)

    setLoading(true)
    setErrorMessages([])
    const response = await editRegistration(params)
    if (response && response.success) {
      if (answerQuestions.length !== 0) {
        const answerList: Array<any> = []
        const objectKeys = Object.keys(params)
        objectKeys.forEach((key) => {
          if (key.includes("_")) {
            const divideIDs: Array<any> = key.split("_")
            let answerText = ""
            if (params[key] !== undefined) {
              answerText = params[key]
            } else {
              answerText = props.initialFormValue[key]
            }

            answerList.push({
              SectionID: Number(props.initialFormValue.SectionID),
              PersonID: Number(divideIDs[1]),
              TagQuestionID: Number(divideIDs[0]),
              AnswerText: answerText
            })
          }
        })

        console.log("Answers: ", answerList)
        const answerResponse = await saveTagAnswers({
          Answers: answerList
        })
        if (answerResponse && answerResponse.success) {
          eventBus.publish(REFRESH_REGISTRATION_DETAIL_PAGE)
          props.handleCancel()
        }
      } else {
        eventBus.publish(REFRESH_REGISTRATION_DETAIL_PAGE)
        props.handleCancel()
      }
    } else {
      setErrorMessages(response.error)
      console.log(response.error)
      console.log(errorMessages)
    }
    setLoading(false)
  }

  const onCreationTimeChange = (date: any, dateString: string) => {
    form.setFieldsValue({ [fieldNames.CreationTime]: date })
  }

  const onTerminationTimeChange = (date: any, dateString: string) => {
    form.setFieldsValue({ [fieldNames.TerminationTime]: date })
  }

  const onEffectiveDateChange = (date: any, dateString: string) => {
    form.setFieldsValue({ [fieldNames.StatusDate]: date })
  }

  const actions = []
  actions.push(<Button onClick={props.handleCancel}>Cancel</Button>)
  actions.push(<Button onClick={onFormSubmission}>Update</Button>)

  return (
    <Card title={`Update Registration`} actions={actions}>
      <Spin size="large" spinning={loading}>
        <Form
          form={form}
          style={{ height: "50vh", overflowY: "scroll", padding: "10px" }}
          initialValues={props.initialFormValue}
        >
          <OldFormError errorMessages={errorMessages} />

          <Form.Item className="hidden" name={fieldNames.StudentID}>
            <Input aria-label="Student ID" />
          </Form.Item>
          <Form.Item className="hidden" name={fieldNames.SectionID}>
            <Input aria-label="Section ID" />
          </Form.Item>
          <Form.Item className="hidden" name={fieldNames.SeatGroupID}>
            <Input aria-label="SeatGroup ID" />
          </Form.Item>

          <Form.Item
            label="Grade Scale"
            rules={[{ required: true, message: "Please select your answer!" }]}
            {...layout}
            name={fieldNames.GradeScaleTypeID}
          >
            <Select aria-label="Grade Scale">
              {gradeScaleItems.map((x) => {
                return (
                  <Select.Option key={x.ID} value={x.ID}>
                    {x.Name}
                  </Select.Option>
                )
              })}
            </Select>
          </Form.Item>

          <Form.Item
            label="Transcript"
            rules={[{ required: true, message: "Please select your answer!" }]}
            {...layout}
            name={fieldNames.TranscriptCreditTypeID}
          >
            <Select aria-label="Transcript">
              {transcriptItems.map((x) => {
                return (
                  <Select.Option key={x.ID} value={x.ID}>
                    {x.Name}
                  </Select.Option>
                )
              })}
            </Select>
          </Form.Item>

          <Form.Item className="hidden" name={fieldNames.CreationTime}>
            <Input aria-label="Creation time" />
          </Form.Item>

          <Form.Item label="Creation Time" rules={[{ required: true, message: "Please pick the date!" }]} {...layout}>
            <DatePicker
              aria-label="Pick Creation Date"
              placeholder={DATE_TIME_FORMAT}
              format={DATE_TIME_FORMAT}
              onChange={onCreationTimeChange}
              defaultValue={creationTime ? moment(creationTime, REQUEST_DATE_TIME_FORMAT) : undefined}
            />
          </Form.Item>

          <Form.Item className="hidden" name={fieldNames.TerminationTime}>
            <Input aria-label="Termination time" />
          </Form.Item>

          <Form.Item
            label="Termination Time"
            rules={[{ required: true, message: "Please pick the date!" }]}
            {...layout}
          >
            <DatePicker
              aria-label="Pick Termination Date"
              placeholder={DATE_TIME_FORMAT}
              format={DATE_TIME_FORMAT}
              onChange={onTerminationTimeChange}
              defaultValue={terminationTime ? moment(terminationTime, REQUEST_DATE_TIME_FORMAT) : undefined}
            />
          </Form.Item>

          <Form.Item className="hidden" name={fieldNames.StatusDate}>
            <Input aria-label="Completion date" />
          </Form.Item>

          <Form.Item label="Effective Date" rules={[{ required: true, message: "Please pick the date!" }]} {...layout}>
            <DatePicker
              aria-label="Pick Effective Date"
              placeholder={DATE_TIME_FORMAT}
              format={DATE_TIME_FORMAT}
              onChange={onEffectiveDateChange}
              defaultValue={completionDate ? moment(completionDate, REQUEST_DATE_TIME_FORMAT) : undefined}
            />
          </Form.Item>

          <Form.Item label="Repeat/Retake" {...layout} valuePropName="checked" name={fieldNames.IsRepeat}>
            <Switch aria-label="Repeat/Retake" />
          </Form.Item>

          <Form.Item
            label="Complete status on termination"
            {...layout}
            valuePropName="checked"
            name={fieldNames.IsCompleteOnTermination}
          >
            <Switch aria-label="Complete status on termination" />
          </Form.Item>

          <Form.Item
            label="Expected Attendance"
            rules={[{ required: true, message: "Please input your answer!" }]}
            {...layout}
            name={fieldNames.AttendanceExpected}
          >
            <Input aria-label="Expected Attendance" />
          </Form.Item>

          {answerQuestions.length !== 0 && <Divider orientation="left">Question Responses</Divider>}
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
        </Form>
      </Spin>
    </Card>
  )
}
