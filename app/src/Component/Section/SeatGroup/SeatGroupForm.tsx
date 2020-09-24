import React, { useEffect, useState } from "react"
import { Form, Card, Button, Input, Select, Switch } from "antd"
import { getDueDatePolicy } from "~/ApiServices/Service/RefLookupService"
import "~/Sass/utils.scss"
import { createSeatGroup, updateSeatGroup } from "~/ApiServices/Service/SeatGroupService"
import { IApiResponse } from "@packages/api/lib/utils/Interfaces"
import { eventBus, REFRESH_SECTION_SEATGROUP_PAGE } from "~/utils/EventBus"
import { ISimplifiedApiErrorMessage } from "@packages/api/lib/utils/HandleResponse/ProcessedApiError"
import FormError from "~/Component/FormError"

interface ISeatGroupCreateFormProps {
  sectionId: number
  seatgroupId?: number
  initialFormValue: { [key: string]: any }
  handleCancel: () => void
  setApiCallInProgress: (flag: boolean) => void
  formInstance: any
  fieldNames: { [key: string]: any }
}

const layout = {
  labelCol: { span: 6 }
}
export default function SeatGroupForm(props: ISeatGroupCreateFormProps) {
  const [dueDatePolicy, setDueDatePolicy] = useState<Array<any>>([])
  const [errorMessages, setErrorMessages] = useState<Array<ISimplifiedApiErrorMessage>>([])

  useEffect(() => {
    props.formInstance.setFieldsValue({ [props.fieldNames.SectionID]: props.sectionId })
    ;(async () => {
      const response = await getDueDatePolicy()
      if (response && response.success && response.data) {
        setDueDatePolicy(response.data)
      }
    })()
  }, [props])

  const onFormSubmission = async () => {
    await props.formInstance.validateFields()
    const params = props.formInstance.getFieldsValue()

    type serviceMethodType = (params: { [key: string]: any }) => Promise<IApiResponse>
    const serviceMethoToCall: serviceMethodType = props.seatgroupId ? updateSeatGroup : createSeatGroup

    props.setApiCallInProgress(true)
    setErrorMessages([])
    const response = await serviceMethoToCall(params)
    props.setApiCallInProgress(false)

    if (response && response.success) {
      props.formInstance.resetFields()
      eventBus.publish(REFRESH_SECTION_SEATGROUP_PAGE)
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

  console.log("secitonid: " + props.sectionId)

  return (
    <Card title={props.seatgroupId ? `Edit seat group` : "Create new seat group"} actions={actions}>
      <Form
        form={props.formInstance}
        initialValues={props.initialFormValue}
        style={{ height: "65vh", overflowY: "scroll", padding: "10px" }}
      >
        <FormError errorMessages={errorMessages} />
        <Form.Item className="hidden" name={props.fieldNames.SeatGroupID}>
          <Input value={props.seatgroupId ? props.seatgroupId : undefined} />
        </Form.Item>

        <Form.Item className="hidden" name={props.fieldNames.SectionID}>
          <Input value={props.sectionId} />
        </Form.Item>

        <Form.Item label="Name" {...layout} name={props.fieldNames.Name}>
          <Input />
        </Form.Item>

        <Form.Item label="# of Seats" {...layout} name={props.fieldNames.NumberOfSeats}>
          <Input type="number" min={0} />
        </Form.Item>

        <Form.Item label="Esitmated Enrollment" {...layout} name={props.fieldNames.EstimatedEnrollment}>
          <Input type="number" min={0} />
        </Form.Item>

        <Form.Item label="Due Date Policy" name={props.fieldNames.DueDatePolicyID} {...layout}>
          <Select>
            {dueDatePolicy.map((x) => {
              return (
                <Select.Option key={x.ID + x.Name} value={x.ID}>
                  {x.Name}
                </Select.Option>
              )
            })}
          </Select>
        </Form.Item>

        <Form.Item name={props.fieldNames.IsOptional} label="Waitlist Enabled" {...layout} valuePropName="checked">
          <Switch defaultChecked={props.formInstance.getFieldValue(props.fieldNames.WaitListEnabled)} />
        </Form.Item>
      </Form>
    </Card>
  )
}
