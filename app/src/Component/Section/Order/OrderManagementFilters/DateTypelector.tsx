import React, { useEffect, useState } from "react"
import { IFilterFieldComponent, IFilterGenericComponentProps } from "~/Component/Common/SearchFilters/common"
import { Row, Select, Col, Form, DatePicker } from "antd"
import { IDeviceView, useDeviceViews } from "~/Hooks/useDeviceViews"
import { DATE_FORMAT } from "~/utils/Constants"

export interface IParamsToBeDispatched {
  NameToDisplay: string
  Params: { [key: string]: string }
}

interface IWaitlistSearchCustomLookupFilter extends IFilterGenericComponentProps<IFilterFieldComponent> {
  key?: any
}

const ORDER_MANAGEMENT_PERSON_DATE_TYPES = {
  CREATED_DATE: {
    name: "Order Date",
    key1: "CreateDateFrom",
    key2: "CreateDateTo"
  },
  PAYMENT_DUE_DATE: {
    name: "Due Date",
    key1: "PaymentDueDateFrom",
    key2: "PaymentDueDateTo"
  }
}
export default function DateTypeSelector(props: IWaitlistSearchCustomLookupFilter) {
  const [selectedKey, setSelectedKey] = useState(ORDER_MANAGEMENT_PERSON_DATE_TYPES.CREATED_DATE.key1)
  const [selectedKey2, setSelectedKey2] = useState(ORDER_MANAGEMENT_PERSON_DATE_TYPES.CREATED_DATE.key2)
  const [seletectLookupType, setSeletectLookupType] = useState(ORDER_MANAGEMENT_PERSON_DATE_TYPES.CREATED_DATE.name)
  const [mobileView, setMobileView] = useState(false)
  useDeviceViews((deviceViews: IDeviceView) => {
    setMobileView(deviceViews.mobile)
  })

  useEffect(() => {
    switch (seletectLookupType) {
      case ORDER_MANAGEMENT_PERSON_DATE_TYPES.CREATED_DATE.name:
        setSelectedKey(ORDER_MANAGEMENT_PERSON_DATE_TYPES.CREATED_DATE.key1)
        setSelectedKey2(ORDER_MANAGEMENT_PERSON_DATE_TYPES.CREATED_DATE.key2)
        break
      case ORDER_MANAGEMENT_PERSON_DATE_TYPES.PAYMENT_DUE_DATE.name:
        setSelectedKey(ORDER_MANAGEMENT_PERSON_DATE_TYPES.PAYMENT_DUE_DATE.key1)
        setSelectedKey2(ORDER_MANAGEMENT_PERSON_DATE_TYPES.PAYMENT_DUE_DATE.key2)
        break
    }
  }, [seletectLookupType])

  return props.isChecked ? (
    <Row>
      {/* <LabelCol>
        <Checkbox checked={props.show} onChange={props.toggleCheckboxHandler}>
          {props.label}
        </Checkbox>
      </LabelCol>
      <InputCol className={props.show ? styles.offeringFilterField : "hidden"}>
        <Input
          aria-label={props.ariaLabel}
          name={props.fieldName}
          type={props.inputType.toLowerCase()}
          defaultValue={props.defaultValue}
          value={props.value === "*" ? "" : props.value}
          onChange={(e) => props.filterValueChanged(props.fieldName, e.target.value)}
        />
      </InputCol> */}
    </Row>
  ) : (
    <Form.Item>
      <Row key={props.key}>
        <Col span={4} offset={2} {...(mobileView && { xs: { span: 8, offset: 0 } })}>
          <Select
            style={{ width: "100%" }}
            defaultValue={ORDER_MANAGEMENT_PERSON_DATE_TYPES.CREATED_DATE.name}
            onChange={(value: string) => {
              props.filterValueChanged({
                CreateDateFrom: "",
                CreateDateTo: "",
                PaymentDueDateFrom: "",
                PaymentDueDateTo: ""
              })
              setSeletectLookupType(value)
            }}
          >
            <Select.Option key="0" value={ORDER_MANAGEMENT_PERSON_DATE_TYPES.CREATED_DATE.name}>
              {ORDER_MANAGEMENT_PERSON_DATE_TYPES.CREATED_DATE.name}
            </Select.Option>
            <Select.Option key="2" value={ORDER_MANAGEMENT_PERSON_DATE_TYPES.PAYMENT_DUE_DATE.name}>
              {ORDER_MANAGEMENT_PERSON_DATE_TYPES.PAYMENT_DUE_DATE.name}
            </Select.Option>
          </Select>
        </Col>
        <Col span={4} xs={8}>
          <DatePicker.RangePicker
            style={{ width: "100%" }}
            allowEmpty={[true, true]}
            aria-label={""}
            allowClear
            onChange={(momentValues: any, values: any): void => {
              props.filterValueChanged({ [selectedKey]: values[0], [selectedKey2]: values[1] })
            }}
            format={DATE_FORMAT}
          />
        </Col>
      </Row>
    </Form.Item>
  )
}
