import React from "react"
import { Col, Row } from "antd"
import { FormInstance } from "antd/lib/form"
import { FormInput } from "~/Component/Common/Form/FormInput"
import { FormTextArea } from "~/Component/Common/Form/FormTextArea"
import SectionTimingForm from "~/Component/Feature/Section/Forms/SectionTimingForm"
import "~/Sass/utils.scss"

interface IBasicInfoFormProps {
  formInstance: FormInstance
  initialValue: { [key: string]: any }
}

export interface ISectionDetailsFieldNames {
  SectionID: string
  SectionNumber: string
  Description: string
  SectionStatusCodeID: string
  URL: string
  CreationDate: string
  TerminationDate: string
  StartTermID: string
  EndTermID: string
  FinalEnrollmentDate: string
  BillingDate: string
  FiscalPeriodCodeID: string
  SiteID: string
  BuildingID: string
  RoomID: string
  ShowSiteOnly: string
  SectionTypeID: string
  PaymentGatewayAccountID: string
  IsDistanceLearning: string
  IsGradesEntered: string
  GradeScaleTypeID: string
  RecurrenceRule: string
}

const fieldNames: ISectionDetailsFieldNames = {
  SectionID: "SectionID",
  SectionNumber: "SectionNumber",
  Description: "Description",
  SectionStatusCodeID: "SectionStatusCodeID",
  URL: "URL",
  CreationDate: "CreationDate",
  TerminationDate: "TerminationDate",
  StartTermID: "StartTermID",
  EndTermID: "EndTermID",
  FinalEnrollmentDate: "FinalEnrollmentDate",
  BillingDate: "BillingDate",
  FiscalPeriodCodeID: "FiscalPeriodCodeID",
  SiteID: "SiteID",
  BuildingID: "BuildingID",
  RoomID: "RoomID",
  ShowSiteOnly: "ShowSiteOnly",
  SectionTypeID: "SectionTypeID",
  PaymentGatewayAccountID: "PaymentGatewayAccountID",
  IsDistanceLearning: "IsDistanceLearning",
  IsGradesEntered: "IsGradesEntered",
  GradeScaleTypeID: "GradeScaleTypeID",
  RecurrenceRule: "RecurrenceRule"
}

export function BasicInfoForm(props: IBasicInfoFormProps) {
  return (
    <>
      <Row>
        <Col xs={24} sm={24} md={12}>
          <FormInput
            maxLength={50}
            labelColSpan={8}
            wrapperColSpan={14}
            label={"Section Number"}
            ariaLabel={"Section Number"}
            formInstance={props.formInstance}
            fieldName={fieldNames.SectionNumber}
            rules={[
              {
                required: true,
                message: "Please enter Section Number"
              }
            ]}
          />

          <FormInput
            maxLength={1024}
            labelColSpan={8}
            wrapperColSpan={14}
            label={"URL"}
            ariaLabel={"URL"}
            formInstance={props.formInstance}
            fieldName={fieldNames.URL}
          />
        </Col>
        <Col xs={24} sm={24} md={12}>
          <FormTextArea
            maxLength={2000}
            labelColSpan={8}
            wrapperColSpan={14}
            label={"Description"}
            ariaLabel={"Description"}
            formInstance={props.formInstance}
            fieldName={fieldNames.Description}
          />
        </Col>
      </Row>
      <SectionTimingForm formInstance={props.formInstance} fieldNames={fieldNames} initialValue={props.initialValue} />
    </>
  )
}
