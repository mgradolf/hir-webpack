import React, { useState } from "react"
import { Col, Row, Select } from "antd"
import { IGeneratedField, SearchFieldWrapper } from "~/Component/Common/Form/common"
import { FormMultipleRadio } from "~/Component/Common/Form/FormMultipleRadio"
import { FormInput } from "~/Component/Common/Form/FormInput"
import { FormDatePicker } from "~/Component/Common/Form/FormDatePicker"

const PaymentPolicyTypeOptions = [
  { label: "Class Start Date", value: 1 },
  { label: "Class End Date", value: 2 },
  { label: "Order Date", value: 3 },
  { label: "Fixed Date", value: 4 }
]

interface IPolicyType {
  startEndDate: boolean
  orderDate: boolean
  fixedDate: boolean
}
export function PaymentDueDatePolicyType(props: IGeneratedField) {
  const [selectedPolicyType, setSelectedPolicyType] = useState<IPolicyType>({
    startEndDate: false,
    orderDate: false,
    fixedDate: false
  })

  const policyTypeChanged = (value: any) => {
    const __policyType: IPolicyType = { startEndDate: false, orderDate: false, fixedDate: false }
    switch (value) {
      case 1:
      case 2:
        __policyType.startEndDate = true
        break
      case 3:
        __policyType.orderDate = true
        break
      case 4:
        __policyType.fixedDate = true
        break
    }
    setSelectedPolicyType(__policyType)
  }
  return (
    <Row>
      <Col span={24}>
        <SearchFieldWrapper {...props} fieldName="DateReferenceType" label="Policy Type">
          <Select allowClear={true} aria-label="Policy Type" onChange={(value: any) => policyTypeChanged(value)}>
            {PaymentPolicyTypeOptions &&
              PaymentPolicyTypeOptions.map(({ label, value }, i) => (
                <Select.Option value={value} key={`${value}_${i}`}>
                  {label}
                </Select.Option>
              ))}
          </Select>
        </SearchFieldWrapper>
      </Col>
      {(selectedPolicyType.startEndDate || selectedPolicyType.orderDate) && (
        <>
          <Col span={20}>
            <FormInput label={"Offset"} fieldName="PolicyNumberOfDays" formInstance={props.formInstance} />
          </Col>
          {selectedPolicyType.orderDate && <Col span={4}>&nbsp;{" Days After"}</Col>}
        </>
      )}
      {selectedPolicyType.startEndDate && (
        <Col span={24}>
          <FormMultipleRadio
            label=""
            fieldName="BeforeAndAfter"
            options={[
              { label: "Days Before", value: false },
              { label: "Days After", value: true }
            ]}
            formInstance={props.formInstance}
          />
        </Col>
      )}
      {selectedPolicyType.fixedDate && (
        <Col span={24}>
          <FormDatePicker label="Date" fieldName="FixedDueDate" formInstance={props.formInstance} />
        </Col>
      )}
    </Row>
  )
}
