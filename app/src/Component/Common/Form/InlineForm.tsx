import { Button, Col, Form, Row } from "antd"
import React, { useEffect, useState } from "react"
import { EditOutlined, CloseOutlined, CheckOutlined } from "@ant-design/icons"
import { IApiResponse } from "@packages/api/lib/utils/Interfaces"
import { eventBus } from "~/utils/EventBus"
import { IField } from "~/Component/Common/Form/common"
import { FormInput } from "~/Component/Common/Form/FormInput"
import { FormDropDown } from "~/Component/Common/Form/FormDropDown"
import { FormNumberInput } from "~/Component/Common/Form/FormNumberInput"
import { FormTextArea } from "~/Component/Common/Form/FormTextArea"
import { FormMultiSelectDropDown } from "~/Component/Common/Form/FormMultiSelectDropDown"
import { FormMultipleCheckbox } from "~/Component/Common/Form/FormMultipleCheckbox"
import { FormDatePicker } from "~/Component/Common/Form/FormDatePicker"
import { FormDatePickers } from "~/Component/Common/Form/FormDatePickers"
import { FormCheckbox } from "~/Component/Common/Form/FormCheckbox"
import { FormMultipleRadio } from "~/Component/Common/Form/FormMultipleRadio"

interface IInlineForm extends Omit<IField, "label"> {
  refreshEventName: string
  updateFunc: (Params: { [key: string]: any }) => Promise<IApiResponse>
}
export const InlineForm = (props: IInlineForm) => {
  const [formInstance] = Form.useForm()
  const [apiCallInProgress, setApiCallInProgress] = useState(false)
  const [showForm, setShowForm] = useState<boolean>(false)

  useEffect(() => {
    if (!showForm) {
      formInstance.setFieldsValue({ [props.fieldName]: props.defaultValue })
      if (props.fieldName2) formInstance.setFieldsValue({ [props.fieldName2]: props.defaultValue2 })
    }
  }, [showForm, props.fieldName, props.fieldName2, props.defaultValue, props.defaultValue2, formInstance])

  const propsToPass = {
    ...props,
    labelColSpan: 0,
    wrapperColSpan: 24,
    disabled: !showForm,
    label: "",
    formInstance: formInstance,
    defaultValue: props.defaultValue,
    defaultValue2: props.defaultValue2
  }

  return (
    <Form form={formInstance}>
      <Row gutter={8} style={{ height: "30px" }}>
        <Col flex="auto">
          {props.inputType === "TEXT" && <FormInput {...propsToPass} />}
          {props.inputType === "NUMBER" && <FormNumberInput {...propsToPass} />}
          {props.inputType === "TEXTAREA" && <FormTextArea {...propsToPass} />}
          {props.inputType === "DROPDOWN" && <FormDropDown {...propsToPass} />}
          {props.inputType === "MULTI_SELECT_DROPDOWN" && <FormMultiSelectDropDown {...propsToPass} />}
          {props.inputType === "MULTI_SELECT_CHECKBOX" && <FormMultipleCheckbox {...propsToPass} />}
          {props.inputType === "DATE_PICKER" && <FormDatePicker {...propsToPass} />}
          {props.inputType === "DATE_PICKERS" && <FormDatePickers {...propsToPass} />}
          {props.inputType === "BOOLEAN" && <FormCheckbox {...propsToPass} />}
          {props.inputType === "MULTI_RADIO" && <FormMultipleRadio {...propsToPass} />}
        </Col>
        {!showForm && (
          <Col flex="20px">
            <Button type="default" shape="circle" icon={<EditOutlined />} onClick={() => setShowForm(true)} />
          </Col>
        )}
        {showForm && (
          <Col flex="30px">
            <Button
              ghost
              type="primary"
              shape="circle"
              loading={apiCallInProgress}
              icon={<CheckOutlined />}
              onClick={() => {
                setApiCallInProgress(true)
                props.updateFunc(formInstance.getFieldsValue()).then((x) => {
                  if (x.success) {
                    eventBus.publish(props.refreshEventName)
                    setShowForm(false)
                  }
                  setApiCallInProgress(false)
                })
              }}
            />
          </Col>
        )}

        {showForm && (
          <Col flex="30px">
            <Button
              danger
              type="default"
              shape="circle"
              icon={<CloseOutlined />}
              onClick={() => {
                formInstance.resetFields()
                setShowForm(false)
              }}
            />
          </Col>
        )}
      </Row>
    </Form>
  )
}
