import React, { useEffect, useState } from "react"
import { Form, Card, Button, Input, Select, Checkbox, Row, Col, message } from "antd"
import { getGLAccountTypes } from "~/ApiServices/Service/RefLookupService"
import { IApiResponse } from "@packages/api/lib/utils/Interfaces"
import { eventBus } from "~/utils/EventBus"
import { ISimplifiedApiErrorMessage } from "@packages/api/lib/utils/HandleResponse/ProcessedApiError"
import { OldFormError } from "~/Component/Common/OldForm/OldFormError"
import { getSeatGroups } from "~/ApiServices/Service/SeatGroupService"
import { saveFinancial } from "~/ApiServices/Service/SectionService"
import {
  BUDGET_FINANCIAL_TYPE_MARKETING_PROGRAM,
  BUDGET_FINANCIAL_TYPE_FACULTY,
  UPDATE_SUCCESSFULLY
} from "~/utils/Constants"
import { REFRESH_SECTION_BUDGET_PAGE } from "~/TableSearchMeta/Section/SectionDetailsMeta"
import { FormMultipleRadio } from "~/Component/Common/Form/FormMultipleRadio"
import "~/Sass/utils.scss"
import { HelpButton } from "~/Component/Common/Form/Buttons/HelpButton"

interface IBudgetEditFormProps {
  financialType: string
  sectionId: number
  selectedSeatGroups: Array<any>
  initialFormValue: { [key: string]: any }
  handleCancel: () => void
  setApiCallInProgress: (flag: boolean) => void
  formInstance: any
  fieldNames: { [key: string]: any }
  helpKey?: string
}

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 14 }
}

export default function BudgetEditForm(props: IBudgetEditFormProps) {
  const [glAccountTypes, setGlAccountTypes] = useState<Array<any>>([])
  const [seatGroupItems, setSeatGroupItems] = useState<Array<any>>([])
  const [errorMessages, setErrorMessages] = useState<Array<ISimplifiedApiErrorMessage>>([])
  const seatGroupList: Array<any> = []
  const defaultValueList: Array<any> = []

  useEffect(() => {
    ;(async () => {
      const response = await getGLAccountTypes()
      if (response && response.success && response.data) {
        setGlAccountTypes(response.data)
      }
    })()
    ;(async () => {
      const response = await getSeatGroups({ SectionID: props.sectionId })
      if (response && response.success && response.data) {
        setSeatGroupItems(response.data)
      }
    })()
  }, [props])

  if (seatGroupItems.length > 0) {
    seatGroupItems.forEach((seatGroup) => {
      seatGroupList.push({
        label: seatGroup.Name,
        value: seatGroup.SeatGroupID
      })

      if (props.selectedSeatGroups) {
        props.selectedSeatGroups.forEach((sg) => {
          if (sg.SeatGroupID === seatGroup.SeatGroupID) {
            defaultValueList.push(sg.SeatGroupID)
            return
          }
        })
      }
    })
    props.formInstance.setFieldsValue({
      [props.fieldNames.SeatGroupIDs]: defaultValueList
    })
  }

  const onFormSubmission = async () => {
    await props.formInstance.validateFields()
    const params = props.formInstance.getFieldsValue()

    type serviceMethodType = (params: { [key: string]: any }) => Promise<IApiResponse>
    const serviceMethoToCall: serviceMethodType = saveFinancial

    props.setApiCallInProgress(true)
    setErrorMessages([])
    const response = await serviceMethoToCall(params)
    props.setApiCallInProgress(false)

    if (response && response.success) {
      message.success(UPDATE_SUCCESSFULLY)
      props.formInstance.resetFields()
      eventBus.publish(REFRESH_SECTION_BUDGET_PAGE)
      props.handleCancel()
    } else {
      setErrorMessages(response.error)
    }
  }

  return (
    <Card
      title={
        <Row justify="space-between">
          <Col>{`Edit ${props.financialType} Financial`}</Col>
          <Col>
            <HelpButton helpKey={props.helpKey} />
          </Col>
        </Row>
      }
      actions={[
        <Row justify="end" gutter={[8, 8]} style={{ marginRight: "10px" }}>
          <Col>
            <Button type="primary" danger onClick={props.handleCancel}>
              Cancel
            </Button>
          </Col>
          <Col>
            <Button type="primary" onClick={onFormSubmission}>
              Submit
            </Button>
          </Col>
        </Row>
      ]}
    >
      <Form
        form={props.formInstance}
        initialValues={props.initialFormValue}
        scrollToFirstError
        style={{
          maxHeight: "80vh",
          overflowY: "scroll"
        }}
      >
        <OldFormError errorMessages={errorMessages} />

        <Form.Item className="hidden" name={props.fieldNames.SectionID}>
          <Input aria-label="Section ID" value={props.sectionId} />
        </Form.Item>

        <Form.Item className="hidden" name={props.fieldNames.FinancialID}>
          <Input aria-label="Financial ID" />
        </Form.Item>

        <Form.Item label="Description" {...layout} name={props.fieldNames.Description}>
          <Input aria-label="Description" />
        </Form.Item>

        <Form.Item label="Basis" {...layout} name={props.fieldNames.FinancialBasisType}>
          <Input aria-label="Basis" disabled />
        </Form.Item>

        <Form.Item label="GL Accounts" {...layout} name={props.fieldNames.GLAccountID}>
          <Select aria-label="GL Accounts">
            {glAccountTypes.map((x) => {
              return <Select.Option key={x.ID + x.Name} value={x.ID}>{`${x.Name} (${x.Description})`}</Select.Option>
            })}
          </Select>
        </Form.Item>

        <Form.Item label="Amount" {...layout} name={props.fieldNames.ItemUnitAmount}>
          <Input aria-label="Amount" type="number" min={0} />
        </Form.Item>

        {props.financialType !== BUDGET_FINANCIAL_TYPE_FACULTY &&
          props.financialType !== BUDGET_FINANCIAL_TYPE_MARKETING_PROGRAM && (
            <Form.Item label="Deposit Amount" {...layout} name={props.fieldNames.InitialDepositAmount}>
              <Input aria-label="Deposit Amount" type="number" min={0} />
            </Form.Item>
          )}

        {props.financialType === BUDGET_FINANCIAL_TYPE_FACULTY && (
          <Form.Item label="Quantity" {...layout} name={props.fieldNames.ItemQty}>
            <Input aria-label="Quantity" type="number" min={0} />
          </Form.Item>
        )}

        <FormMultipleRadio
          labelColSpan={8}
          wrapperColSpan={14}
          formInstance={props.formInstance}
          label={"Optional"}
          ariaLabel={"Is Optional"}
          fieldName={props.fieldNames.IsOptional}
          options={[
            { label: "Yes", value: true },
            { label: "No", value: false }
          ]}
        />

        {seatGroupList && (
          <Form.Item label="Seat Groups" {...layout} name={props.fieldNames.SeatGroupIDs}>
            <Checkbox.Group options={seatGroupList} />
          </Form.Item>
        )}
      </Form>
    </Card>
  )
}
