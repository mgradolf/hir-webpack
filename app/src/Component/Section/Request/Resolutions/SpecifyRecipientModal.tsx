import * as React from "react"
import Modal from "~/Component/Common/Modal"
import { connect } from "react-redux"
import { Dispatch } from "redux"
import { showRequestResolutionModal } from "~/Store/ModalState"
import { Card, Button, Form, Input, Select, Divider, DatePicker, Switch } from "antd"
import { IParamsToBeDispatched } from "~/Pages/Request/Details"
import { eventBus, EVENT_REQUEST_RESOLUTION } from "~/utils/EventBus"
import { REQUEST_PROCESS_ACTION_NAME, DATE_TIME_FORMAT, REQUEST_DATE_TIME_FORMAT } from "~/utils/Constants"
import StudentFinderFormField from "~/Component/Student/StudentFinderFormField"
import { useEffect } from "react"
import { getGradeScaleType, getCreditType } from "~/ApiServices/Service/RefLookupService"
import moment from "moment"

import { IStudent } from "~/Component/Student/StudentFinderModal"

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
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)
  const [gradeScaleItems, setGradeScaleItems] = useState<Array<any>>([])
  const [transcriptItems, setTranscriptItems] = useState<Array<any>>([])

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
  }, [props])

  const onFormSubmission = async () => {
    try {
      await form.validateFields()

      props.taskJson["UpdatedResponse"] = form.getFieldsValue()

      const params: any = {}
      params["AdditionalProperties"] = form.getFieldsValue()
      params["RecipientPersonID"] = form.getFieldValue("RecipientPersonID")
      params["RecipientPersonName"] = form.getFieldValue("RecipientPersonName")
      params["DependencyKey"] = props.taskJson.Issues[0].DependencyKey
      params["TaskKey"] = props.taskJson.Key
      params["ProcessActionName"] = REQUEST_PROCESS_ACTION_NAME.SPECIFY_RECIPIENT

      const specifyRecipient: IParamsToBeDispatched = {
        ValueUpdate: true,
        Params: params
      }

      eventBus.publish(EVENT_REQUEST_RESOLUTION, specifyRecipient)
      props.closeSpecifyRecipientModal && props.closeSpecifyRecipientModal()
    } catch (errorInfo) {
      console.log("Failed:", errorInfo)
    }
  }

  const onSelectStudent = (student: IStudent) => {
    form.setFieldsValue({
      [`RecipientPersonID`]: student.PersonID,
      [`RecipientPersonName`]: student.PersonName
    })
  }

  const onClearStudent = () => {
    form.setFieldsValue({
      [`RecipientPersonID`]: null,
      [`RecipientPersonName`]: null
    })
  }

  return (
    <Modal showModal={true} width="800px" closable={true}>
      <Card
        loading={loading}
        title="Registration Detail"
        actions={[
          <Button type="ghost" onClick={props.closeSpecifyRecipientModal}>
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
          <Divider orientation="left">Student Registration</Divider>
          <StudentFinderFormField
            AccountID={props.AccountID}
            onSelectStudent={onSelectStudent}
            onClearStudent={onClearStudent}
          />

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

          <Form.Item
            label="Expected Attendance"
            rules={[{ required: true, message: "Please input your answer!" }]}
            {...layout}
            name="AttendanceExpected"
          >
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
