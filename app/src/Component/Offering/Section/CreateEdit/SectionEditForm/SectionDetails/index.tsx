import React, { useState, useEffect } from "react"
import { Card, Button, Form, Input, Select, Switch } from "antd"
import {
  getSectionStatusCode,
  getFiscalPeriodCodes,
  getPaymentGatewayAccounts,
  getSectionTypes
} from "~/ApiServices/Service/RefLookupService"
import { updateSection } from "~/ApiServices/Service/SectionService"
import TextArea from "antd/lib/input/TextArea"
import SectionDetailsCreationTime from "~/Component/Offering/Section/CreateEdit/SectionEditForm/SectionDetails/SectionDetailsCreationTime"
import SectionDetailsTerminationTime from "~/Component/Offering/Section/CreateEdit/SectionEditForm/SectionDetails/SectionDetailsTerminationTime"
import SectionDetailsEnrollmentBillingDate from "~/Component/Offering/Section/CreateEdit/SectionEditForm/SectionDetails/SectionDetailsEnrollmentBillingDate"

interface ISectionEditProps {
  Section: { [key: string]: string }
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
  const [formInstance] = Form.useForm()
  const actions = []
  const [saveButtonLoading, setButtonLoading] = useState(false)
  const [buttonText, setButtonText] = useState("Save")

  actions.push(<Button onClick={props.handleCancel}>Cancel</Button>)
  actions.push(
    <Button
      loading={saveButtonLoading}
      onClick={() => {
        props.setApiCallInProgress(true)
        setButtonLoading(true)
        setButtonText("Saving ...")
        console.log(formInstance.getFieldsValue())
        updateSection(formInstance.getFieldsValue()).then((response) => {
          if (response.success) {
            props.setApiCallInProgress(false)
            setButtonLoading(false)
            setButtonText("Save")
          }
        })
      }}
    >
      {buttonText}
    </Button>
  )

  const [allSectionStatusCode, setAllSectionStatusCode] = useState<Array<any>>([])
  const [allFiscalPeriod, setAllFiscalPeriod] = useState<Array<any>>([])
  const [allGateways, setAllGateways] = useState<Array<any>>([])
  const [allSectionTypes, setAllSectionTypes] = useState<Array<any>>([])
  useEffect(() => {
    getSectionStatusCode().then((x) => {
      if (x.success) setAllSectionStatusCode(x.data)
    })
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
    Object.keys(props.Section).forEach((key) => {
      console.log(key, props.Section[key])
      formInstance.setFieldsValue({
        [key]: props.Section[key]
      })
    })
  }, [props.Section, formInstance])

  return (
    <Card actions={actions}>
      <Form
        form={formInstance}
        style={{ height: "65vh", overflowY: "scroll", padding: "10px", paddingBottom: "150px" }}
      >
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
        <SectionDetailsCreationTime formInstance={formInstance} fieldNames={fieldNames} />
        <SectionDetailsTerminationTime formInstance={formInstance} fieldNames={fieldNames} />
        <Form.Item name={fieldNames.IsDistanceLearning} label="Distance learning" valuePropName="checked" {...layout}>
          <Switch aria-label="Is Taxable" defaultChecked={formInstance.getFieldValue(fieldNames.IsDistanceLearning)} />
        </Form.Item>
        <SectionDetailsEnrollmentBillingDate formInstance={formInstance} fieldNames={fieldNames} />
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
      </Form>
    </Card>
  )
}
