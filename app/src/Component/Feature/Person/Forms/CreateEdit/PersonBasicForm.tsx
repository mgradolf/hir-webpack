import React, { useState, useEffect } from "react"
import { Card, Button, Input, Row, Col, Select, Radio } from "antd"
import Form, { FormInstance } from "antd/lib/form"
import { OldFormError } from "~/Component/Common/OldForm/OldFormError"
import { IPersonBasicFieldNames } from "~/Component/Feature/Person/Interfaces"
import { ISimplifiedApiErrorMessage } from "@packages/api/lib/utils/HandleResponse/ProcessedApiError"
import { pushPerson } from "~/ApiServices/Service/PersonService"
import { IApiResponse } from "@packages/api/lib/utils/Interfaces"
import { findPickList } from "~/ApiServices/BizApi/query/queryIf"
import { eventBus, REFRESH_PAGE } from "~/utils/EventBus"
import "~/Sass/global/index.scss"

interface IPersonFormProps {
  formInstance: FormInstance
  fieldNames: IPersonBasicFieldNames
  initialFormValue: { [key: string]: any }
  closeModal?: () => void
  setApiCallInProgress: (flag: boolean) => void
}

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 14 }
}

export default function PersonBasicForm(props: IPersonFormProps) {
  const [errorMessages, setErrorMessages] = useState<Array<ISimplifiedApiErrorMessage>>([])
  const [prefix, setPrefix] = useState<Array<any>>([])
  const [suffix, setSuffix] = useState<Array<any>>([])

  useEffect(() => {
    ;(async function () {
      const result = await findPickList({ PickListName: "PersonPrefix" })
      if (result.success && result.data) {
        setPrefix(result.data)
      }
    })()
    ;(async function () {
      const result = await findPickList({ PickListName: "PersonSuffix" })
      if (result.success && result.data) {
        setSuffix(result.data)
      }
    })()
  }, [])

  const onFormSubmission = async () => {
    await props.formInstance.validateFields()
    const params = props.formInstance.getFieldsValue()
    params["oca"] = props.initialFormValue.oca

    const serviceMethoToCall: (params: { [key: string]: any }) => Promise<IApiResponse> = pushPerson

    setErrorMessages([])
    props.setApiCallInProgress(true)
    const response = await serviceMethoToCall(params)
    console.log(response)
    props.setApiCallInProgress(false)

    if (response && response.success) {
      props.closeModal && props.closeModal()
      eventBus.publish(REFRESH_PAGE)
    } else {
      console.log(response.error)
      setErrorMessages(response.error)
    }
  }

  return (
    <Card
      title={"Update Basic Info"}
      actions={[
        <Row justify="end" gutter={[8, 8]} style={{ marginRight: "10px" }}>
          <Col>
            <Button type="primary" danger onClick={props.closeModal}>
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
        <Row>
          <Col xs={24} sm={24} md={12}>
            <Form.Item className="hidden" name={props.fieldNames.PersonID}>
              <Input aria-label={"Person ID"} />
            </Form.Item>
            <Form.Item label={"Prefix"} {...layout} name={props.fieldNames.Prefix}>
              <Select aria-label={"Prefix"}>
                {prefix.map((x, i) => {
                  return (
                    <Select.Option key={1000 + i} value={x}>
                      {x}
                    </Select.Option>
                  )
                })}
              </Select>
            </Form.Item>
            <Form.Item
              label={"First Name"}
              {...layout}
              name={props.fieldNames.FirstName}
              rules={[{ required: true, message: "Please enter first name!" }]}
            >
              <Input aria-label={"First Name"} />
            </Form.Item>
            <Form.Item
              label={"Last Name"}
              {...layout}
              name={props.fieldNames.LastName}
              rules={[{ required: true, message: "Please enter last name!" }]}
            >
              <Input aria-label={"Last Name"} />
            </Form.Item>
            <Form.Item label={"Suffix"} {...layout} name={props.fieldNames.Suffix}>
              <Select aria-label={"Suffix"}>
                {suffix.map((x, i) => {
                  return (
                    <Select.Option key={1000 + i} value={x}>
                      {x}
                    </Select.Option>
                  )
                })}
              </Select>
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={12}>
            <Form.Item label={"Middle Name"} {...layout} name={props.fieldNames.MiddleName}>
              <Input aria-label={"Middle Name"} />
            </Form.Item>
            <Form.Item label={"Maiden Name"} {...layout} name={props.fieldNames.MaidenName}>
              <Input aria-label={"Maiden Name"} />
            </Form.Item>
            <Form.Item label={"Other Name"} {...layout} name={props.fieldNames.OtherName}>
              <Input aria-label={"Other Name"} />
            </Form.Item>
            <Form.Item label={"Personal Information is Private"} {...layout} name={props.fieldNames.IsConfidential}>
              <Radio.Group aria-label={"Person information is private"}>
                <Radio value={true}>Yes</Radio>
                <Radio value={false}>No</Radio>
              </Radio.Group>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Card>
  )
}
