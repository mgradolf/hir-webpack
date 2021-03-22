import * as React from "react"
import Modal from "~/Component/Common/Modal"
import { connect } from "react-redux"
import { Dispatch } from "redux"
import { showRequestResolutionModal } from "~/Store/ModalState"
import { Card, Button, Form, Input, Select, Divider, DatePicker, Switch } from "antd"
import { IParamsToBeDispatched } from "~/Pages/Manage/Request/RequestDetailsPage"
import { eventBus, EVENT_REQUEST_QUESTION_ANSWER, EVENT_REQUEST_RESOLUTION } from "~/utils/EventBus"
import {
  REQUEST_PROCESS_ACTION_NAME,
  DATE_TIME_FORMAT,
  REQUEST_DATE_TIME_FORMAT,
  REGISTRATION_VERIFICATION_NAME
} from "~/utils/Constants"
import StudentFinderFormField from "~/Component/Feature/Student/StudentFinderFormField"
import { useEffect } from "react"
import { OldFormError } from "~/Component/Common/OldForm/OldFormError"
import { ISimplifiedApiErrorMessage } from "@packages/api/lib/utils/HandleResponse/ProcessedApiError"
import { getGradeScaleType, getCreditType } from "~/ApiServices/Service/RefLookupService"
import { validateRegistration } from "~/ApiServices/Service/RegistrationService"
import moment from "moment"

import { IStudent } from "~/Component/Feature/Student/StudentFinderModal"
import RegistrationVerification from "~/utils/RegistrationVerification"
import RegistrationError from "~/Component/Section/Request/RegistrationError"

const { useState } = React

const layout = {
  labelCol: { span: 8 }
}

interface ISpecifyRecipientModal {
  taskJson: any
  AccountID: any
  closeSpecifyRecipientModal?: () => void
}

