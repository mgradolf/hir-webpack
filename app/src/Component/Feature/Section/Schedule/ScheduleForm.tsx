import React, { useEffect, useState } from "react"
import { Form, Card, Button, Input, Select, TimePicker, DatePicker, Checkbox, Row, Col } from "antd"
import { getMeetingTypes } from "~/ApiServices/Service/RefLookupService"
import { saveMeetings, createMeetings } from "~/ApiServices/Service/SectionService"
import { IApiResponse } from "@packages/api/lib/utils/Interfaces"
import { eventBus, REFRESH_SECTION_SCHEDULE_PAGE } from "~/utils/EventBus"
import { ISimplifiedApiErrorMessage } from "@packages/api/lib/utils/HandleResponse/ProcessedApiError"
import { OldFormError } from "~/Component/Common/OldForm/OldFormError"
import { DATE_FORMAT, TIME_FORMAT } from "~/utils/Constants"
import { FormMultipleRadio } from "~/Component/Common/Form/FormMultipleRadio"
import moment from "moment"
import "~/Sass/utils.scss"
import { HelpButton } from "~/Component/Common/Form/Buttons/HelpButton"

interface IScheduleCreateFormProps {
  sectionId: number
  scheduleIds?: any
  initialFormValue: { [key: string]: any }
  handleCancel: () => void
  setApiCallInProgress: (flag: boolean) => void
  formInstance: any
  fieldNames: { [key: string]: any }
}

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 14 }
}
export default function ScheduleForm(props: IScheduleCreateFormProps) {
  const [meetingTypes, setMeetingTypes] = useState<Array<any>>([])
  const [checkedDays, setCheckedDays] = useState<Array<any>>([])
  const [errorMessages, setErrorMessages] = useState<Array<ISimplifiedApiErrorMessage>>([])

  const meetingDate = props.formInstance.getFieldValue(props.fieldNames.MeetingDate)
  const startTime = props.formInstance.getFieldValue(props.fieldNames.StartTime)
  const endTime = props.formInstance.getFieldValue(props.fieldNames.EndTime)

  useEffect(() => {
    props.formInstance.setFieldsValue({ [props.fieldNames.SectionID]: props.sectionId })
    ;(async () => {
      const response = await getMeetingTypes()
      if (response && response.success && response.data) {
        setMeetingTypes(response.data)
      }
    })()
  }, [props])

  const onFormSubmission = async () => {
    await props.formInstance.validateFields()
    const params = props.formInstance.getFieldsValue()

    checkedDays.forEach((key) => {
      params[key] = true
    })

    if (props.scheduleIds) {
      params["ScheduleIDs"] = props.scheduleIds
    }

    type serviceMethodType = (params: { [key: string]: any }) => Promise<IApiResponse>
    const serviceMethoToCall: serviceMethodType = props.scheduleIds ? saveMeetings : createMeetings

    props.setApiCallInProgress(true)
    setErrorMessages([])
    const response = await serviceMethoToCall(params)
    props.setApiCallInProgress(false)

    if (response && response.success) {
      props.formInstance.resetFields()
      eventBus.publish(REFRESH_SECTION_SCHEDULE_PAGE)
      props.handleCancel()
    } else {
      setErrorMessages(response.error)
      console.log(response.error)
      console.log(errorMessages)
    }
  }

  const options = [
    { label: "Mon", value: "Mon" },
    { label: "Tue", value: "Tue" },
    { label: "Wed", value: "Wed" },
    { label: "Thu", value: "Thu" },
    { label: "Fri", value: "Fri" },
    { label: "Sat", value: "Sat" },
    { label: "Sun", value: "Sun" }
  ]

  const onDateChange = (value: any, dateString: string) => {
    props.formInstance.setFieldsValue({ [props.fieldNames.MeetingDate]: dateString })
  }

  const onStartTimeChange = (time: any, timeString: string) => {
    props.formInstance.setFieldsValue({ [props.fieldNames.StartTime]: timeString })
  }

  const onEndTimeChange = (time: any, timeString: string) => {
    props.formInstance.setFieldsValue({ [props.fieldNames.EndTime]: timeString })
  }

  const onChange = (checkedValues: any) => {
    setCheckedDays(checkedValues)
  }

  return (
    <Card
      title={
        <Row justify="space-between">
          <Col>{props.scheduleIds ? `Update meeting` : "Create new meeting"}</Col>
          <Col>
            {props.scheduleIds ? (
              <HelpButton helpKey="sectionScheduleUpdateMeetingForm" />
            ) : (
              <HelpButton helpKey="sectionScheduleCreateNewMeetingForm" />
            )}
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
          <Input aria-label="Schedule IDs" value={props.scheduleIds ? props.scheduleIds : undefined} />
        </Form.Item>

        {!props.scheduleIds && (
          <Form.Item className="hidden" name={props.fieldNames.SectionID}>
            <Input aria-label="Section ID" value={props.sectionId} />
          </Form.Item>
        )}

        <Form.Item label="Meeting Type" name={props.fieldNames.MeetingTypeID} {...layout}>
          <Select aria-label="Meeitng type select">
            {meetingTypes.map((x) => {
              return (
                <Select.Option key={x.ID + x.Name} value={x.ID}>
                  {x.Name}
                </Select.Option>
              )
            })}
          </Select>
        </Form.Item>

        <Form.Item className="hidden" name={props.fieldNames.StartTime}>
          <Input aria-label="Start time" />
        </Form.Item>

        <Form.Item label="Start Time" {...layout}>
          <TimePicker
            aria-label="Pick start time"
            use12Hours
            format={TIME_FORMAT}
            onChange={onStartTimeChange}
            defaultValue={startTime ? moment(startTime, TIME_FORMAT) : undefined}
          />
        </Form.Item>

        <Form.Item className="hidden" name={props.fieldNames.EndTime}>
          <Input aria-label="End time" />
        </Form.Item>

        <Form.Item label="End Time" {...layout}>
          <TimePicker
            aria-label="Pick end time"
            use12Hours
            format={TIME_FORMAT}
            onChange={onEndTimeChange}
            defaultValue={endTime ? moment(endTime, TIME_FORMAT) : undefined}
          />
        </Form.Item>

        <Form.Item className="hidden" name={props.fieldNames.MeetingDate}>
          <Input aria-label="Meeting date" />
        </Form.Item>

        <Form.Item label="Meeting Date" {...layout}>
          <DatePicker
            aria-label="Pick Meeting Date"
            placeholder="YYYY-MM-DD"
            format={DATE_FORMAT}
            onChange={onDateChange}
            defaultValue={meetingDate ? moment(meetingDate, DATE_FORMAT) : undefined}
          />
        </Form.Item>

        {!props.scheduleIds && (
          <Form.Item label="Total Occurences" {...layout} name={props.fieldNames.Occurrences}>
            <Input aria-label="Total occurences" type="number" min={0} />
          </Form.Item>
        )}

        {!props.scheduleIds && (
          <Form.Item label="Frequency" name={props.fieldNames.Frequency} {...layout}>
            <Select aria-label="Frequency select">
              <Select.Option key="0" value="0">
                Weekly
              </Select.Option>
              <Select.Option key="1" value="1">
                Bi-Weekly
              </Select.Option>
            </Select>
          </Form.Item>
        )}

        {!props.scheduleIds && (
          <Form.Item label="Meets on day" {...layout}>
            <Checkbox.Group options={options} onChange={onChange} />
          </Form.Item>
        )}

        {!props.scheduleIds && (
          <FormMultipleRadio
            labelColSpan={8}
            wrapperColSpan={14}
            formInstance={props.formInstance}
            label={"Exclude school holidays"}
            ariaLabel={"Is exclude school holidays"}
            fieldName={props.fieldNames.ExcludeHoliday}
            options={[
              { label: "Yes", value: true },
              { label: "No", value: false }
            ]}
          />
        )}
      </Form>
    </Card>
  )
}
