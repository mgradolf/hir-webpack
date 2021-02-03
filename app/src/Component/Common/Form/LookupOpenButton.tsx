import React, { useEffect, useState } from "react"
import { Form, Input } from "antd"
import { IField, IGeneratedField } from "~/Component/Common/Form/common"
import { LookupModal } from "~/Component/Common/Form/LookupModal"
import { IApiResponse } from "@packages/api/lib/utils/Interfaces"
import { TableColumnType } from "~/Component/Common/ResponsiveTable"
import { useFirstRender } from "~/Hooks/useFirstRender"
import { DeleteOutlined, SearchOutlined } from "@ant-design/icons"

export interface ILookupOpenButton extends IGeneratedField {
  entityLookupFunc?: () => Promise<{ [key: string]: any }>
  searchFunc: (Params: { [key: string]: any }) => Promise<IApiResponse>
  lookupModalTitle: string
  disabled?: boolean
  valueField: string
  displayField: string
  columns: TableColumnType
  meta: IField[]
  responsiveColumnIndices?: number[]
  expandableColumnIndices?: number[]
}

export function LookupOpenButton(props: ILookupOpenButton) {
  const [showModal, setShowModal] = useState(false)
  const [selectedName, setSelectedName] = useState<any>()
  const firstRender = useFirstRender()

  const _rules: Array<{ [key: string]: any }> = props.rules as Array<{ [key: string]: any }>
  const rulesRequired = !!_rules?.find((rule: any) => rule && rule.required)

  useEffect(() => {
    if (props.entityLookupFunc) {
      props.entityLookupFunc().then((item) => {
        console.log("item ", item)
        setSelectedName(item[props.displayField])
      })
    }
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    !firstRender && setSelectedName(undefined)
    // eslint-disable-next-line
  }, [props.clearTrigger])

  const closeModal = (items?: any[]) => {
    if (items && items.length > 0) {
      console.log("Extra props", props)
      if (props.extraProps && props.extraProps.isArray) {
        setSelectedName(items.map((x) => x[props.displayField]).toString())
        props.formInstance.setFieldsValue({
          [props.fieldName]: items.map((x) => x[props.valueField])
        })
      } else {
        setSelectedName(items[0][props.displayField])
        props.formInstance.setFieldsValue({
          [props.fieldName]: items[0][props.valueField]
        })
      }
    }
    setShowModal(false)
  }

  const toRender = (
    <>
      <Form.Item name={props.fieldName} hidden={true}>
        <Input />
      </Form.Item>
      <Form.Item
        colon={false}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 24 }}
        label={props.label}
        validateStatus={props.validateStatus}
        help={props.help}
        required={rulesRequired}
      >
        <Input
          value={selectedName}
          readOnly
          addonBefore={<SearchOutlined onClick={() => setShowModal(true)} disabled={props.disabled} />}
          addonAfter={
            <DeleteOutlined
              color="red"
              onClick={() => {
                setSelectedName(undefined)
                props.formInstance.setFieldsValue({ [props.fieldName]: undefined })
              }}
            />
          }
        />
      </Form.Item>
      {showModal && (
        <LookupModal
          title={props.lookupModalTitle}
          {...(props.extraProps && props.extraProps.isArray && { isArray: props.extraProps.isArray })}
          closeModal={closeModal}
          searchFunc={props.searchFunc}
          columns={props.columns}
          meta={props.meta}
          responsiveColumnIndices={props.responsiveColumnIndices}
          expandableColumnIndices={props.expandableColumnIndices}
        />
      )}
    </>
  )
  return toRender
}
