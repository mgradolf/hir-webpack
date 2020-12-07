import React, { useState } from "react"
import {
  IFilterFieldComponent,
  IFilterGenericComponentProps,
  SearchComponentWrapper
} from "~/Component/Common/SearchFilters/common"
import { Row, Select, Col } from "antd"
import { IDeviceView, useDeviceViews } from "~/Hooks/useDeviceViews"

interface ISelector {
  label?: string
  fieldName: string
  valueField?: string
  defaultValue?: any
  component: (props?: any) => JSX.Element
}
export function SearchLookupSelector(props: IFilterGenericComponentProps<IFilterFieldComponent>) {
  const selectorKeys =
    Array.isArray(props?.extraProps?.selectorKeys) && (props?.extraProps?.selectorKeys as ISelector[])
  const [selectedKey, setSelectedKey] = useState(Array.isArray(selectorKeys) && selectorKeys[0].fieldName)
  const [mobileView, setMobileView] = useState(false)

  useDeviceViews((deviceViews: IDeviceView) => {
    setMobileView(deviceViews.mobile)
  })

  const toRender = selectorKeys ? (
    <Row>
      <Col span={8} {...(mobileView && { xs: { span: 8, offset: 0 } })}>
        <Select
          style={{ width: "100%" }}
          defaultValue={selectorKeys[0].label || ""}
          onChange={(value: string) => {
            setSelectedKey(value)
          }}
        >
          {Array.isArray(selectorKeys) &&
            selectorKeys.map((x, i) => (
              <Select.Option key={i} value={x.fieldName}>
                {x.label}
              </Select.Option>
            ))}
        </Select>
      </Col>
      {selectorKeys.map((x, i) => {
        return (
          <React.Fragment key={i}>
            {selectedKey === x.fieldName && (
              <Col span={16}>
                <x.component
                  {...props}
                  label=""
                  fieldName={x.fieldName}
                  valueField={x.valueField}
                  defaultValue={x.defaultValue}
                />
              </Col>
            )}
          </React.Fragment>
        )
      })}
    </Row>
  ) : null
  return props.isCheckeble ? <SearchComponentWrapper {...props}>{toRender}</SearchComponentWrapper> : toRender
}
