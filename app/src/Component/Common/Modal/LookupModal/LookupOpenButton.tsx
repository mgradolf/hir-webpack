import React, { useState } from "react"
import { Col, Row, Select } from "antd"
import { IField, IGeneratedField, SearchFieldWrapper } from "~/Component/Common/Form/common"
import { LookupModal } from "~/Component/Common/Modal/LookupModal/LookupModal"
import { IApiResponse } from "@packages/api/lib/utils/Interfaces"
import { TableColumnType } from "~/Component/Common/ResponsiveTable"
import { SearchOutlined } from "@ant-design/icons"

export interface ILookupOpenButton extends IGeneratedField {
  displayKey: string
  valueKey: string
  searchFunc: (Params: { [key: string]: any }) => Promise<IApiResponse>
  lookupModalTitle: string
  disabled?: boolean
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
  const [options, setOptions] = useState<any[]>([])

  const closeModal = (items?: any[]) => {
    if (items && items.length > 0) {
      setOptions(items)
    }
    if (props.onSelectedItems) {
      props.onSelectedItems(items)
    }
    setShowModal(false)
  }

  const toRender = (
    <>
      <Row>
        <Col span={20}>
          <SearchFieldWrapper
            fieldName={props.fieldName}
            label={props.label}
            rules={props.rules}
            formInstance={props.formInstance}
            labelColSpan={props.labelColSpan}
            wrapperColSpan={props.wrapperColSpan}
          >
            <Select
              showSearch
              allowClear={true}
              aria-label={props.ariaLabel}
              disabled={props.disabled}
              {...(props.extraProps && props.extraProps.isArray && { mode: "multiple" })}
              listItemHeight={0}
              listHeight={0}
            >
              {options.map((x, i) => (
                <Select.Option value={x[props.valueKey]} key={`${x[props.valueKey]}_${i}`}>
                  {x[props.displayKey]}
                </Select.Option>
              ))}
            </Select>
          </SearchFieldWrapper>
        </Col>
        <Col span={4}>
          <SearchOutlined
            style={{
              borderTop: "1px solid lightgray",
              borderBottom: "1px solid lightgray",
              borderLeft: "1px solid lightgray",
              borderRight: "1px solid lightgray",
              padding: "8px"
            }}
            onClick={() => setShowModal(true)}
            disabled={props.disabled}
          />
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
