import React, { useEffect, useState } from "react"
import { Form, Card, Button, Input, Select, Switch, Divider } from "antd"
import "~/Sass/utils.scss"
import { IApiResponse } from "@packages/api/lib/utils/Interfaces"
import { eventBus, REFRESH_PAGE } from "~/utils/EventBus"
import { ISimplifiedApiErrorMessage } from "@packages/api/lib/utils/HandleResponse/ProcessedApiError"
import FormError from "~/Component/Common/FormError"
import { saveSectionNotification } from "~/ApiServices/Service/SectionService"
import { getAllUsers } from "~/ApiServices/Service/HRUserService"

interface INoticeEditFormProps {
  sectionId: number
  initialFormValue: { [key: string]: any }
  handleCancel: () => void
  setApiCallInProgress: (flag: boolean) => void
  formInstance: any
  fieldNames: { [key: string]: any }
}

const layout = {
  labelCol: { span: 6 }
}

export default function NoticeEditForm(props: INoticeEditFormProps) {
  const [fromUserItems, setFromUserItems] = useState<Array<any>>([])
  const [errorMessages, setErrorMessages] = useState<Array<ISimplifiedApiErrorMessage>>([])
  const [disableFieldMap] = useState<{ [key: string]: any }>({})

  useEffect(() => {
    const disableFields: Array<any> = props.formInstance.getFieldValue(props.fieldNames.DisableFields)
    if (disableFields !== undefined && disableFields !== null && Object.keys(disableFields).length > 0) {
      disableFields.forEach((element) => {
        disableFieldMap[element] = true
      })
    }

    props.formInstance.setFieldsValue({ [props.fieldNames.SectionID]: props.sectionId })
    ;(async () => {
      const response = await getAllUsers()
      if (response && response.success && response.data) {
        setFromUserItems(response.data)
      }
    })()
    // eslint-disable-next-line
  }, [])

  const onFormSubmission = async () => {
    await props.formInstance.validateFields()
    const params = props.formInstance.getFieldsValue()

    Object.keys(params).forEach((key) => {
      if (params[key] === undefined) params[key] = null
    })
    console.log("Params: ", params)

    type serviceMethodType = (params: { [key: string]: any }) => Promise<IApiResponse>
    const serviceMethoToCall: serviceMethodType = saveSectionNotification

    props.setApiCallInProgress(true)
    setErrorMessages([])
    const response = await serviceMethoToCall(params)
    props.setApiCallInProgress(false)

    if (response && response.success) {
      eventBus.publish(REFRESH_PAGE)
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
    <Card title={`Edit Email Notification`} actions={actions}>
      <Form form={props.formInstance} initialValues={props.initialFormValue} className="modal-form">
        <FormError errorMessages={errorMessages} />

        <Form.Item className="hidden" name={props.fieldNames.SectionID}>
          <Input aria-label="Section ID" />
        </Form.Item>

        <Form.Item className="hidden" name={props.fieldNames.SectionNoticeTypeID}>
          <Input aria-label="Section Notice Type ID" />
        </Form.Item>

        <Form.Item label="From User" {...layout} name={props.fieldNames.FromUserID}>
          <Select
            aria-label="From User"
            disabled={disableFieldMap[props.fieldNames.FromUserID]}
            placeholder="Select users"
            allowClear
          >
            {fromUserItems.map((x) => {
              return (
                <Select.Option key={x.UserID} value={x.UserID}>
                  {x.FormattedName}
                </Select.Option>
              )
            })}
          </Select>
        </Form.Item>

        <Form.Item label="OR From Email" {...layout} name={props.fieldNames.FromEmailAddress}>
          <Input aria-label="From Email" disabled={disableFieldMap[props.fieldNames.FromEmailAddress]} />
        </Form.Item>

        <Divider />

        <Form.Item label="To Users" {...layout} name={props.fieldNames.ToUserIDs}>
          <Select
            mode="multiple"
            disabled={disableFieldMap[props.fieldNames.ToUserIDs]}
            placeholder="Select users"
            allowClear
          >
            {fromUserItems.map((x) => {
              return (
                <Select.Option key={x.UserID} value={x.UserID}>
                  {x.FormattedName}
                </Select.Option>
              )
            })}
          </Select>
        </Form.Item>

        <Form.Item label="OR To Email" {...layout} name={props.fieldNames.ToEmailAddress}>
          <Input aria-label="To Email" disabled={disableFieldMap[props.fieldNames.ToEmailAddress]} />
        </Form.Item>

        <Divider />

        <Form.Item label="Subject" {...layout} name={props.fieldNames.Subject}>
          <Input aria-label="Subject" />
        </Form.Item>

        <Form.Item label="Message" {...layout} name={props.fieldNames.Message}>
          <Input.TextArea rows={4} aria-label="Message" />
        </Form.Item>

        <Form.Item label="Mime Type" {...layout} name={props.fieldNames.MimeType}>
          <Select aria-label="Mime Type">
            <Select.Option key="text/plain" value="text/plain">
              text/plain
            </Select.Option>
            <Select.Option key="text/html" value="text/html">
              text/html
            </Select.Option>
          </Select>
        </Form.Item>

        <Form.Item name={props.fieldNames.IsActive} label="Active Notification" {...layout} valuePropName="checked">
          <Switch
            aria-label="Active Notification"
            defaultChecked={props.formInstance.getFieldValue(props.fieldNames.IsActive)}
          />
        </Form.Item>
      </Form>
    </Card>
  )
}
