import React, { useEffect, useState } from "react"
import { Form, Card, Button, Input, Select, Row, Col, message } from "antd"
import { getDueDatePolicy } from "~/ApiServices/Service/RefLookupService"
import { createSeatGroup, updateSeatGroup } from "~/ApiServices/Service/SeatGroupService"
import { IApiResponse } from "@packages/api/lib/utils/Interfaces"
import { ISimplifiedApiErrorMessage } from "@packages/api/lib/utils/HandleResponse/ProcessedApiError"
import { OldFormError } from "~/Component/Common/OldForm/OldFormError"
import { FormMultipleRadio } from "~/Component/Common/Form/FormMultipleRadio"
import { Redirect } from "react-router"
import { CREATE_SUCCESSFULLY, UPDATE_SUCCESSFULLY } from "~/utils/Constants"
import { eventBus, REFRESH_PAGE } from "~/utils/EventBus"
import "~/Sass/utils.scss"
import { HelpButton } from "~/Component/Common/Form/Buttons/HelpButton"

interface ISeatGroupCreateFormProps {
  sectionId: number
  seatgroupId?: number
  programId?: number
  programCode?: string
  isDefault?: boolean
  initialFormValue: { [key: string]: any }
  handleCancel: () => void
  setApiCallInProgress: (flag: boolean) => void
  formInstance: any
  fieldNames: { [key: string]: any }
  helpKey?: string
}

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 14 }
}

export function SeatGroupForm(props: ISeatGroupCreateFormProps) {
  const [dueDatePolicy, setDueDatePolicy] = useState<Array<any>>([])
  const [errorMessages, setErrorMessages] = useState<Array<ISimplifiedApiErrorMessage>>([])
  const [redirectAfterCreate, setRedirectAfterCreate] = useState<string>()

  const isEdit = props.seatgroupId !== undefined

  useEffect(() => {
    props.formInstance.setFieldsValue({
      [props.fieldNames.SectionID]: props.sectionId,
      [props.fieldNames.ProgramID]: props.programId,
      [props.fieldNames.ProgramCode]: props.programCode
    })
    ;(async () => {
      const response = await getDueDatePolicy()
      if (response && response.success && response.data) {
        setDueDatePolicy(response.data)
      }
    })()
    // eslint-disable-next-line
  }, [])

  const onFormSubmission = async () => {
    await props.formInstance.validateFields()
    const params = props.formInstance.getFieldsValue()

    Object.keys(params).forEach((key) => {
      if (params[key] === undefined) delete params[key]
    })

    type serviceMethodType = (params: { [key: string]: any }) => Promise<IApiResponse>
    const serviceMethoToCall: serviceMethodType = isEdit ? updateSeatGroup : createSeatGroup

    props.setApiCallInProgress(true)
    setErrorMessages([])
    const response = await serviceMethoToCall(params)
    props.setApiCallInProgress(false)

    if (response && response.success) {
      message.success(isEdit ? UPDATE_SUCCESSFULLY : CREATE_SUCCESSFULLY)
      if (isEdit) {
        eventBus.publish("REFRESH_SECTION_SEATGROUP_PAGE_1")
        eventBus.publish(REFRESH_PAGE)
      } else {
        setRedirectAfterCreate(`/seatgroup/${response.data.SeatGroupID}`)
      }
      props.handleCancel()
    } else {
      setErrorMessages(response.error)
      console.log(response.error)
      console.log(errorMessages)
    }
  }

  return (
    <>
      {redirectAfterCreate && <Redirect to={redirectAfterCreate} />}
      <Card
        title={
          <Row justify="space-between">
            <Col>{props.seatgroupId ? `Edit seat group` : "Create new seat group"}</Col>
            <Col>
              <HelpButton helpKey={props.helpKey} />
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

          <FormMultipleRadio
            labelColSpan={8}
            wrapperColSpan={14}
            formInstance={props.formInstance}
            label={"Waitlist Enabled"}
            ariaLabel={"Is Waitlist Enabled"}
            fieldName={props.fieldNames.WaitListEnabled}
            options={[
              { label: "Yes", value: true },
              { label: "No", value: false }
            ]}
          />
        </Form>
      </Card>
    </>
  )
}
