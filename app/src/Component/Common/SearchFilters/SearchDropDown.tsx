import React, { useEffect, useState } from "react"
import {
  IFilterFieldObject,
  IFilterGenericComponentProps,
  SearchFieldWrapper
} from "~/Component/Common/SearchFilters/common"
import { Select } from "antd"

export function DropDownInputType(props: IFilterGenericComponentProps<IFilterFieldObject>) {
  const [options, setOptions] = useState<any[]>(props.options || [])
  const [loading, setLoading] = useState(false)

  const { refLookupService, displayKey, valueKey } = props
  useEffect(() => {
    setLoading(true)
    refLookupService &&
      refLookupService().then((x) => {
        if (x.success && displayKey && valueKey) {
          x.data = x.data.map((y: any) => ({
            label: y[displayKey || "label"],
            value: y[valueKey || "value"]
          }))
          setOptions(x.data)
        }
        setLoading(false)
      })
  }, [refLookupService, displayKey, valueKey])

  return (
    <SearchFieldWrapper {...props}>
      <Select
        loading={loading}
        aria-label={props.ariaLabel}
        style={props.isChecked ? { width: 150 } : {}}
        value={props.value}
        onChange={(value) => props.filterValueChanged(props.fieldName, value)}
      >
        {options &&
          options.map(({ label, value }, i) => (
            <Select.Option value={value} key={`${value}_${i}`}>
              {label}
            </Select.Option>
          ))}
      </Select>
    </SearchFieldWrapper>
  )
}
