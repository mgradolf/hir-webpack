import React, { useEffect, useState } from "react"
import { Form, Card, Button, Input, Select, Checkbox, Switch } from "antd"
import { getGLAccountTypes } from "~/ApiServices/Service/RefLookupService"
import "~/Sass/utils.scss"
import { IApiResponse } from "@packages/api/lib/utils/Interfaces"
import { eventBus, REFRESH_SECTION_BUDGET_PAGE } from "~/utils/EventBus"
import { ISimplifiedApiErrorMessage } from "@packages/api/lib/utils/HandleResponse/ProcessedApiError"
import FormError from "~/Component/Common/FormError"
import { getSeatGroups } from "~/ApiServices/Service/SeatGroupService"
import { saveFinancial } from "~/ApiServices/Service/SectionService"

interface IBudgetEditFormProps {
  financialType: string
  sectionId: number
  selectedSeatGroups: Array<any>
  initialFormValue: { [key: string]: any }
  handleCancel: () => void
  setApiCallInProgress: (flag: boolean) => void
  formInstance: any
  fieldNames: { [key: string]: any }
}

const layout = {
  labelCol: { span: 6 }
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
      const response = await getSeatGroups(props.sectionId)
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
      props.selectedSeatGroups.forEach((sg) => {
        if (sg.SeatGroupID === seatGroup.SeatGroupID) {
          defaultValueList.push(sg.SeatGroupID)
          return
        }
      })
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
      props.formInstance.resetFields()
      eventBus.publish(REFRESH_SECTION_BUDGET_PAGE)
      props.handleCancel()
    } else {
      setErrorMessages(response.error)
    }
  }

  const actions = []
  actions.push(<Button onClick={props.handleCancel}>Cancel</Button>)
  actions.push(<Button onClick={onFormSubmission}>Submit</Button>)

  return (
    <Card title={`Edit ${props.financialType} Financial`} actions={actions}>
      <Form
        form={props.formInstance}
        initialValues={props.initialFormValue}
        style={{ height: "65vh", overflowY: "scroll", padding: "10px" }}
      >
        <FormError errorMessages={errorMessages} />

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

        {props.financialType !== "Faculty" && props.financialType !== "Marketing Program" && (
          <Form.Item label="Deposit Amount" {...layout} name={props.fieldNames.InitialDepositAmount}>
            <Input aria-label="Deposit Amount" type="number" min={0} />
          </Form.Item>
        )}

        {props.financialType === "Faculty" && (
          <Form.Item label="Quantity" {...layout} name={props.fieldNames.ItemQty}>
            <Input aria-label="Quantity" type="number" min={0} />
          </Form.Item>
        )}

        <Form.Item name={props.fieldNames.IsOptional} label="Optional" {...layout} valuePropName="checked">
          <Switch
            aria-label="Optional"
            defaultChecked={props.formInstance.getFieldValue(props.fieldNames.IsOptional)}
          />
        </Form.Item>

        {seatGroupList && (
          <Form.Item label="Seat Groups" {...layout} name={props.fieldNames.SeatGroupIDs}>
            <Checkbox.Group options={seatGroupList} />
          </Form.Item>
        )}
      </Form>
    </Card>
  )
}
