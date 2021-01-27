import React, { useEffect, useState } from "react"
import { Form, Input } from "antd"
import { IField, IGeneratedField } from "~/Component/Common/SearchForm/common"
import { LookupModal } from "~/Component/Common/SearchForm/LookupModal"
import { IApiResponse } from "@packages/api/lib/utils/Interfaces"
import { TableColumnType } from "~/Component/Common/ResponsiveTable"
import { useFirstRender } from "~/Hooks/useFirstRender"
import { DeleteOutlined, SearchOutlined } from "@ant-design/icons"

export interface ISearchLookupOpenButton extends IGeneratedField {
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

export function SearchLookupOpenButton(props: ISearchLookupOpenButton) {
  const [showModal, setShowModal] = useState(false)
  const [selectedItem, setSelectedItem] = useState<any>()
  const firstRender = useFirstRender()

  useEffect(() => {
    if (props.entityLookupFunc) {
      props.entityLookupFunc().then((item) => {
        console.log("item ", item)
        setSelectedItem(item[props.displayField])
      })
    }
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    !firstRender && setSelectedItem(undefined)
    // eslint-disable-next-line
  }, [props.clearTrigger])

  const closeModal = (items?: any[]) => {
    if (items && items.length > 0) {
      console.log("Extra props", props)
      if (props.extraProps && props.extraProps.isArray) {
        setSelectedItem(items.map((x) => x[props.displayField]).toString())
        props.formInstance.setFieldsValue({
          [props.fieldName]: items.map((x) => x[props.valueField])
        })
      } else {
        setSelectedItem(items[0][props.displayField])
        props.formInstance.setFieldsValue({
          [props.fieldName]: items[0][props.valueField]
        })
      }
    }
    setShowModal(false)
  }

  const toRender = (
    <>
      <Form.Item
        colon={false}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 24 }}
        name={props.fieldName}
        rules={props.rules}
        label={props.label}
        validateStatus={props.validateStatus}
        help={props.help}
      >
        <Input
          value={selectedItem}
          readOnly
          addonBefore={<SearchOutlined onClick={() => setShowModal(true)} disabled={props.disabled} />}
          addonAfter={
            <DeleteOutlined
              color="red"
              onClick={() => {
                setSelectedItem(undefined)
                props.formInstance.setFieldsValue({ [props.fieldName]: "" })
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
