import React, { useEffect, useState } from "react"
import { Form, Card, Button, Input, Select } from "antd"
import { getMeetingInformationTypes } from "~/ApiServices/Service/RefLookupService"
import { saveMeetingInformations } from "~/ApiServices/Service/SectionService"
import { IApiResponse } from "@packages/api/lib/utils/Interfaces"
import { ISimplifiedApiErrorMessage } from "@packages/api/lib/utils/HandleResponse/ProcessedApiError"
import FormError from "~/Component/Common/FormError"
import { FormInstance } from "antd/lib/form"
import { IScheduleNoteFieldNames } from "~/Component/Section/Interfaces"
import { eventBus, REFRESH_SECTION_SCHEDULE_PAGE } from "~/utils/EventBus"
import "~/Sass/utils.scss"

interface IScheduleNoteFormProps {
  scheduleIds: any
  handleCancel: () => void
  setApiCallInProgress: (flag: boolean) => void
  formInstance: FormInstance
  fieldNames: IScheduleNoteFieldNames
  initialFormValue: { [key in keyof IScheduleNoteFieldNames]: any }
}

const layout = {
  labelCol: { span: 6 }
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

  const actions = []
  actions.push(<Button onClick={props.handleCancel}>Cancel</Button>)
  actions.push(<Button onClick={onFormSubmission}>Submit</Button>)

  return (
    <Card title="Add Notes" actions={actions}>
      <Form form={props.formInstance} initialValues={props.initialFormValue} className="modal-form">
        <FormError errorMessages={errorMessages} />
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
