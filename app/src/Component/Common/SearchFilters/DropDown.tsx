import React, { useEffect, useState } from "react"
import {
  IFilterFieldObject,
  IFilterGenericComponentProps,
  InputCol,
  LabelCol
} from "~/Component/Common/SearchFilters/common"
import styles from "~/Component/Common/SearchFilters/SearchFilters.module.scss"
import { Row, Checkbox, Select, Form } from "antd"

const { Option } = Select

export function DropDownInputType(props: IFilterGenericComponentProps<IFilterFieldObject>) {
  const [options, setOptions] = useState<any[]>([])

  useEffect(() => {
    props.refLookupService &&
      props.refLookupService().then((x) => {
        if (x.success && props.displayKey && props.valueKey) {
          x.data = x.data.map((y: any) => ({
            label: y[props.displayKey || "label"],
            value: y[props.valueKey || "value"]
          }))
          setOptions(x.data)
        }
      })
  }, [props])
  return props.isChecked ? (
    <Row>
      <LabelCol>
        <Checkbox checked={props.show} onChange={props.toggleCheckboxHandler}>
          {props.label}
        </Checkbox>
      </LabelCol>
      <InputCol className={props.show ? styles.offeringFilterField : "hidden"}>
        <Select
          aria-label={props.ariaLabel}
          style={{ width: 250 }}
          value={props.value}
          onChange={(value) => props.filterValueChanged(props.fieldName, value)}
        >
          {options &&
            options.map(({ label, value }, i) => (
              <Option value={value} key={`${value}_${i}`}>
                {label}
              </Option>
            ))}
        </Select>
      </InputCol>
    </Row>
  ) : (
    <Form.Item name={props.fieldName} label={props.label} labelCol={{ span: 6 }}>
      <Select aria-label={props.ariaLabel}>
        {options &&
          options.map(({ label, value }, i) => (
            <Option value={value} key={`${value}_${i}`}>
              {label}
            </Option>
          ))}
      </Select>
    </Form.Item>
  )
}
