import React, { useEffect, useState } from "react"
import { Col, Form, Input, Row, Select } from "antd"
import { IField, IGeneratedField, SearchComponentWrapper } from "~/Component/Common/Form/common"
import { LookupModal } from "~/Component/Common/Modal/LookupModal/LookupModal"
import { IApiResponse } from "@packages/api/lib/utils/Interfaces"
import { TableColumnType } from "~/Component/Common/ResponsiveTable"
import { useFirstRender } from "~/Hooks/useFirstRender"
import { DeleteOutlined, SearchOutlined } from "@ant-design/icons"
import { ValidateStatus } from "antd/lib/form/FormItem"

export interface ILookupOpenButton extends IGeneratedField {
  searchFunc: (Params: { [key: string]: any }) => Promise<IApiResponse>
  lookupModalTitle: string
  disabled?: boolean
  valueField: string
  displayField: string
  columns: TableColumnType
  meta: IField[]
  metaName: string
  defaultFormValue?: { [key: string]: any }
  responsiveColumnIndices?: number[]
  expandableColumnIndices?: number[]
  entityLookupFunc?: () => Promise<any>
  tempentityLookupFunc?: (entity: string, id: any) => Promise<any>
}

export function LookupOpenButton(props: ILookupOpenButton) {
  const [showModal, setShowModal] = useState(false)
  const [selectedItems, setSelectedItems] = useState<any[]>([])
  const [options, setOptions] = useState<any[]>([])
  const firstRender = useFirstRender()

  const _rules: Array<{ [key: string]: any }> = props.rules as Array<{ [key: string]: any }>

  const [rulesRequired, setRulesRequired] = useState(false)
  const [helpMessages, setHelpMessages] = useState("")
  const [validateStatus, setValidateStatus] = useState<ValidateStatus>()

  // eslint-disable-next-line
  useEffect(() => {
    const _required = !!_rules?.find((rule: any) => rule && rule.required)
    if (_required && !props.formInstance.getFieldValue(props.fieldName)) {
      setRulesRequired(_required)
      setHelpMessages((_rules?.find((rule: any) => rule && rule.required) || {}).message)
      setValidateStatus("error")
    } else if (!!props.formInstance.getFieldValue(props.fieldName)) {
      setRulesRequired(false)
      setHelpMessages("")
      setValidateStatus(undefined)
    }
  })

  useEffect(() => {
    // console.log("props.entityLookupFunc ", props)
    if (props.entityLookupFunc) {
      props.entityLookupFunc().then((item) => {
        // console.log("item ", item)
        if (item) setSelectedItems([item])
      })
    }
    if (props.tempentityLookupFunc && props.defaultValue) {
      props.tempentityLookupFunc("Person", props.defaultValue).then((item) => {
        // console.log("item ", item)
        if (item) setSelectedItems([item.data])
      })
    }
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    !firstRender && setSelectedItems([])
    // eslint-disable-next-line
  }, [props.clearTrigger])

  const closeModal = (items?: any[]) => {
    if (items && items.length > 0) {
      if (props.extraProps && props.extraProps.isArray) {
        const __items = [...selectedItems, ...items]
        setSelectedItems(__items)
        setOptions(__items)
        props.formInstance.setFieldsValue({
          [props.fieldName]: __items.map((x) => x[props.valueField])
        })
      } else {
        // console.log([items[0]])
        setSelectedItems([items[0]])
        props.formInstance.setFieldsValue({
          [props.fieldName]: items[0][props.valueField]
        })
      }

      if (props.onSelectedItems) {
        props.onSelectedItems(items)
      }
    }
    setShowModal(false)
  }

  const toRender = (
    <>
      <Form.Item name={props.fieldName} rules={props.rules} className="hidden">
        <Input />
      </Form.Item>
      <SearchComponentWrapper
        label={props.label}
        rules={props.rules}
        formInstance={props.formInstance}
        validateStatus={props.validateStatus || validateStatus}
        help={helpMessages}
        required={rulesRequired}
      >
        {props.extraProps && props.extraProps.isArray ? (
          <Row>
            <Col span={24} style={{ display: "flex", flexDirection: "row" }}>
              <SearchOutlined
                style={{
                  borderTop: "1px solid lightgray",
                  borderBottom: "1px solid lightgray",
                  borderLeft: "1px solid lightgray",
                  padding: "8px"
                }}
                onClick={() => setShowModal(true)}
                disabled={props.disabled}
              />
              <Select
                allowClear={true}
                aria-label={props.ariaLabel}
                disabled={props.disabled}
                showSearch
                mode="multiple"
                listItemHeight={0}
                listHeight={0}
                value={selectedItems.map((x) => x[props.valueField])}
                onChange={(records: any[]) => {
                  // console.log(records)
                  const __items = records
                    .map((x) => {
                      return options.find((item) => {
                        return item[props.valueField] === x
                      })
                    })
                    .filter(Boolean)
                  setSelectedItems(__items)
                  props.formInstance.setFieldsValue({
                    [props.fieldName]: __items.length > 0 ? __items.map((x) => x[props.valueField]) : undefined
                  })
                }}
              >
                {options &&
                  Array.isArray(options) &&
                  options.map((x, i) => (
                    <Select.Option value={x[props.valueField]} key={`${x[props.valueField]}_${i}`}>
                      {x[props.displayField]}
                    </Select.Option>
                  ))}
              </Select>
            </Col>
          </Row>
        ) : (
          <Input
            value={selectedItems.length > 0 ? selectedItems[0][props.displayField] : ""}
            readOnly
            addonBefore={<SearchOutlined onClick={() => setShowModal(true)} disabled={props.disabled} />}
            addonAfter={
              <DeleteOutlined
                color="red"
                onClick={() => {
                  setSelectedItems([])
                  props.formInstance.setFieldsValue({ [props.fieldName]: undefined })
                }}
              />
            }
          />
        )}
      </SearchComponentWrapper>
      {showModal && (
        <LookupModal
          title={props.lookupModalTitle}
          {...(props.extraProps && props.extraProps.isArray && { isArray: props.extraProps.isArray })}
          closeModal={closeModal}
          searchFunc={props.searchFunc}
          columns={props.columns}
          meta={props.meta}
          metaName={props.metaName}
          responsiveColumnIndices={props.responsiveColumnIndices}
          expandableColumnIndices={props.expandableColumnIndices}
          defaultFormValue={props.defaultFormValue}
        />
      )}
    </>
  )
  return toRender
}
