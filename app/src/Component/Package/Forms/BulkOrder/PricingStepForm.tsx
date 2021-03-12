import React, { useEffect, useState } from "react"
import { Divider, Row, Col, Table, Input } from "antd"
import { FormInstance } from "antd/lib/form"
import { getSectionFinancials } from "~/ApiServices/BizApi/query/queryIf"

import "~/Sass/utils.scss"

interface IPricingStepFormProps {
  formInstance: FormInstance
  initialValue: { [key: string]: any }
}

export default function PricingStepForm(props: IPricingStepFormProps) {
  const isEnableSeatAffiliate = props.formInstance.getFieldValue("IsEnableSeatAffiliate")
  const isEnableSeatStudent = props.formInstance.getFieldValue("IsEnableSeatStudent")
  const SectionID = props.formInstance.getFieldValue("SectionID")

  const affiliateFinancials = props.formInstance.getFieldValue("AffiliateFinancials")
  const studentFinancials = props.formInstance.getFieldValue("StudentFinancials")
  const [loading, setLoading] = useState<boolean>(false)
  const [affiliateFinancial] = useState<Array<any>>(affiliateFinancials !== undefined ? affiliateFinancials : [])
  const [studentFinancial] = useState<Array<any>>(studentFinancials !== undefined ? studentFinancials : [])

  const columns = [
    {
      title: "GL Account",
      dataIndex: "GLName"
    },
    {
      title: "Description",
      dataIndex: "Description"
    },
    {
      title: "Revenue Amount",
      width: 150,
      render: (record: any) => {
        return (
          <Input
            type="number"
            style={{ width: "150px", textAlign: "right" }}
            onChange={(event) => onAmountHandler(record, event)}
            defaultValue={record.ItemUnitAmount}
          />
        )
      }
    }
  ]

  const onAmountHandler = (record: any, event: any) => {
    debugger
    const itemUnitAmount = parseFloat(event.target.value).toFixed(2)
    const ID = record.ID

    affiliateFinancial.forEach((object: any) => {
      if (object.ID === ID) {
        object.ItemUnitAmount = itemUnitAmount
        return
      }
    })
    studentFinancial.forEach((object: any) => {
      if (object.ID === ID) {
        object.ItemUnitAmount = itemUnitAmount
        return
      }
    })
  }

  useEffect(() => {
    ;(async () => {
      if (!isEnableSeatAffiliate) {
        props.formInstance.setFieldsValue({ AffiliateFinancials: [] })
      }
      if (!isEnableSeatStudent) {
        props.formInstance.setFieldsValue({ StudentFinancials: [] })
      }

      if (affiliateFinancial.length === 0 && studentFinancial.length === 0) {
        setLoading(true)
        const response = await getSectionFinancials({ SectionID: SectionID, IsDefault: true })
        if (response && response.success && response.data) {
          let index = 1
          response.data.forEach((object: any) => {
            affiliateFinancial.push({
              ID: index++,
              GLName: object.GLName,
              GLAccountID: object.GLAccountID,
              Description: object.Description,
              SectionFinancialID: object.SectionFinancialID,
              ItemUnitAmount: parseFloat(object.ItemUnitAmount).toFixed(2)
            })
            studentFinancial.push({
              ID: index++,
              GLName: object.GLName,
              GLAccountID: object.GLAccountID,
              Description: object.Description,
              SectionFinancialID: object.SectionFinancialID,
              ItemUnitAmount: parseFloat(object.ItemUnitAmount).toFixed(2)
            })
            props.formInstance.setFieldsValue({
              AffiliateFinancials: affiliateFinancial,
              StudentFinancials: studentFinancial
            })
          })
        }
        setLoading(false)
      }
    })()
    // eslint-disable-next-line
  }, [studentFinancial, affiliateFinancial])

  return (
    <>
      <Row>
        <Divider orientation="left">Pricing</Divider>
        {isEnableSeatAffiliate && affiliateFinancial.length > 0 && (
          <Col xs={24} sm={24} md={23} style={{ marginTop: "10px" }}>
            <Table
              loading={loading}
              title={() => "Cost per seat for Affiliate"}
              rowKey="ID"
              bordered
              dataSource={affiliateFinancial}
              pagination={false}
              columns={columns}
            />
          </Col>
        )}
        {isEnableSeatStudent && studentFinancial.length > 0 && (
          <Col xs={24} sm={24} md={23} style={{ marginTop: "10px" }}>
            <Table
              loading={loading}
              title={() => "Cost per seat for Student"}
              rowKey="ID"
              bordered
              dataSource={studentFinancial}
              pagination={false}
              columns={columns}
            />
          </Col>
        )}
      </Row>
    </>
  )
}
