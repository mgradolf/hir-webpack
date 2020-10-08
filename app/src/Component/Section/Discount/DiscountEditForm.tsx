import React, { useEffect, useState } from "react"
import { Form, Card, Button, Input, Select, Switch, DatePicker } from "antd"
import { getGLAccountTypes, getDiscountAmountTypes } from "~/ApiServices/Service/RefLookupService"
import "~/Sass/utils.scss"
import { IApiResponse } from "@packages/api/lib/utils/Interfaces"
import { eventBus, REFRESH_SECTION_DISCOUNT_PAGE } from "~/utils/EventBus"
import { ISimplifiedApiErrorMessage } from "@packages/api/lib/utils/HandleResponse/ProcessedApiError"
import FormError from "~/Component/Common/FormError"
import { getSectionFinancials, saveSectionDiscount } from "~/ApiServices/Service/SectionService"
import {
  FINANCIAL_BASIS_PER_ENROLLMENT_TYPE_ID,
  DISCOUNT_AGE_RANGE_TYPE_ID,
  DISCOUNT_APPLY_TO_ALL_TYPE_ID,
  DISCOUNT_DATE_RANGE_TYPE_ID,
  DISCOUNT_MANUALLY_APPLIED_TO_ENROLLMENT_TYPE_ID,
  DISCOUNT_PROMOTIONAL_CODE_TYPE_ID,
  DISCOUNT_VOLUME_TYPE_ID,
  DISCOUNT_DOLLAR_AMOUNT_TYPE_ID,
  DISCOUNT_DOLLATE_AMOUNT_TYPE_LABEL,
  DISCOUNT_PERCENTAGE_AMOUNT_TYPE_LABEL
} from "~/utils/Constants"
import moment from "moment"

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
  const discountTypeID = props.formInstance.getFieldValue(props.fieldNames.DiscountTypeID)
  const showDiscountAmount =
    discountTypeID === DISCOUNT_APPLY_TO_ALL_TYPE_ID ||
    discountTypeID === DISCOUNT_VOLUME_TYPE_ID ||
    discountTypeID === DISCOUNT_MANUALLY_APPLIED_TO_ENROLLMENT_TYPE_ID

  const amountTypeID = props.formInstance.getFieldValue(props.fieldNames.AmountTypeID)
  const discountAmountLabel =
    amountTypeID === DISCOUNT_DOLLAR_AMOUNT_TYPE_ID
      ? DISCOUNT_DOLLATE_AMOUNT_TYPE_LABEL
      : DISCOUNT_PERCENTAGE_AMOUNT_TYPE_LABEL

  const fromDate = props.formInstance.getFieldValue(props.fieldNames.FromDate)
  const toDate = props.formInstance.getFieldValue(props.fieldNames.ToDate)

  const [glAccountTypes, setGlAccountTypes] = useState<Array<any>>([])
  const [discountAmountTypes, setDiscountAmountTypes] = useState<Array<any>>([])
  const [sectionFinancialItems, setSectionFinancialItems] = useState<Array<any>>([])
  const [errorMessages, setErrorMessages] = useState<Array<ISimplifiedApiErrorMessage>>([])
  const [amountLabel, setAmountLabel] = useState<string>(discountAmountLabel)

  useEffect(() => {
    ; (async () => {
      const response = await getGLAccountTypes()
      if (response && response.success && response.data) {
        setGlAccountTypes(response.data)
      }
    })()
      ; (async () => {
        const response = await getDiscountAmountTypes()
        if (response && response.success && response.data) {
          setDiscountAmountTypes(response.data)
        }
      })()
      ; (async () => {
        const response = await getSectionFinancials({
          SectionID: props.sectionId,
          FinancialBasisTypeID: FINANCIAL_BASIS_PER_ENROLLMENT_TYPE_ID
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
        if (key.ID === DISCOUNT_DOLLAR_AMOUNT_TYPE_ID) {
          setAmountLabel(DISCOUNT_DOLLATE_AMOUNT_TYPE_LABEL)
        } else {
          setAmountLabel(DISCOUNT_PERCENTAGE_AMOUNT_TYPE_LABEL)
        }
        return
      }
    })
  }

  const onFromDateChange = (value: any, dateString: string) => {
    props.formInstance.setFieldsValue({ [props.fieldNames.FromDate]: dateString })
  }

  const onToDateChange = (value: any, dateString: string) => {
    props.formInstance.setFieldsValue({ [props.fieldNames.ToDate]: dateString })
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

        <Form.Item className="hidden" name={props.fieldNames.DiscountTypeID}>
          <Input aria-label="Discount Type ID" />
        </Form.Item>

        <Form.Item className="hidden" name={props.fieldNames.DiscountProgramID}>
          <Input aria-label="Discount Program ID" />
        </Form.Item>

        {discountTypeID === DISCOUNT_VOLUME_TYPE_ID && (
          <Form.Item className="hidden" name={props.fieldNames.DiscountVolume}>
            <Input aria-label="Discount Volume" />
          </Form.Item>
        )}

        {discountTypeID === DISCOUNT_VOLUME_TYPE_ID && (
          <Form.Item className="hidden" name={props.fieldNames.DiscountVolumeMultiply}>
            <Input aria-label="Discount Volume Multiply" />
          </Form.Item>
        )}

        <Form.Item label="Short Name" {...layout} name={props.fieldNames.ShortName}>
          <Input aria-label="Short name" disabled />
        </Form.Item>

        <Form.Item label="Amount Type" {...layout} name={props.fieldNames.AmountTypeID}>
          <Select aria-label="Amount Type" disabled={showDiscountAmount} onChange={onChangeAmountType}>
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

        <Form.Item label="Discount Type" {...layout}>
          <Input
            aria-label="Discount Type"
            disabled
            value={props.formInstance.getFieldValue(props.fieldNames.DiscountType)}
          />
        </Form.Item>

        {discountTypeID === DISCOUNT_AGE_RANGE_TYPE_ID && (
          <Form.Item label="From Age (year)" {...layout} name={props.fieldNames.FromAge}>
            <Input aria-label="From age" type="number" />
          </Form.Item>
        )}
        {discountTypeID === DISCOUNT_AGE_RANGE_TYPE_ID && (
          <Form.Item label="To Age (year)" {...layout} name={props.fieldNames.ToAge}>
            <Input aria-label="To age" type="number" />
          </Form.Item>
        )}

        {discountTypeID === DISCOUNT_PROMOTIONAL_CODE_TYPE_ID && (
          <Form.Item label="Promotional Code" {...layout} name={props.fieldNames.promoCode}>
            <Input aria-label="Promotional Code" />
          </Form.Item>
        )}

        {discountTypeID === DISCOUNT_DATE_RANGE_TYPE_ID && (
          <Form.Item className="hidden" name={props.fieldNames.FromDate}>
            <Input aria-label="From date" />
          </Form.Item>
        )}

        {discountTypeID === DISCOUNT_DATE_RANGE_TYPE_ID && (
          <Form.Item label="Effective Date From" {...layout}>
            <DatePicker
              aria-label="Pick Effective From Date"
              placeholder="YYYY-MM-DD hh:mm"
              format="YYYY-MM-DD hh:mm"
              onChange={onFromDateChange}
              defaultValue={fromDate ? moment(fromDate, "YYYY-MM-DD hh:mm") : undefined}
            />
          </Form.Item>
        )}

        {discountTypeID === DISCOUNT_DATE_RANGE_TYPE_ID && (
          <Form.Item className="hidden" name={props.fieldNames.ToDate}>
            <Input aria-label="To date" />
          </Form.Item>
        )}

        {discountTypeID === DISCOUNT_DATE_RANGE_TYPE_ID && (
          <Form.Item label="Effective Date To" {...layout}>
            <DatePicker
              aria-label="Pick Effective To Date"
              placeholder="YYYY-MM-DD hh:mm"
              format="YYYY-MM-DD hh:mm"
              onChange={onToDateChange}
              defaultValue={toDate ? moment(toDate, "YYYY-MM-DD hh:mm") : undefined}
            />
          </Form.Item>
        )}

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
