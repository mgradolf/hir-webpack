import React, { useEffect, useState } from "react"
import { Form, Card, Button, Input, Switch, Select } from "antd"
import { findQualifiedInstructors } from "~/ApiServices/BizApi/scheduling/schedulingIF"
import "~/Sass/utils.scss"
import { scheduleInstructor } from "~/ApiServices/Service/SectionService"
import { IApiResponse } from "@packages/api/lib/utils/Interfaces"
import { ISimplifiedApiErrorMessage } from "@packages/api/lib/utils/HandleResponse/ProcessedApiError"
import FormError from "~/Component/Common/Form/FormError"
import { FormInstance } from "antd/lib/form"
import { IScheduleInstructorFieldNames } from "~/Component/Section/Interfaces"
import { eventBus, REFRESH_SECTION_SCHEDULE_PAGE } from "~/utils/EventBus"

interface IScheduleInstructorFormProps {
  sectionId: number
  scheduleIds: any
  handleCancel: () => void
  setApiCallInProgress: (flag: boolean) => void
  formInstance: FormInstance
  fieldNames: IScheduleInstructorFieldNames
  initialFormValue: { [key in keyof IScheduleInstructorFieldNames]: any }
}

const layout = {
  labelCol: { span: 6 }
}
export default function ScheduleInstructorForm(props: IScheduleInstructorFormProps) {
  const [instructorItems, setInstructorItems] = useState<Array<any>>([])
  const [errorMessages, setErrorMessages] = useState<Array<ISimplifiedApiErrorMessage>>([])

  useEffect(() => {
    ;(async () => {
      const response = await findQualifiedInstructors([props.sectionId])
      if (response && response.success && response.data) {
        setInstructorItems(response.data)
      } else {
        setErrorMessages(response.error)
      }
    })()
  }, [props])

  const onFormSubmission = async () => {
    setErrorMessages([])
    await props.formInstance.validateFields()
    const params = props.formInstance.getFieldsValue()

    const personID = params["PersonIDs"]
    params["PersonIDs"] = [personID]
    console.log("params: ", params)

    type serviceMethodType = (params: { [key: string]: any }) => Promise<IApiResponse>
    const serviceMethoToCall: serviceMethodType = scheduleInstructor

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
    <Card title="Update Instructor" actions={actions}>
      <Form form={props.formInstance} initialValues={props.initialFormValue} className="modal-form">
        <FormError errorMessages={errorMessages} />
        <Form.Item className="hidden" name={props.fieldNames.ScheduleIDs}>
          <Input aria-label="Schedule IDs" value={props.scheduleIds} />
        </Form.Item>

        <Form.Item label="Instructor" {...layout} name={props.fieldNames.PersonIDs}>
          <Select aria-label="Select Instructor">
            {instructorItems.map((x) => {
              return (
                <Select.Option key={x.PersonID} value={x.PersonID}>
                  {x.FormattedName}
                </Select.Option>
              )
            })}
          </Select>
        </Form.Item>

        <Form.Item
          name={props.fieldNames.ConflictCheck}
          label="Check for conflicts(slower)"
          {...layout}
          valuePropName="checked"
        >
          <Switch aria-label="Check for conflicts(slower)" />
        </Form.Item>
      </Form>
    </Card>
  )
}
