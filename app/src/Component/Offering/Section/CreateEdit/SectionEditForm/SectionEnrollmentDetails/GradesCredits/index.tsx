import { Col, Form, Input, Row } from "antd"
import { FormInstance } from "antd/lib/form"
import React from "react"
import { ISectionEnrollmentDetails } from "~/Component/Offering/Section/CreateEdit/SectionEditForm/SectionEnrollmentDetails"
import GradeScale from "~/Component/Offering/Section/CreateEdit/SectionEditForm/SectionEnrollmentDetails/GradesCredits/GradeScale"
import CreditType from "~/Component/Offering/Section/CreateEdit/SectionEditForm/SectionEnrollmentDetails/GradesCredits/CreditType"
import AttendanceUnit from "~/Component/Offering/Section/CreateEdit/SectionEditForm/SectionEnrollmentDetails/GradesCredits/AttendanceUnit"

interface IGradesCredits {
  fieldNames: ISectionEnrollmentDetails
  formInstance: FormInstance
}
const layout = { labelCol: { span: 12 }, wrapperCol: { span: 12, offset: 1 } }
export default function GradesCredits(props: IGradesCredits) {
  return (
    <>
      <Row>
        <Col span={12}>
          <GradeScale {...props} />
        </Col>
        <Col span={12}>
          <CreditType {...props} />
        </Col>
      </Row>

      <Row>
        <Col>
          <Form.Item name={props.fieldNames.CreditHours} label="Creadit Hours" {...layout}>
            <Input type="number" min="0" />
          </Form.Item>
        </Col>
        <Col>
          <Form.Item name={props.fieldNames.ClockHours} label="Clock Hours" {...layout}>
            <Input type="number" min="0" />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form.Item name={props.fieldNames.LoadHours} label="Load Hours" {...layout}>
            <Input type="number" min="0" />
          </Form.Item>
        </Col>
        <Col>
          <Form.Item name={props.fieldNames.CEUHours} label="CEU Hours" {...layout}>
            <Input type="number" min="0" />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <Form.Item name={props.fieldNames.AttendanceExpected} label="Attendance Expected" {...layout}>
            <Input type="number" min="0" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <AttendanceUnit {...props} />
        </Col>
      </Row>
    </>
  )
}
