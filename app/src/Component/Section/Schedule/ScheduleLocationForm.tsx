import React, { useEffect, useState } from "react"
import { Form, Card, Button, Input, Select, Switch } from "antd"
import { findPossibleSites } from "~/ApiServices/BizApi/scheduling/schedulingIF"
import "~/sass/utils.scss"
import { ISimplifiedApiErrorMessage } from "@packages/api/lib/utils/HandleResponse/ProcessedApiError"
import FormError from "~/Component/FormError"

interface IScheduleCreateFormProps {
  scheduleIds: any
  handleCancel: () => void
  setApiCallInProgress: (flag: boolean) => void
  formInstance: any
  fieldNames: { [key: string]: any }
}

const layout = {
  labelCol: { span: 6 }
}
export default function ScheduleLocationForm(props: IScheduleCreateFormProps) {
  const [siteItems, setSiteItems] = useState<Array<any>>([])
  const [errorMessages, setErrorMessages] = useState<Array<ISimplifiedApiErrorMessage>>([])

  useEffect(() => {
    ;(async () => {
      const response = await findPossibleSites()
      if (response && response.success && response.data) {
        setSiteItems(response.data)
      }
    })()
  }, [props])

  const onFormSubmission = async () => {
    setErrorMessages([])

    // await props.formInstance.validateFields()
    // const params = props.formInstance.getFieldsValue()

    // if (props.scheduleIds) {
    //   params["ScheduleIDs"] = props.scheduleIds
    // }

    // type serviceMethodType = (params: { [key: string]: any }) => Promise<IApiResponse>
    // const serviceMethoToCall: serviceMethodType = props.scheduleIds ? saveMeetings : createMeetings

    // props.setApiCallInProgress(true)
    // setErrorMessages([])
    // const response = await serviceMethoToCall(params)
    // props.setApiCallInProgress(false)

    // if (response && response.success) {
    //   props.formInstance.resetFields()
    //   //eventBus.publish(REFRESH_SECTION_SCHEDULE_PAGE)
    //   props.handleCancel()
    // } else {
    //   setErrorMessages(response.error)
    //   console.log(response.error)
    //   console.log(errorMessages)
    // }
  }

  const actions = []
  actions.push(<Button onClick={props.handleCancel}>Cancel</Button>)
  actions.push(<Button onClick={onFormSubmission}>Submit</Button>)

  return (
    <Card title="Update Location" actions={actions}>
      <Form form={props.formInstance} style={{ height: "65vh", overflowY: "scroll", padding: "10px" }}>
        <FormError errorMessages={errorMessages} />
        <Form.Item className="hidden" name={props.fieldNames.ScheduleIDs}>
          <Input aria-label="Schedule IDs" value={props.scheduleIds} />
        </Form.Item>

        <Form.Item label="Site" name={props.fieldNames.SiteID} {...layout}>
          <Select aria-label="Site select">
            {siteItems.map((x) => {
              return (
                <Select.Option key={x.SiteID + x.Name} value={x.SiteID}>
                  {x.Name}
                </Select.Option>
              )
            })}
          </Select>
        </Form.Item>

        {/* <Form.Item label="Building" name={props.fieldNames.BuidlingID} {...layout}>
          <Select aria-label="Building select" onChange={buildingHandler}>
            {buildingItems.map((x) => {
              return (
                <Select.Option key={x.BuildingID + x.Name} value={x.BuildingID}>
                  {x.Name}
                </Select.Option>
              )
            })}
          </Select>
        </Form.Item>

        <Form.Item label="Room" name={props.fieldNames.RoomID} {...layout}>
          <Select aria-label="Room select">
            {roomItems.map((x) => {
              return (
                <Select.Option key={x.RoomID + x.Name} value={x.RoomID}>
                  {x.Name}
                </Select.Option>
              )
            })}
          </Select>
        </Form.Item> */}

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
