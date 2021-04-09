import React, { useEffect, useState } from "react"
import { Col, Row, Select } from "antd"
import Form, { FormInstance } from "antd/lib/form"
import { getFiscalPeriodCodes, getSectionTypes } from "~/ApiServices/Service/RefLookupService"
import { FormDateTimePicker } from "~/Component/Common/Form/FormDateTimePicker"
import { ISectionDetailsFieldNames } from "~/Component/Feature/Section/Forms/SectionBasicInfoForm"
import { FormMultipleRadio } from "~/Component/Common/Form/FormMultipleRadio"
import "~/Sass/utils.scss"

interface ISectionCharacteristicFormProps {
  formInstance: FormInstance
  fieldNames: ISectionDetailsFieldNames
  initialValue: { [key: string]: any }
}

export default function SectionCharacteristicForm(props: ISectionCharacteristicFormProps) {
  const [allFiscalPeriod, setAllFiscalPeriod] = useState<Array<any>>([])
  const [allSectionTypes, setAllSectionTypes] = useState<Array<any>>([])
  useEffect(() => {
    getFiscalPeriodCodes().then((x) => {
      if (x.success) {
        let fiscalPeriods = x.data as Array<any>
        fiscalPeriods = fiscalPeriods.filter((y) => y.IsActive)
        setAllFiscalPeriod(fiscalPeriods)
      }
    })
    getSectionTypes().then((x) => {
      if (x.success) setAllSectionTypes(x.data)
    })
  }, [])

  return (
    <>
      <Row>
        <Col xs={24} sm={24} md={12}>
          <FormDateTimePicker
            labelColSpan={8}
            wrapperColSpan={14}
            label={"Final Enrollment Date"}
            ariaLabel={"Final Enrollment Date"}
            formInstance={props.formInstance}
            defaultValue={props.initialValue.FinalEnrollmentDate}
            fieldName={props.fieldNames.FinalEnrollmentDate}
          />

          <FormMultipleRadio
            labelColSpan={8}
            wrapperColSpan={14}
            formInstance={props.formInstance}
            label={"Distance Learning"}
            ariaLabel={"Is DIstance Learning"}
            fieldName={props.fieldNames.IsDistanceLearning}
            options={[
              { label: "Yes", value: true },
              { label: "No", value: false }
            ]}
          />

          <Form.Item
            label="Other Section types"
            name={props.fieldNames.SectionTypeID}
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 14 }}
          >
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
        </Col>
        <Col xs={24} sm={24} md={12}>
          <FormDateTimePicker
            labelColSpan={8}
            wrapperColSpan={14}
            label={"Billing Date"}
            ariaLabel={"Billing Date"}
            formInstance={props.formInstance}
            defaultValue={props.initialValue.BillingDate}
            fieldName={props.fieldNames.BillingDate}
          />

          <Form.Item
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 14 }}
            label={"Fiscal Period"}
            name={props.fieldNames.FiscalPeriodCodeID}
          >
            <Select aria-label={"Select fiscal period"}>
              {allFiscalPeriod.length &&
                allFiscalPeriod.map((fiscal) => {
                  return (
                    <Select.Option key={fiscal.ID} value={fiscal.ID}>
                      {fiscal.Name}
                    </Select.Option>
                  )
                })}
            </Select>
          </Form.Item>
        </Col>
      </Row>
    </>
  )
}
