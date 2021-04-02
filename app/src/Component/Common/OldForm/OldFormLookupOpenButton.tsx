import React, { useEffect, useState } from "react"
import { Button, Form, Input, Row, Col } from "antd"
import { IField } from "~/Component/Common/Form/common"
import { LookupModal } from "~/Component/Common/Modal/LookupModal/LookupModal"
import { IApiResponse } from "@packages/api/lib/utils/Interfaces"
import { TableColumnType } from "~/Component/Common/ResponsiveTable"
import { FormInstance } from "antd/lib/form"

export interface IFormLookupOpenButton {
  entityLookupFunc?: () => Promise<{ [key: string]: any }>
  searchFunc: (Params: { [key: string]: any }) => Promise<IApiResponse>
  onCloseModal?: (persons?: Array<{ [key: string]: string }>) => void
  lookupModalTitle: string
  disabled?: boolean
  displayField: string
  valueKey: string
  fieldName: string
  label: string
  columns: TableColumnType
  meta: IField[]
  metaName?: string
  isArray?: boolean
  zIndex?: boolean
  formInstance: FormInstance
}

export function OldFormLookupOpenButton(props: IFormLookupOpenButton) {
  const defaultDisplayFieldValue = props.formInstance.getFieldValue(props.displayField)
  const [showModal, setShowModal] = useState(false)
  const [selectedItem, setSelectedItem] = useState<any>(defaultDisplayFieldValue)

  useEffect(() => {
    if (props.entityLookupFunc) {
      props.entityLookupFunc().then((item) => setSelectedItem(item[props.displayField]))
    }
  }, [props])

  const closeModal = (items?: any[]) => {
    let selectedValue: any
    if (items && items.length > 0) {
      if (props.isArray) {
        setSelectedItem(items.map((x) => x[props.displayField]).toString())
        selectedValue = {
          [props.fieldName]: "[" + items.map((x) => x[props.valueKey]).toString() + "]"
        }
      } else {
        setSelectedItem(items[0][props.displayField])
        selectedValue = {
          [props.fieldName]: items[0][props.valueKey]
        }
      }
      props.formInstance.setFieldsValue(selectedValue)
      props.onCloseModal && props.onCloseModal(items)
    }
    setShowModal(false)
  }

  const clearSelection = () => {
    props.formInstance.setFieldsValue({ [props.fieldName]: null })
    setSelectedItem("")
  }

  return (
    <>
      <Form.Item className="hidden" name={props.fieldName}>
        <Input />
      </Form.Item>
      <Form.Item colon={false} label={props.label} labelCol={{ span: 6 }}>
        <Row>
          <Col span={12}>
            <Input value={selectedItem} readOnly />
          </Col>
          <Col span={4}>
            <Button onClick={() => setShowModal(true)} disabled={props.disabled}>
              Lookup
            </Button>
          </Col>
          <Col span={4}>
            <Button danger onClick={clearSelection} disabled={props.disabled}>
              Clear
            </Button>
          </Col>
        </Row>
        {showModal && (
          <LookupModal
            title={props.lookupModalTitle}
            isArray={props.isArray}
            closeModal={closeModal}
            searchFunc={props.searchFunc}
            columns={props.columns}
            meta={props.meta}
            metaName={props.metaName || ""}
            zIndex={props.zIndex}
          />
        )}
      </Form.Item>
    </>
  )
}
