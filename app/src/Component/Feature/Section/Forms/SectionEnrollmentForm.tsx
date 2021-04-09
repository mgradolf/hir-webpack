import React from "react"
import { Row, Col, Divider } from "antd"
import SectionEnrollmentDetailsDuration from "~/Component/Feature/Section/CreateEdit/SectionEditForm/SectionEnrollmentDetails/SectionEnrollmentDetailsDuration"
import { FormInstance } from "antd/lib/form"
import { FormInput } from "~/Component/Common/Form/FormInput"

interface ISectionEnrollmentFormProps {
  formInstance: FormInstance
  initialValue: { [key: string]: any }
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

export function SectionEnrollmentForm(props: ISectionEnrollmentFormProps) {
  props.formInstance.setFieldsValue({ [fieldNames.DefaultEnrollmentDuration]: "FollowSectionDates" })

  return (
    <>
      <Divider orientation="left">Enrollment Summary</Divider>
      <Row>
        <Col xs={24} sm={24} md={12}>
          <FormInput
            labelColSpan={8}
            wrapperColSpan={14}
            label={"Minimum Enrollment"}
            ariaLabel={"Minimum Enrollment"}
            formInstance={props.formInstance}
            fieldName={fieldNames.MinEnrollment}
          />
        </Col>
        <Col xs={24} sm={24} md={12}>
          <FormInput
            labelColSpan={8}
            wrapperColSpan={14}
            label={"Maximum Enrollment"}
            ariaLabel={"Maximum Enrollment"}
            formInstance={props.formInstance}
            fieldName={fieldNames.MaxEnrollment}
          />
        </Col>
      </Row>
      <SectionEnrollmentDetailsDuration {...{ fieldNames, formInstance: props.formInstance }} />
    </>
  )
}
