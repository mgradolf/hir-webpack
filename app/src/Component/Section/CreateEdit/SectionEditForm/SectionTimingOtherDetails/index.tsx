import React, { useState, useEffect } from "react"
import { Form, Select, Switch } from "antd"
import {
  getFiscalPeriodCodes,
  getPaymentGatewayAccounts,
  getSectionTypes
} from "~/ApiServices/Service/RefLookupService"
import SectionDetailsCreationTime from "~/Component/Section/CreateEdit/SectionEditForm/SectionTimingOtherDetails/SectionDetailsCreationTime"
import SectionDetailsTerminationTime from "~/Component/Section/CreateEdit/SectionEditForm/SectionTimingOtherDetails/SectionDetailsTerminationTime"
import SectionDetailsEnrollmentBillingDate from "~/Component/Section/CreateEdit/SectionEditForm/SectionTimingOtherDetails/SectionDetailsEnrollmentBillingDate"
import { FormInstance } from "antd/lib/form"
import { FormRoomLookupButton } from "~/Component/Common/OldForm/OldFormLookups/FormRoomLookup"

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
  const [allFiscalPeriod, setAllFiscalPeriod] = useState<Array<any>>([])
  const [allGateways, setAllGateways] = useState<Array<any>>([])
  const [allSectionTypes, setAllSectionTypes] = useState<Array<any>>([])
  useEffect(() => {
    getFiscalPeriodCodes().then((x) => {
      if (x.success) {
        let fiscalPeriods = x.data as Array<any>
        fiscalPeriods = fiscalPeriods.filter((y) => y.IsActive)
        setAllFiscalPeriod(fiscalPeriods)
      }
    })
    getPaymentGatewayAccounts().then((x) => {
      if (x.success) {
        let paymentGateways = x.data as Array<any>
        paymentGateways = paymentGateways.filter((y) => y.IsActive)
        setAllGateways(paymentGateways)
      }
    })
    getSectionTypes().then((x) => {
      if (x.success) setAllSectionTypes(x.data)
    })
  }, [props.Section])

  return (
    <>
      <SectionDetailsCreationTime formInstance={props.formInstance} fieldNames={fieldNames} />
      <SectionDetailsTerminationTime formInstance={props.formInstance} fieldNames={fieldNames} />
      <Form.Item name={fieldNames.IsDistanceLearning} label="Distance learning" valuePropName="checked" {...layout}>
        <Switch
          aria-label="Is Taxable"
          defaultChecked={props.formInstance.getFieldValue(fieldNames.IsDistanceLearning)}
        />
      </Form.Item>
      <SectionDetailsEnrollmentBillingDate formInstance={props.formInstance} fieldNames={fieldNames} />
      <Form.Item name={fieldNames.FiscalPeriodCodeID} label="Fiscal Period" {...layout}>
        <Select aria-label="Fiscal Period">
          {allFiscalPeriod.map((x, i) => {
            return (
              <Select.Option key={i + x.Name + x.ID} value={x.ID}>
                {x.Name}
              </Select.Option>
            )
          })}
        </Select>
      </Form.Item>
      <Form.Item name={fieldNames.PaymentGatewayAccountID} label="Selected Gateway" {...layout}>
        <Select aria-label="Selected Gateway">
          {allGateways.map((x, i) => {
            return (
              <Select.Option key={i + x.ID + x.Name} value={x.ID}>
                {x.Name}
              </Select.Option>
            )
          })}
        </Select>
      </Form.Item>
      <Form.Item label="Other Section types" name={fieldNames.SectionTypeID} {...layout}>
        <Select placeholder="Select an Section type" aria-label="Section Type Select">
          {allSectionTypes.length &&
            allSectionTypes.map((section, i) => {
              return (
                <Select.Option key={i + section.SectionTypeID} value={section.SectionTypeID}>
                  {section.SectionTypeName}
                </Select.Option>
              )
            })}
        </Select>
      </Form.Item>
      <FormRoomLookupButton formInstance={props.formInstance} />
    </>
  )
}
