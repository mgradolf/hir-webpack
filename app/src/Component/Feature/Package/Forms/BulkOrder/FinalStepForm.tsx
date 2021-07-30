import React from "react"
import { Divider, Row, Col, Table, InputNumber } from "antd"
import { FormInstance } from "antd/lib/form"
import { FormDatePicker } from "~/Component/Common/Form/FormDatePicker"
import { FormInput } from "~/Component/Common/Form/FormInput"
import { FormDropDown } from "~/Component/Common/Form/FormDropDown"
import "~/Sass/utils.scss"
import { findPersonsByAccount } from "~/ApiServices/Service/PersonService"
import { FormInputNumber } from "~/Component/Common/Form/FormInputNumber"
import { FormNumberInput } from "~/Component/Common/Form/FormNumberInput"

interface IFinalStepFormProps {
  formInstance: FormInstance
  initialValue: { [key: string]: any }
}

const layout = {
  labelColSpan: 8,
  wrapperColSpan: 14
}

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
    dataIndex: "ItemUnitAmount",
    render: (value: any) => (
      <InputNumber
        max={999999}
        formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
        parser={(value) => (value !== undefined ? value.replace(/\$\s?|(,*)/g, "") : "")}
        disabled={true}
        defaultValue={value}
      />
    )
  }
]

export default function FinalStepForm(props: IFinalStepFormProps) {
  const affiliateFinancials = props.formInstance.getFieldValue("AffiliateFinancials")
  const studentFinancials = props.formInstance.getFieldValue("StudentFinancials")

  const isEnableSeatAffiliate = props.formInstance.getFieldValue("IsEnableSeatAffiliate")
  const isEnableSeatStudent = props.formInstance.getFieldValue("IsEnableSeatStudent")
  const isGenerateOrder = props.formInstance.getFieldValue("IsGenerateOrder")

  return (
    <>
      <Row>
        <Divider orientation="left">Summary</Divider>
        <Col xs={24} sm={24} md={12}>
          <FormInput
            disabled
            {...layout}
            formInstance={props.formInstance}
            label={"Package"}
            ariaLabel={"Package Name"}
            fieldName="Name"
          />
          <FormInput
            disabled
            {...layout}
            formInstance={props.formInstance}
            label={"Section"}
            ariaLabel={"Section"}
            fieldName={"SectionNumber"}
          />
          <FormInput
            disabled
            {...layout}
            formInstance={props.formInstance}
            label={"Invitation Code"}
            ariaLabel={"Invitation Code"}
            fieldName={"InvitationCode"}
          />
          {isGenerateOrder && (
            <FormDropDown
              disabled
              {...layout}
              formInstance={props.formInstance}
              label={"Purchaser"}
              ariaLabel={"Purchaser"}
              fieldName="PurchaserID"
              refLookupService={() => findPersonsByAccount({ AccountID: props.initialValue.AccountID })}
              displayKey="FormattedName"
              valueKey="PersonID"
            />
          )}
          {isGenerateOrder && (
            <FormDatePicker
              disabled
              {...layout}
              label={"Due Date"}
              formInstance={props.formInstance}
              aria-label="Due Date"
              placeholder="YYYY/MM/DD"
              fieldName="PaymentDueDate"
              defaultValue={props.formInstance.getFieldValue("PaymentDueDate")}
            />
          )}
        </Col>
        <Col xs={24} sm={24} md={12}>
          <FormNumberInput
            disabled
            {...layout}
            formInstance={props.formInstance}
            label={"Requested Seat"}
            ariaLabel={"Requested Seat"}
            fieldName={"NumberOfSeats"}
          />
          <FormNumberInput
            disabled
            {...layout}
            formInstance={props.formInstance}
            label={"Credit Unit"}
            ariaLabel={"Credit Unit"}
            fieldName={"AllowedCredit"}
          />
          {isGenerateOrder && (
            <FormNumberInput
              disabled
              {...layout}
              formInstance={props.formInstance}
              label={"PO Number"}
              ariaLabel={"PO Number"}
              fieldName={"PONumber"}
            />
          )}
          {isGenerateOrder && (
            <FormInputNumber
              disabled
              {...layout}
              formInstance={props.formInstance}
              label={"Amount"}
              ariaLabel={"Amount"}
              fieldName={"POAmount"}
            />
          )}
        </Col>

        {(isEnableSeatAffiliate || isEnableSeatStudent) && <Divider orientation="left">Pricing</Divider>}
        {isEnableSeatAffiliate && (
          <Col xs={24} sm={24} md={!isEnableSeatStudent ? 24 : { span: 11, offset: 1 }}>
            <Table
              rowKey="ID"
              title={() => "Cost per seat for Affiliate"}
              bordered
              dataSource={affiliateFinancials}
              pagination={false}
              columns={columns}
            />
          </Col>
        )}
        {isEnableSeatStudent && (
          <Col xs={24} sm={24} md={!isEnableSeatAffiliate ? 24 : { span: 11, offset: 1 }}>
            <Table
              rowKey="ID"
              title={() => "Cost per seat for Student"}
              bordered
              dataSource={studentFinancials}
              pagination={false}
              columns={columns}
            />
          </Col>
        )}
      </Row>
    </>
  )
}
