import React, { useEffect, useState } from "react"
import { SearchFieldWrapper, IGeneratedField } from "~/Component/Common/Form/common"
import { Checkbox, Col, Row } from "antd"
import { eventBus } from "~/utils/EventBus"

export function FormMultipleCheckbox(props: IGeneratedField & { onChangeCallback?: (params: any) => void }) {
  const [options, setOptions] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  const { refLookupService, displayKey, valueKey } = props

  const loadOptions = () => {
    if (props.options?.length) {
      setOptions(
        props.options?.map((x) => {
          return {
            label: x[displayKey || "label"],
            value: x[valueKey || "value"]
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
      (refLookupService || new Date().getTime())?.toString() + displayKey + valueKey
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
      <Checkbox.Group style={{ width: "100%" }} disabled={props.disabled} aria-label={props.ariaLabel}>
        <div style={{ border: "1px solid lightgray", padding: "5px" }}>
          <Row>
            {!loading &&
              options &&
              options.length > 0 &&
              options.map((x, i) => (
                <Col flex="auto" key={i}>
                  <Checkbox value={x.value}>{x.label}</Checkbox>
                </Col>
              ))}
          </Row>
        </div>
      </Checkbox.Group>
      {/* <Select
        allowClear={true}
        loading={loading}
        onChange={props.onChangeCallback}
      >
        {options &&
          options.map(({ label, value }, i) => (
            <Select.Option value={value} key={`${value}_${i}`}>
              {label}
            </Select.Option>
          ))}
      </Select> */}
    </SearchFieldWrapper>
  )
}
