import React, { useEffect, useState } from "react"
import { Form, Card, Button, Input, Select } from "antd"
import {
  getProgramEnrollmentStatusCodes
} from "~/ApiServices/Service/RefLookupService"
import "~/Sass/utils.scss"
import { changeEnrollmentStatusWithEvent } from "~/ApiServices/BizApi/program/programEnrollmentIF"
import { IApiResponse } from "@packages/api/lib/utils/Interfaces"
import {
  eventBus,
  REFRESH_PAGE
} from "~/utils/EventBus"
import { ISimplifiedApiErrorMessage } from "@packages/api/lib/utils/HandleResponse/ProcessedApiError"
import FormError from "~/Component/Common/Form/FormError"

interface IEnrollmentFormProps {
  enrollmentID: number
  initialFormValue: { [key: string]: any }
  handleCancel: () => void
  setApiCallInProgress: (flag: boolean) => void
  formInstance: any
  fieldNames: { [key: string]: any }
}

const layout = {
  labelCol: { span: 6 }
}
export default function ProgramEnrollmentForm(props: IEnrollmentFormProps) {
  const [statusTypes, setStatusTypes] = useState<Array<any>>([])
  const [errorMessages, setErrorMessages] = useState<Array<ISimplifiedApiErrorMessage>>([]);

  useEffect(() => {
    props.formInstance.setFieldsValue({ [props.fieldNames.ProgramEnrollmentID]: props.enrollmentID })
    ;(async () => {
      const response = await getProgramEnrollmentStatusCodes()
      if (response && response.success && response.data) {
        setStatusTypes(response.data)
      }
    })()
  }, [props])

  const onFormSubmission = async () => {
    await props.formInstance.validateFields()
    const params = props.formInstance.getFieldsValue()

    type serviceMethodType = (params: { [key: string]: any }) => Promise<IApiResponse>
    const serviceMethoToCall: serviceMethodType = changeEnrollmentStatusWithEvent

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
    <Card title={`Update Program Enrollment`} actions={actions}>
      <Form form={props.formInstance} initialValues={props.initialFormValue} className="modal-form">
        <FormError errorMessages={errorMessages} />
        <Form.Item className="hidden" name={props.fieldNames.ProgramEnrollmentID}>
          <Input aria-label="Enrollment ID" value={props.enrollmentID ? props.enrollmentID : undefined} />
        </Form.Item>

        <Form.Item label="Status" name={props.fieldNames.StatusID} {...layout}>
          <Select aria-label="Status Select">
            {statusTypes.map((x) => {
              return (
                <Select.Option key={x.StatusID} value={x.StatusID}>
                  {x.Name}
                </Select.Option>
              )
            })}
          </Select>
        </Form.Item>

        <Form.Item label="Comments" {...layout} name={props.fieldNames.CommentText}>
          <Input.TextArea rows={4} aria-label="Comments" />
        </Form.Item>
      </Form>
    </Card>
  )
}