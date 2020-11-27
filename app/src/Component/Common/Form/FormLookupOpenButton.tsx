import React, { useEffect, useState } from "react"
import { Button, Form, Input, Row, Col } from "antd"
import { IFilterField } from "~/Component/Common/SearchFilters/common"
import { LookupModal } from "~/Component/Common/Modal/LookupModal"
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
  valueField: string
  fieldName: string
  label: string
  columns: TableColumnType
  meta: IFilterField[]
  isArray?: boolean
  zIndex?: boolean
  formInstance: FormInstance
}

export function FormLookupOpenButton(props: IFormLookupOpenButton) {
  const [showModal, setShowModal] = useState(false)
  const [selectedItem, setSelectedItem] = useState<any>()

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
          [props.fieldName]: "[" + items.map((x) => x[props.valueField]).toString() + "]"
        }
      } else {
        setSelectedItem(items[0][props.displayField])
        selectedValue = {
          [props.fieldName]: items[0][props.valueField]
        }
      }
      props.formInstance.setFieldsValue(selectedValue)
      props.onCloseModal && props.onCloseModal(items)
    }
    setShowModal(false)
  }

  return (
    <>
      <Form.Item className="hidden" name={props.fieldName}>
        <Input />
      </Form.Item>
      <Form.Item colon={false} label={props.label} labelCol={{ span: 6 }}>
        <Row>
          <Col span={12}>
            <Input value={selectedItem} readOnly allowClear />
          </Col>
          <Col span={4}>
            <Button onClick={() => setShowModal(true)} disabled={props.disabled}>
              Lookup
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
            zIndex={props.zIndex}
          />
        )}
      </Form.Item>
    </>
  )
}
