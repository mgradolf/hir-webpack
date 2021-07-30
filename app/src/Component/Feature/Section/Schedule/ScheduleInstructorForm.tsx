import React, { useEffect, useState } from "react"
import { Form, Card, Button, Input, Select, Row, Col } from "antd"
import { findQualifiedInstructors } from "~/ApiServices/BizApi/scheduling/schedulingIF"
import { scheduleInstructor } from "~/ApiServices/Service/SectionService"
import { IApiResponse } from "@packages/api/lib/utils/Interfaces"
import { ISimplifiedApiErrorMessage } from "@packages/api/lib/utils/HandleResponse/ProcessedApiError"
import { OldFormError } from "~/Component/Common/OldForm/OldFormError"
import { FormInstance } from "antd/lib/form"
import { IScheduleInstructorFieldNames } from "~/Component/Feature/Section/Interfaces"
import { eventBus, REFRESH_SECTION_SCHEDULE_PAGE } from "~/utils/EventBus"
import { FormMultipleRadio } from "~/Component/Common/Form/FormMultipleRadio"
import "~/Sass/utils.scss"
import { HelpButton } from "~/Component/Common/Form/Buttons/HelpButton"

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
  labelCol: { span: 8 },
  wrapperCol: { span: 14 }
}
export default function ScheduleInstructorForm(props: IScheduleInstructorFormProps) {
  const [instructorItems, setInstructorItems] = useState<Array<any>>([])
  const [errorMessages, setErrorMessages] = useState<Array<ISimplifiedApiErrorMessage>>([])

  useEffect(() => {
    ;(async () => {
      const response = await findQualifiedInstructors({ SectionID: props.sectionId })
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

  return (
    <Card
      title={
        <Row justify="space-between">
          <Col>Update Instructor</Col>
          <Col>
            <HelpButton helpKey="sectionScheduleUpdateInstructorForm" />
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

        <FormMultipleRadio
          labelColSpan={8}
          wrapperColSpan={14}
          formInstance={props.formInstance}
          label={"Check for conflicts(slower)"}
          ariaLabel={"Check for conflicts(slower)"}
          fieldName={props.fieldNames.ConflictCheck}
          options={[
            { label: "Yes", value: true },
            { label: "No", value: false }
          ]}
        />
      </Form>
    </Card>
  )
}
