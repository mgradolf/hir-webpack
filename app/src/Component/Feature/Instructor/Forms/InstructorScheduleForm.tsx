import React, { useState } from "react"
import { Card, Button, Input, Row, Col, DatePicker, Switch, Checkbox } from "antd"
import Form, { FormInstance } from "antd/lib/form"
import { OldFormError } from "~/Component/Common/OldForm/OldFormError"
import { ISimplifiedApiErrorMessage } from "@packages/api/lib/utils/HandleResponse/ProcessedApiError"
import { DATE_TIME_FORMAT } from "~/utils/Constants"
import { pushInstructorSchedule } from "~/ApiServices/Service/InstructorService"
import { IApiResponse } from "@packages/api/lib/utils/Interfaces"
import { IInstructorScheduleFieldNames } from "~/Component/Feature/Instructor/Interfaces"
import { FormDateTimePicker } from "~/Component/Common/Form/FormDateTimePicker"
import { eventBus } from "~/utils/EventBus"
import "~/Sass/global/index.scss"

interface IInstructorScheduleFormProps {
  editMode: boolean
  title: string
  formInstance: FormInstance
  fieldNames: IInstructorScheduleFieldNames
  initialFormValue: { [key: string]: any }
  closeModal?: () => void
  setApiCallInProgress: (flag: boolean) => void
}

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 14 }
}

const dayOptions = [
  { label: "Monday", value: "Monday" },
  { label: "Tuesday", value: "Tuesday" },
  { label: "Wednesday", value: "Wednesday" },
  { label: "Thursday", value: "Thursday" },
  { label: "Friday", value: "Friday" },
  { label: "Saturday", value: "Saturday" },
  { label: "Sunday", value: "Sunday" }
]

export default function InstructorScheduleForm(props: IInstructorScheduleFormProps) {
  const [recurring, setRecurring] = useState<boolean>(false)
  const [errorMessages, setErrorMessages] = useState<Array<ISimplifiedApiErrorMessage>>([])

  const onFormSubmission = async () => {
    await props.formInstance.validateFields()
    const params = props.formInstance.getFieldsValue()

    const dayParams: { [key: string]: any } = {}
    const days = params["Days"]
    if (days !== undefined) {
      days.forEach((day: string) => {
        dayParams[day] = true
      })
      params["Days"] = dayParams
    }

    const serviceMethoToCall: (params: { [key: string]: any }) => Promise<IApiResponse> = props.editMode
      ? pushInstructorSchedule
      : pushInstructorSchedule

    setErrorMessages([])
    props.setApiCallInProgress(true)
    const response = await serviceMethoToCall(params)
    console.log(response)
    props.setApiCallInProgress(false)

    if (response && response.success) {
      props.closeModal && props.closeModal()
      eventBus.publish("REFRESH_FACULTY_SCHEDULE_TAB")
    } else {
      console.log(response.error)
      setErrorMessages(response.error)
    }
  }

  const handleRecurring = (isRecurring: boolean) => {
    setRecurring(isRecurring)
  }

  return (
    <Card
      title={props.editMode ? `Edit ${props.title}` : `Create New ${props.title}`}
      actions={[
        <Row justify="end" gutter={[8, 8]} style={{ marginRight: "10px" }}>
          <Col>
            <Button type="primary" aria-label="Cancel" danger onClick={() => props.closeModal && props.closeModal()}>
              Cancel
            </Button>
          </Col>
          <Col>
            <Button type="primary" aria-label="Submit" onClick={onFormSubmission}>
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
          maxHeight: "66vh",
          overflowY: "scroll"
        }}
      >
        <OldFormError errorMessages={errorMessages} />

        <Form.Item label={"PersonID"} className="hidden" name={props.fieldNames.PersonID}>
          <Input aria-label={"Person ID"} />
        </Form.Item>

        <Form.Item label={"ScheduleID"} className="hidden" name={props.fieldNames.ScheduleID}>
          <Input aria-label={"Schedule ID"} />
        </Form.Item>

        <FormDateTimePicker
          label={"Start Date/Time"}
          formInstance={props.formInstance}
          {...layout}
          aria-label="Pick Start Date"
          placeholder={DATE_TIME_FORMAT}
          fieldName={props.fieldNames.StartDate}
          defaultValue={props.initialFormValue.StartDate}
          rules={[{ required: true, message: "Please enter start date!" }]}
        />

        <FormDateTimePicker
          label={"End Date/Time"}
          formInstance={props.formInstance}
          {...layout}
          aria-label="Pick End Date"
          placeholder={DATE_TIME_FORMAT}
          fieldName={props.fieldNames.EndDate}
          defaultValue={props.initialFormValue.EndDate}
          rules={[{ required: true, message: "Please enter end date!" }]}
        />

        <Form.Item
          label={"Name"}
          {...layout}
          name={props.fieldNames.Name}
          rules={[{ required: true, message: "Please enter the name!" }]}
        >
          <Input aria-label={"Name"} />
        </Form.Item>

        <Form.Item label={"Description"} {...layout} name={props.fieldNames.Description}>
          <Input.TextArea rows={3} aria-label={"Description"} />
        </Form.Item>

        {!props.editMode && (
          <>
            <Form.Item label={"Recurring"} {...layout} valuePropName="checked">
              <Switch aria-label="Recurring" onChange={handleRecurring} />
            </Form.Item>

            {recurring && (
              <>
                <Form.Item label={"Repeat Until"} {...layout} name={props.fieldNames.RecurringDate}>
                  <DatePicker
                    showTime
                    aria-label="Pick Date"
                    placeholder={DATE_TIME_FORMAT}
                    format={DATE_TIME_FORMAT}
                  />
                </Form.Item>

                <Form.Item label="Days" {...layout} name={props.fieldNames.Days}>
                  <Checkbox.Group options={dayOptions} />
                </Form.Item>
              </>
            )}
          </>
        )}
      </Form>
    </Card>
  )
}