function SpecifyRecipientModal(props: ISpecifyRecipientModal) {
  const sectionID = props.taskJson.TaskData.SectionID
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)
  const [isUpdate, setIsUpdate] = useState(true)
  const [isVerified, setIsVerified] = useState(true)
  const [gradeScaleItems, setGradeScaleItems] = useState<Array<any>>([])
  const [transcriptItems, setTranscriptItems] = useState<Array<any>>([])
  const [errorMessages, setErrorMessages] = useState<Array<ISimplifiedApiErrorMessage>>([])
  const [verificationItems, setVerificationItems] = useState<Array<any>>([])
  const [waiveMap, setWaiveMap] = useState<{ [key: string]: any }>({})
  const [answerMap, setAnswerMap] = useState<{ [key: string]: any }>({})
  const [jsonData, setJsonData] = useState<{ [key: string]: any }>(props.taskJson)

  const initialAnswer = props.taskJson.UpdatedResponse !== undefined ? props.taskJson.UpdatedResponse : {}
  initialAnswer["GradeScaleTypeID"] = props.taskJson.TaskData.GradeScaleTypeID
  initialAnswer["TranscriptCreditTypeID"] = props.taskJson.TaskData.TranscriptCreditTypeID
  initialAnswer["CreationTime"] = props.taskJson.TaskData.CreationTime
    ? moment(props.taskJson.TaskData.CreationTime, REQUEST_DATE_TIME_FORMAT)
    : undefined
  initialAnswer["TerminationTime"] = props.taskJson.TaskData.TerminationTime
    ? moment(props.taskJson.TaskData.TerminationTime, REQUEST_DATE_TIME_FORMAT)
    : undefined
  initialAnswer["StatusDate"] = props.taskJson.TaskData.StatusDate
    ? moment(props.taskJson.TaskData.StatusDate, REQUEST_DATE_TIME_FORMAT)
    : undefined
  initialAnswer["IsRepeat"] = props.taskJson.TaskData.IsRepeat !== undefined ? props.taskJson.TaskData.IsRepeat : false
  initialAnswer["CompleteOnTermination"] =
    props.taskJson.TaskData.CompleteOnTermination !== undefined ? props.taskJson.TaskData.CompleteOnTermination : false
  initialAnswer["AttendanceExpected"] = props.taskJson.TaskData.AttendanceExpected
  if (props.taskJson.TaskData.RecipientPersonID !== undefined) {
    initialAnswer["RecipientPersonID"] = props.taskJson.TaskData.RecipientPersonID
    initialAnswer["RecipientPersonName"] = props.taskJson.TaskData.RecipientPersonName
  }

  useEffect(() => {
    ;(async function () {
      setLoading(true)
      const result = await getGradeScaleType()
      if (result && result.success) {
        setGradeScaleItems(result.data)
      }
      setLoading(false)
    })()
    ;(async function () {
      setLoading(true)
      const result = await getCreditType()
      if (result && result.success) {
        setTranscriptItems(result.data)
      }
      setLoading(false)
    })()

    eventBus.subscribe(EVENT_REQUEST_QUESTION_ANSWER, (param: IParamsToBeDispatched) => {
      const params: { [key: string]: any } = param.Params
      setAnswerMap(params.Response)

      const itemList = verificationItems.filter(
        (x) => x.Name !== REGISTRATION_VERIFICATION_NAME.REGISTRATION_QUESTION_CHECK
      )
      setVerificationItems(itemList)

      if (itemList.length === 0) {
        setIsUpdate(false)
      }
    })
    return () => {
      eventBus.unsubscribe(EVENT_REQUEST_QUESTION_ANSWER)
    }
  }, [props, verificationItems])

  const onFormSubmission = async () => {
    try {
      await form.validateFields()

      if (form.getFieldValue("RecipientPersonID") === null) {
        setErrorMessages([{ message: "Please select recipient!" }])
      } else {
        props.taskJson["UpdatedResponse"] = form.getFieldsValue()

        const params: any = {}
        params["AdditionalProperties"] = form.getFieldsValue()
        params["RecipientPersonID"] = form.getFieldValue("RecipientPersonID")
        params["RecipientPersonName"] = form.getFieldValue("RecipientPersonName")
        params["TaskKey"] = props.taskJson.Key
        params["ProcessActionName"] = REQUEST_PROCESS_ACTION_NAME.SPECIFY_RECIPIENT

        if (props.taskJson.Issues[0].DependencyKey !== undefined) {
          params["DependencyKey"] = props.taskJson.Issues[0].DependencyKey
        }
        if (props.taskJson.Issues[0].ValidatorKey !== undefined) {
          params["ValidatorKey"] = props.taskJson.Issues[0].ValidatorKey
        }

        if (waiveMap !== undefined) {
          const regMapName = "Registration_SectionID_" + sectionID + "_" + form.getFieldValue("RecipientPersonID")
          params["OverrieData"] = {
            [regMapName]: waiveMap
          }
        }
        if (answerMap !== undefined && answerMap.length > 0) {
          params["QuestionAnswers"] = answerMap
        }

        const specifyRecipient: IParamsToBeDispatched = {
          ValueUpdate: true,
          Params: params
        }
        eventBus.publish(EVENT_REQUEST_RESOLUTION, specifyRecipient)
        props.closeSpecifyRecipientModal && props.closeSpecifyRecipientModal()
      }
    } catch (errorInfo) {
      console.log("Failed:", errorInfo)
    }
  }

  const onSelectStudent = async (student: IStudent) => {
    setErrorMessages([])
    jsonData.TaskData["RecipientPersonID"] = student.PersonID
    jsonData.TaskData["RecipientPersonName"] = student.PersonName
    setJsonData(jsonData)

    form.setFieldsValue({
      [`RecipientPersonID`]: student.PersonID,
      [`RecipientPersonName`]: student.PersonName
    })

    setLoading(true)
    const response = await validateRegistration({
      SeatGroupID: props.taskJson.TaskData.SeatGroupID,
      PersonID: student.PersonID
    })

    if (response && response.success) {
      let isVerificationPass = true
      Object.keys(response.data).forEach((key) => {
        const registrationCheckPass = response.data[key]
        if (!registrationCheckPass) {
          verificationItems.push(RegistrationVerification(key, response.data))
          isVerificationPass = false
        }
      })
      if (isVerificationPass) {
        setIsUpdate(false)
      } else {
        setVerificationItems(verificationItems)
        setIsVerified(false)
      }
    }
    setLoading(false)
  }

  const onClearStudent = () => {
    setVerificationItems([])
    setWaiveMap({})

    jsonData.TaskData["RecipientPersonID"] = null
    jsonData.TaskData["RecipientPersonName"] = null
    setJsonData(jsonData)

    form.setFieldsValue({
      [`RecipientPersonID`]: null,
      [`RecipientPersonName`]: null
    })
  }

  const onWaive = (name: any, requestName: Array<any>) => {
    requestName.forEach((element) => {
      waiveMap[element] = 1
    })
    setWaiveMap(waiveMap)

    const itemList = verificationItems.filter((x) => x.Name !== name)
    setVerificationItems(itemList)

    if (itemList.length === 0) {
      setIsUpdate(false)
    }
  }

  return (
    <Modal showModal={true} width="800px" apiCallInProgress={loading} closable={true}>
      <Card
        title="Registration Detail"
        actions={[
          <Button type="ghost" onClick={props.closeSpecifyRecipientModal}>
            Cancel
          </Button>,
          <Button type="primary" disabled={isUpdate} onClick={onFormSubmission}>
            Update
          </Button>
        ]}
      >
        <Form
          initialValues={initialAnswer}
          form={form}
          style={{ height: "65vh", overflowY: "scroll", padding: "10px" }}
        >
          <OldFormError errorMessages={errorMessages} />

          <Divider orientation="left">Student Registration</Divider>
          <StudentFinderFormField
            initialData={initialAnswer}
            AccountID={props.AccountID}
            onSelectStudent={onSelectStudent}
            onClearStudent={onClearStudent}
          />

          {!isVerified && <RegistrationError errorMessages={verificationItems} jsonData={jsonData} onWaive={onWaive} />}

          <Form.Item label="Recipient Person ID" className="hidden" {...layout} name="RecipientPersonID">
            <Input />
          </Form.Item>

          <Form.Item label="Recipient Person Name" className="hidden" {...layout} name="RecipientPersonName">
            <Input />
          </Form.Item>

          <Form.Item label="Seat Group" {...layout}>
            <Input disabled value={props.taskJson.TaskData.SectionNumber} />
          </Form.Item>

          <Form.Item label="Section Number" {...layout}>
            <Input disabled value={props.taskJson.TaskData.ItemName} />
          </Form.Item>

          <Form.Item
            label="Grade Scale"
            rules={[{ required: true, message: "Please select your answer!" }]}
            {...layout}
            name="GradeScaleTypeID"
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
            name="TranscriptCreditTypeID"
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

          <Form.Item
            label="Creation Time"
            rules={[{ required: true, message: "Please pick the date!" }]}
            {...layout}
            name="CreationTime"
          >
            <DatePicker aria-label="Pick Creation Date" placeholder={DATE_TIME_FORMAT} format={DATE_TIME_FORMAT} />
          </Form.Item>

          <Form.Item
            label="Termination Time"
            rules={[{ required: true, message: "Please pick the date!" }]}
            {...layout}
            name="TerminationTime"
          >
            <DatePicker aria-label="Pick Termination Date" placeholder={DATE_TIME_FORMAT} format={DATE_TIME_FORMAT} />
          </Form.Item>

          <Form.Item
            label="Effective Date"
            rules={[{ required: true, message: "Please pick the date!" }]}
            {...layout}
            name="StatusDate"
          >
            <DatePicker aria-label="Pick Effective Date" placeholder={DATE_TIME_FORMAT} format={DATE_TIME_FORMAT} />
          </Form.Item>

          <Form.Item label="Repeat/Retake" {...layout} valuePropName="checked" name="IsRepeat">
            <Switch aria-label="Repeat/Retake" />
          </Form.Item>

          <Form.Item
            label="Complete status on termination"
            {...layout}
            valuePropName="checked"
            name="CompleteOnTermination"
          >
            <Switch aria-label="Complete status on termination" />
          </Form.Item>

          <Form.Item label="Expected Attendance" {...layout} name="AttendanceExpected">
            <Input aria-label="Expected Attendance" />
          </Form.Item>
        </Form>
      </Card>
    </Modal>
  )
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    closeSpecifyRecipientModal: () => dispatch(showRequestResolutionModal(false))
  }
}

export default connect(undefined, mapDispatchToProps)(SpecifyRecipientModal)
