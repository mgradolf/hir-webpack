import React, { useEffect, useState } from "react"
import { Form, Button, Input, Select, Spin, Card, Divider, Row, Col } from "antd"
import { ISimplifiedApiErrorMessage } from "@packages/api/lib/utils/HandleResponse/ProcessedApiError"
import { OldFormError } from "~/Component/Common/OldForm/OldFormError"
import { QUESTION_EVENT_TYPE_REGISTRATION } from "~/utils/Constants"
import { getGradeScaleType, getCreditType } from "~/ApiServices/Service/RefLookupService"
import { editRegistration } from "~/ApiServices/Service/RegistrationService"
import { IRegistrationFieldNames } from "~/Component/Feature/Registration/Interfaces"
import { eventBus, REFRESH_REGISTRATION_DETAIL_PAGE } from "~/utils/EventBus"
import { searchQuestionResponse, saveTagAnswers } from "~/ApiServices/Service/QuestionService"
import { FormDropDown } from "~/Component/Common/Form/FormDropDown"
import { FormDateTimePicker } from "~/Component/Common/Form/FormDateTimePicker"
import { FormMultipleRadio } from "~/Component/Common/Form/FormMultipleRadio"
import "~/Sass/utils.scss"

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
  labelCol: { span: 8 },
  wrapperCol: { span: 14 }
}

export default function RegistrationUpdateForm(props: IRegistrationUpdateFormProps) {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState<boolean>(false)
  const [errorMessages, setErrorMessages] = useState<Array<ISimplifiedApiErrorMessage>>([])
  const [answerQuestions, setAnswerQuestions] = useState<Array<any>>([])

  useEffect(() => {
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

  return (
    <Card
      title={`Update Registration`}
      actions={[
        <Row justify="end" gutter={[8, 8]} style={{ marginRight: "10px" }}>
          <Col>
            <Button type="primary" danger onClick={props.handleCancel}>
              Cancel
            </Button>
          </Col>
          <Col>
            <Button type="primary" onClick={onFormSubmission}>
              Submit
            </Button>
          </Col>
        </Row>
      ]}
    >
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

          <FormDropDown
            labelColSpan={8}
            wrapperColSpan={14}
            label={"Grade Scale"}
            ariaLabel={"Grade Scale Select"}
            formInstance={form}
            fieldName={fieldNames.GradeScaleTypeID}
            refLookupService={getGradeScaleType}
            displayKey="Name"
            valueKey="ID"
            rules={[{ required: true, message: "Please select grade scale!" }]}
          />

          <FormDropDown
            labelColSpan={8}
            wrapperColSpan={14}
            label={"Transcript"}
            ariaLabel={"Transcript Select"}
            formInstance={form}
            fieldName={fieldNames.TranscriptCreditTypeID}
            refLookupService={getCreditType}
            displayKey="Name"
            valueKey="ID"
            rules={[{ required: true, message: "Please select transcript!" }]}
          />

          <FormDateTimePicker
            labelColSpan={8}
            wrapperColSpan={14}
            label="Creation Time"
            formInstance={form}
            fieldName={fieldNames.CreationTime}
            defaultValue={props.initialFormValue.CreationTime}
          />

          <FormDateTimePicker
            labelColSpan={8}
            wrapperColSpan={14}
            label="Termination Time"
            formInstance={form}
            fieldName={fieldNames.TerminationTime}
            defaultValue={props.initialFormValue.TerminationTime}
          />

          <FormDateTimePicker
            labelColSpan={8}
            wrapperColSpan={14}
            label="Completion Date"
            formInstance={form}
            fieldName={fieldNames.StatusDate}
            rules={[{ required: true, message: "Please enter completion date" }]}
            defaultValue={props.initialFormValue.CompletionDate}
          />

          <FormMultipleRadio
            labelColSpan={8}
            wrapperColSpan={14}
            formInstance={form}
            label={"Repeat/Retake"}
            ariaLabel={"Is Repeat/Retake"}
            fieldName={fieldNames.IsRepeat}
            options={[
              { label: "Yes", value: true },
              { label: "No", value: false }
            ]}
          />

          <FormMultipleRadio
            labelColSpan={8}
            wrapperColSpan={14}
            formInstance={form}
            label={"Complete status on termination"}
            ariaLabel={"Is complete status on termination"}
            fieldName={fieldNames.IsCompleteOnTermination}
            options={[
              { label: "Yes", value: true },
              { label: "No", value: false }
            ]}
          />

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
