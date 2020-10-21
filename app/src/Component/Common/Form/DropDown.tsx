import { IApiResponse } from "@packages/api/lib/utils/Interfaces"
import { Form, Select } from "antd"
import React, { useEffect, useState } from "react"

interface IDropDown {
  fieldName: string
  label: string
  displayField: string
  valueField: string
  searchFunc: (Params?: { [key: string]: any }) => Promise<IApiResponse>
  searchParams?: { [key: string]: any }
  labelColumn?: { [key: string]: any }
  defaultValue?: any
  disabled?: boolean
}
export default function DropDown(props: IDropDown) {
  const [dataSource, setDataSource] = useState<any[]>([])
  useEffect(() => {
    if (props.searchFunc) {
      props.searchFunc(props.searchParams).then((x) => {
        if (x.success && Array.isArray(x.data))
          setDataSource(
            x.data.map((y, key) => {
              return {
                ...y,
                key
              }
            })
          )
      })
    }
  }, [props])
  return (
    <Form.Item label={props.label} name={props.fieldName} labelCol={props.labelColumn}>
      <Select defaultValue={props.defaultValue} disabled={props.disabled}>
        {dataSource.map((x) => (
          <Select.Option key={x.key + x[props.valueField] + x[props.displayField]} value={x[props.valueField]}>
            {x[props.displayField]}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  )
}
