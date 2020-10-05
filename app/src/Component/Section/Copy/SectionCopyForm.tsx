import { Checkbox, Col, DatePicker, Form, Input, Row } from "antd"
import { FormInstance } from "antd/lib/form"
import React, { useEffect, useState } from "react"

export interface IFieldNames {
  SectionID: string
  StartDate: string
  Schedule: string
  Location: string
  Instructor: string
  Notes: string
  Financials: string
  Discount: string
  Product: string
}

const fieldNames: IFieldNames = {
  SectionID: "SectionID",
  Schedule: "Schedule",
  Location: "Location",
  Instructor: "Instructor",
  Notes: "Notes",
  StartDate: "StartDate",
  Financials: "Financials",
  Discount: "Discount",
  Product: "Product"
}

interface ISectionCopyForm {
  SectionID?: number
  formInstance: FormInstance
}
export default function SectionCopyForm(props: ISectionCopyForm) {
  const [disableScheduleGroup, setDisableScheduleGroup] = useState(false)
  useEffect(() => {
    props.formInstance.setFieldsValue({ [fieldNames.SectionID]: props.SectionID })
  }, [props])
  return (
    <>
      <Form.Item name={fieldNames.SectionID} className="hidden">
        <Input />
      </Form.Item>
      <Form.Item name={fieldNames.StartDate} className="hidden">
        <Input />
      </Form.Item>

      <Form.Item
        name={fieldNames.Schedule}
        label="Schedule"
        valuePropName="checked"
        labelCol={{ span: 4 }}
        labelAlign="left"
      >
        <Checkbox
          onChange={(value) => {
            const isChecked = value.target.checked
            setDisableScheduleGroup(!isChecked)
            props.formInstance.setFieldsValue({ [fieldNames.Location]: isChecked })
            props.formInstance.setFieldsValue({ [fieldNames.Instructor]: isChecked })
            props.formInstance.setFieldsValue({ [fieldNames.Notes]: isChecked })
          }}
        />
      </Form.Item>

      <Row>
        <Col span={8}>
          <Form.Item
            name={fieldNames.Location}
            label="Location"
            valuePropName="checked"
            labelCol={{ span: 12 }}
            labelAlign="left"
          >
            <Checkbox disabled={disableScheduleGroup} />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            name={fieldNames.Instructor}
            label="Instructor"
            valuePropName="checked"
            labelCol={{ span: 12 }}
            labelAlign="left"
          >
            <Checkbox disabled={disableScheduleGroup} />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            name={fieldNames.Notes}
            label="Notes"
            valuePropName="checked"
            labelCol={{ span: 12 }}
            labelAlign="left"
          >
            <Checkbox disabled={disableScheduleGroup} />
          </Form.Item>
        </Col>
      </Row>
      <Form.Item label="StartDate" labelCol={{ span: 4 }} labelAlign="left" wrapperCol={{ span: 4 }}>
        <DatePicker
          size="large"
          allowClear
          disabled={disableScheduleGroup}
          onChange={(value: any, dateString: string) => {
            props.formInstance.setFieldsValue({ [fieldNames.StartDate]: dateString })
          }}
          format="MM/DD/YYYY"
        />
      </Form.Item>
      <Row>
        <Col span={8}>
          <Form.Item
            name={fieldNames.Financials}
            label="Financials"
            valuePropName="checked"
            labelCol={{ span: 12 }}
            labelAlign="left"
          >
            <Checkbox />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            name={fieldNames.Discount}
            label="Discount"
            valuePropName="checked"
            labelCol={{ span: 12 }}
            labelAlign="left"
          >
            <Checkbox />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            name={fieldNames.Product}
            label="Product"
            valuePropName="checked"
            labelCol={{ span: 12 }}
            labelAlign="left"
          >
            <Checkbox />
          </Form.Item>
        </Col>
      </Row>
    </>
  )
}
