import React, { useState, useEffect } from "react"
import { Form, Input, Select } from "antd"
import { getSectionStatusCode } from "~/ApiServices/Service/RefLookupService"
import TextArea from "antd/lib/input/TextArea"
import { FormInstance } from "antd/lib/form"

interface ISectionEditProps {
  Section: { [key: string]: string }
  formInstance: FormInstance
  handleCancel: () => void
  handleSubmit: (param: { [key: string]: any }) => void
  setApiCallInProgress: (flag: boolean) => void
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
  StartDate: string
  EndDate: string
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
  StartDate: "StartDate",
  EndDate: "EndDate",
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

const layout = { labelCol: { span: 6 } }

export default function SectionDetails(props: ISectionEditProps) {
  const [allSectionStatusCode, setAllSectionStatusCode] = useState<Array<any>>([])
  useEffect(() => {
    getSectionStatusCode().then((x) => {
      if (x.success) setAllSectionStatusCode(x.data)
    })
  }, [props.Section])

  return (
    <>
      <Form.Item name={fieldNames.SectionID} className="hidden">
        <Input />
      </Form.Item>
      <Form.Item name={fieldNames.SectionNumber} label="Section Number" {...layout}>
        <Input aria-label="Section Number" />
      </Form.Item>
      <Form.Item name={fieldNames.Description} label="Description" {...layout}>
        <TextArea aria-label="Description" />
      </Form.Item>
      <Form.Item name={fieldNames.SectionStatusCodeID} label="Status" {...layout}>
        <Select aria-label="Status">
          {allSectionStatusCode.map((x, i) => {
            return (
              <Select.Option key={i + x.StatusID} value={x.StatusID}>
                {x.Name}
              </Select.Option>
            )
          })}
        </Select>
      </Form.Item>
      <Form.Item name={fieldNames.URL} label="URL" {...layout}>
        <Input aria-label="URL" />
      </Form.Item>
    </>
  )
}
