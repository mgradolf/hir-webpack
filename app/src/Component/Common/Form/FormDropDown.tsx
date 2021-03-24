import React, { useEffect, useState } from "react"
import { SearchFieldWrapper, IGeneratedField } from "~/Component/Common/Form/common"
import { Select } from "antd"
import { eventBus } from "~/utils/EventBus"

export function FormDropDown(props: IGeneratedField & { onChangeCallback?: (params: any) => void }) {
  const [options, setOptions] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  const { refLookupService, displayKey, valueKey } = props

  const loadOptions = () => {
    if (props.defaultValue) {
      props.formInstance.setFieldsValue({ [props.fieldName]: props.defaultValue })
    }
    if (props.options && props.options.length) {
      setOptions(
        props.options.map((x) => {
          return {
            label: x["label"],
            value: x["value"]
          }
        })
      )
    } else if (refLookupService) {
      setLoading(true)
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
    }
  }
  useEffect(() => {
    const eventName = `REFRESH_SEARCH_DROPDOWN_${
      (refLookupService || new Date().getTime())?.toString() + displayKey + valueKey + props.fieldName
    }`
    eventBus.subscribe(eventName, loadOptions)
    eventBus.publish(eventName)
    return () => {
      eventBus.unsubscribe(eventName)
    }
    // eslint-disable-next-line
  }, [])

  return (
    <SearchFieldWrapper {...props}>
      <Select
        allowClear={true}
        loading={loading}
        aria-label={props.ariaLabel}
        disabled={props.disabled}
        onChange={props.onChangeCallback}
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
