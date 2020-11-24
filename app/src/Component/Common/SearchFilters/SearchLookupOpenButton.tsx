import React, { useEffect, useState } from "react"
import { Button, Form, Input, Row, Col } from "antd"
import {
  IFilterField,
  IFilterFieldComponent,
  IFilterGenericComponentProps,
  SearchComponentWrapper
} from "~/Component/Common/SearchFilters/common"
import { LookupModal } from "~/Component/Common/Modal/LookupModal"
import { IApiResponse } from "@packages/api/lib/utils/Interfaces"
import { TableColumnType } from "~/Component/Common/ResponsiveTable"

export interface SearchLookupOpenButton extends IFilterGenericComponentProps<IFilterFieldComponent> {
  entityLookupFunc?: () => Promise<{ [key: string]: any }>
  searchFunc: (Params: { [key: string]: any }) => Promise<IApiResponse>
  lookupModalTitle: string
  disabled?: boolean
  valueField: string
  displayField: string
  columns: TableColumnType
  meta: IFilterField[]
  responsiveColumnIndices?: number[]
  expandableColumnIndices?: number[]
}

export function SearchLookupOpenButton(props: SearchLookupOpenButton) {
  const [showModal, setShowModal] = useState(false)
  const [selectedItem, setSelectedItem] = useState<any>()

  useEffect(() => {
    if (props.entityLookupFunc) {
      props.entityLookupFunc().then((item) => setSelectedItem(item))
    }
    // eslint-disable-next-line
  }, [])

  const closeModal = (items?: any[]) => {
    if (items && items.length > 0) {
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
      <Form.Item className="hidden" name={props.fieldName}>
        <Input />
      </Form.Item>
      <Form.Item colon={false} label={props.label} labelCol={{ span: 8 }}>
        <Row>
          <Col span={12}>
            <Input value={selectedItem} readOnly />
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
            {...(props.extraProps && props.extraProps.isArray && { isArray: props.extraProps.isArray })}
            closeModal={closeModal}
            searchFunc={props.searchFunc}
            columns={props.columns}
            meta={props.meta}
            responsiveColumnIndices={props.responsiveColumnIndices}
            expandableColumnIndices={props.expandableColumnIndices}
          />
        )}
      </Form.Item>
    </>
  )
  return props.isCheckeble ? <SearchComponentWrapper {...props}>{toRender}</SearchComponentWrapper> : toRender
}
