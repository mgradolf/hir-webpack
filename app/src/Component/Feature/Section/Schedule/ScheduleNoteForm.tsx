import React, { useEffect, useState } from "react"
import { Form, Card, Button, Input, Select, Row, Col } from "antd"
import { getMeetingInformationTypes } from "~/ApiServices/Service/RefLookupService"
import { saveMeetingInformations } from "~/ApiServices/Service/SectionService"
import { IApiResponse } from "@packages/api/lib/utils/Interfaces"
import { ISimplifiedApiErrorMessage } from "@packages/api/lib/utils/HandleResponse/ProcessedApiError"
import { OldFormError } from "~/Component/Common/OldForm/OldFormError"
import { FormInstance } from "antd/lib/form"
import { IScheduleNoteFieldNames } from "~/Component/Feature/Section/Interfaces"
import { eventBus, REFRESH_SECTION_SCHEDULE_PAGE } from "~/utils/EventBus"
import "~/Sass/utils.scss"
import { HelpButton } from "~/Component/Common/Form/Buttons/HelpButton"

interface IScheduleNoteFormProps {
  scheduleIds: any
  handleCancel: () => void
  setApiCallInProgress: (flag: boolean) => void
  formInstance: FormInstance
  fieldNames: IScheduleNoteFieldNames
  initialFormValue: { [key in keyof IScheduleNoteFieldNames]: any }
}

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 14 }
}
export default function ScheduleNoteForm(props: IScheduleNoteFormProps) {
  const [meetingTypes, setMeetingTypes] = useState<Array<any>>([])
  const [errorMessages, setErrorMessages] = useState<Array<ISimplifiedApiErrorMessage>>([])

  useEffect(() => {
    ;(async () => {
      const response = await getMeetingInformationTypes()
      if (response && response.success && response.data) {
        setMeetingTypes(response.data)
      }
    })()
  }, [props])

  const onFormSubmission = async () => {
    setErrorMessages([])
    await props.formInstance.validateFields()
    const params = props.formInstance.getFieldsValue()

    console.log("params: ", params)

    type serviceMethodType = (params: { [key: string]: any }) => Promise<IApiResponse>
    const serviceMethoToCall: serviceMethodType = saveMeetingInformations

    props.setApiCallInProgress(true)
    setErrorMessages([])
    const response = await serviceMethoToCall(params)
    props.setApiCallInProgress(false)

    if (response && response.success) {
      eventBus.publish(REFRESH_SECTION_SCHEDULE_PAGE)
      props.handleCancel()
    } else {
      setErrorMessages(response.error)
      console.log(response.error)
      console.log(errorMessages)
    }
  }

  return (
    <Card
      title={
        <Row justify="space-between">
          <Col>Add Notes</Col>
          <Col>
            <HelpButton helpKey="sectionScheduleAddNoteForm" />
          </Col>
        </Row>
      }
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
      <Form
        form={props.formInstance}
        initialValues={props.initialFormValue}
        scrollToFirstError
        style={{
          maxHeight: "80vh",
          overflowY: "scroll"
        }}
      >
        <OldFormError errorMessages={errorMessages} />
        <Form.Item className="hidden" name={props.fieldNames.ScheduleIDs}>
          <Input aria-label="Schedule IDs" value={props.scheduleIds} />
        </Form.Item>

        <Form.Item label="Meeting Type" {...layout} name={props.fieldNames.MeetingInformationTypeID}>
          <Select aria-label="Select Meeting Type">
            {meetingTypes.map((x) => {
              return (
                <Select.Option key={x.ID} value={x.ID}>
                  {x.Name}
                </Select.Option>
              )
            })}
          </Select>
        </Form.Item>

        <Form.Item name={props.fieldNames.InfoValue} label="Note" {...layout}>
          <Input.TextArea aria-label="Notes" rows={4} />
        </Form.Item>
      </Form>
    </Card>
  )
}
