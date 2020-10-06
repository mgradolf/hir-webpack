import React, { useEffect, useState } from "react"
import { Form, Card, Button, Input, Select, Switch } from "antd"
import { getGLAccountTypes, getDiscountAmountTypes } from "~/ApiServices/Service/RefLookupService"
import "~/Sass/utils.scss"
import { IApiResponse } from "@packages/api/lib/utils/Interfaces"
import { eventBus, REFRESH_SECTION_DISCOUNT_PAGE } from "~/utils/EventBus"
import { ISimplifiedApiErrorMessage } from "@packages/api/lib/utils/HandleResponse/ProcessedApiError"
import FormError from "~/Component/Common/FormError"
import { getSectionFinancials, saveSectionDiscount } from "~/ApiServices/Service/SectionService"

interface IDiscountEditFormProps {
  sectionId: number
  initialFormValue: { [key: string]: any }
  handleCancel: () => void
  setApiCallInProgress: (flag: boolean) => void
  formInstance: any
  fieldNames: { [key: string]: any }
}

const layout = {
  labelCol: { span: 6 }
}

export default function DiscountEditForm(props: IDiscountEditFormProps) {
  const [glAccountTypes, setGlAccountTypes] = useState<Array<any>>([])
  const [discountAmountTypes, setDiscountAmountTypes] = useState<Array<any>>([])
  const [sectionFinancialItems, setSectionFinancialItems] = useState<Array<any>>([])
  const [errorMessages, setErrorMessages] = useState<Array<ISimplifiedApiErrorMessage>>([])
  const [amountLabel, setAmountLabel] = useState<string>("Dollars")

  useEffect(() => {
    ;(async () => {
      const response = await getGLAccountTypes()
      if (response && response.success && response.data) {
        setGlAccountTypes(response.data)
      }
    })()
    ;(async () => {
      const response = await getDiscountAmountTypes()
      if (response && response.success && response.data) {
        setDiscountAmountTypes(response.data)
      }
    })()
    ;(async () => {
      const response = await getSectionFinancials({
        SectionID: props.sectionId,
        FinancialBasisTypeID: 1
      })
      if (response && response.success && response.data) {
        setSectionFinancialItems(response.data)
      }
    })()
  }, [props])

  const onFormSubmission = async () => {
    await props.formInstance.validateFields()
    const params = props.formInstance.getFieldsValue()

    console.log("Params: ", params)

    type serviceMethodType = (params: { [key: string]: any }) => Promise<IApiResponse>
    const serviceMethoToCall: serviceMethodType = saveSectionDiscount

    props.setApiCallInProgress(true)
    setErrorMessages([])
    const response = await serviceMethoToCall(params)
    props.setApiCallInProgress(false)

    if (response && response.success) {
      props.formInstance.resetFields()
      eventBus.publish(REFRESH_SECTION_DISCOUNT_PAGE)
      props.handleCancel()
    } else {
      setErrorMessages(response.error)
      console.log(response.error)
      console.log(errorMessages)
    }
  }

  const onChangeAmountType = (value: any) => {
    discountAmountTypes.forEach((key) => {
      if (key.ID === value) {
        if (key.Name.includes("dollars")) {
          setAmountLabel("Dollars")
        } else {
          setAmountLabel("Percentage")
        }
        return
      }
    })
  }

  const actions = []
  actions.push(<Button onClick={props.handleCancel}>Cancel</Button>)
  actions.push(<Button onClick={onFormSubmission}>Submit</Button>)

  return (
    <Card title={`Edit Discount Program`} actions={actions}>
      <Form
        form={props.formInstance}
        initialValues={props.initialFormValue}
        style={{ height: "65vh", overflowY: "scroll", padding: "10px" }}
      >
        <FormError errorMessages={errorMessages} />

        <Form.Item className="hidden" name={props.fieldNames.SectionID}>
          <Input aria-label="Section ID" value={props.sectionId} />
        </Form.Item>

        <Form.Item label="Short Name" {...layout} name={props.fieldNames.ShortName}>
          <Input aria-label="Short name" disabled />
        </Form.Item>

        <Form.Item label="Amount Type" {...layout} name={props.fieldNames.AmountTypeID}>
          <Select aria-label="Amount Type" onChange={onChangeAmountType}>
            {discountAmountTypes.map((x) => {
              return (
                <Select.Option key={x.ID} value={x.ID}>
                  {x.Name}
                </Select.Option>
              )
            })}
          </Select>
        </Form.Item>

        <Form.Item label={amountLabel} {...layout} name={props.fieldNames.Amount}>
          <Input aria-label="Amount" type="number" min={0} />
        </Form.Item>

        <Form.Item label="GL Accounts" {...layout} name={props.fieldNames.GLAccountID}>
          <Select aria-label="GL Accounts">
            {glAccountTypes.map((x) => {
              return <Select.Option key={x.ID + x.Name} value={x.ID}>{`${x.Name} (${x.Description})`}</Select.Option>
            })}
          </Select>
        </Form.Item>

        <Form.Item label="Apply Financial" {...layout} name={props.fieldNames.SectionFinancialID}>
          <Select aria-label="Apply Financial">
            {sectionFinancialItems.map((x) => {
              return (
                <Select.Option key={x.SectionFinancialID} value={x.SectionFinancialID}>
                  {x.Description}
                </Select.Option>
              )
            })}
          </Select>
        </Form.Item>

        <Form.Item name={props.fieldNames.IsActive} label="Is Active" {...layout} valuePropName="checked">
          <Switch aria-label="Is Active" defaultChecked={props.formInstance.getFieldValue(props.fieldNames.IsActive)} />
        </Form.Item>

        <Form.Item
          name={props.fieldNames.IsPromotedForMarketing}
          label="Is Promoted For Marketing"
          {...layout}
          valuePropName="checked"
        >
          <Switch
            aria-label="Is Promoted For Marketing"
            defaultChecked={props.formInstance.getFieldValue(props.fieldNames.IsPromotedForMarketing)}
          />
        </Form.Item>
      </Form>
    </Card>
  )
}
