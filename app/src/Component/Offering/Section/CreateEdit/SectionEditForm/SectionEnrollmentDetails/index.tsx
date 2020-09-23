import React, { useEffect, useState } from "react"
import { Card, Button, Form, Row, Col, Input } from "antd"
import Title from "antd/lib/typography/Title"
import SectionEnrollmentDetailsDuration from "~/Component/Offering/Section/CreateEdit/SectionEditForm/SectionEnrollmentDetails/SectionEnrollmentDetailsDuration"
import GradesCredits from "~/Component/Offering/Section/CreateEdit/SectionEditForm/SectionEnrollmentDetails/GradesCredits"
import { updateSection } from "~/ApiServices/Service/SectionService"

interface ISectionEnrollmentDetailsProps {
  Section: { [key: string]: string }
  handleCancel: () => void
  handleSubmit: (param: { [key: string]: any }) => void
  setApiCallInProgress: (flag: boolean) => void
}

export interface ISectionEnrollmentDetails {
  SectionID: string //10823
  MinEnrollment: string //110
  MaxEnrollment: string //500
  DefaultEnrollmentDuration: string //null
  IsGradesEntered: string //false
  GradeScaleTypeID: string //2044
  CreditTypeID: string //2002
  CreditHours: string //null
  LoadHours: string //null
  ClockHours: string //null
  CEUHours: string //null
  AttendanceExpected: string //null
  AttendanceUnitID: string //null
}

const fieldNames: ISectionEnrollmentDetails = {
  SectionID: "SectionID",
  MinEnrollment: "MinEnrollment",
  MaxEnrollment: "MaxEnrollment",
  DefaultEnrollmentDuration: "DefaultEnrollmentDuration",
  IsGradesEntered: "IsGradesEntered",
  GradeScaleTypeID: "GradeScaleTypeID",
  CreditTypeID: "CreditTypeID",
  CreditHours: "CreditHours",
  LoadHours: "LoadHours",
  ClockHours: "ClockHours",
  CEUHours: "CEUHours",
  AttendanceExpected: "AttendanceExpected",
  AttendanceUnitID: "AttendanceUnitID"
}
const layout = { labelCol: { span: 12, offset: 1 }, wrapperCol: { span: 12, offset: 1 } }

export default function SectionEnrollmentDetails(props: ISectionEnrollmentDetailsProps) {
  const [formInstance] = Form.useForm()
  const actions = []
  const [saveButtonLoading, setSaveButtonLoading] = useState(false)
  const [buttonText, setButtonText] = useState("Save")
  useEffect(() => {
    Object.keys(props.Section).forEach((key) => {
      formInstance.setFieldsValue({ [key]: props.Section[key] })
    })
  }, [formInstance, props.Section])
  actions.push(<Button onClick={props.handleCancel}>Cancel</Button>)
  actions.push(
    <Button
      loading={saveButtonLoading}
      onClick={() => {
        props.setApiCallInProgress(true)
        setSaveButtonLoading(true)
        setButtonText("Saving")
        console.log(formInstance.getFieldsValue())
        updateSection(formInstance.getFieldsValue()).then((response) => {
          if (response.success) {
            props.setApiCallInProgress(false)
            setSaveButtonLoading(false)
            setButtonText("Save")
          }
        })
      }}
    >
      {buttonText}
    </Button>
  )
  return (
    <Card actions={actions}>
      <Form
        form={formInstance}
        style={{ height: "65vh", overflowY: "scroll", padding: "10px", paddingBottom: "150px" }}
      >
        <Title level={4}>Enrollment</Title>
        <Form.Item className="hidden" name={fieldNames.SectionID}>
          <Input value={props.Section.SectionID} />
        </Form.Item>
        <Row>
          <Col>
            <Form.Item label="Current Enrollment" {...layout}>
              <Input disabled value="0" />
            </Form.Item>
          </Col>
          <Col>
            <Form.Item label="Total Seats" {...layout}>
              <Input disabled value="0" />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Item label="Minimum Enrollment" name={fieldNames.MinEnrollment} {...layout}>
              <Input />
            </Form.Item>
          </Col>
          <Col>
            <Form.Item label="Total Seat Groups" {...layout}>
              <Input disabled value="0" />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Item label="Maximum Enrollment" name={fieldNames.MaxEnrollment} {...layout}>
              <Input />
            </Form.Item>
          </Col>
          <Col>
            <Form.Item label="Total Seats Used" {...layout}>
              <Input disabled value="0" />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Item label="Estimated Enrollment" {...layout}>
              <Input disabled value="0" />
            </Form.Item>
          </Col>
          <Col>
            <Form.Item label="Total Seats Available" {...layout}>
              <Input disabled value="0" />
            </Form.Item>
          </Col>
        </Row>
        <Title level={4}>Enrollment Duration Default</Title>
        <SectionEnrollmentDetailsDuration {...{ fieldNames, formInstance }} />
        <Title level={4}>Grades and Credits</Title>
        <GradesCredits {...{ fieldNames, formInstance }} />
      </Form>
    </Card>
  )
}
