import React, { useEffect, useState } from "react"
import { Select, Spin } from "antd"
import { IField, IGeneratedField, SearchFieldWrapper } from "~/Component/Common/Form/common"
import { LookupModal } from "~/Component/Common/Modal/LookupModal/LookupModal"
import { IApiResponse } from "@packages/api/lib/utils/Interfaces"
import { TableColumnType } from "~/Component/Common/ResponsiveTable"
import { SearchOutlined } from "@ant-design/icons"
import debounce from "~/utils/debounce"
import { putSpaceBetweenCapitalLetters } from "~/utils/util"

export interface ILookupOpenButton extends IGeneratedField {
  displayKey: string
  valueKey: string
  searchFunc: (Params: { [key: string]: any }) => Promise<IApiResponse>
  searchFieldName?: string
  lookupModalTitle: string
  disabled?: boolean
  columns: TableColumnType
  meta: IField[]
  metaName: string
  // defaultFormValue?: { [key: string]: any }
  responsiveColumnIndices?: number[]
  expandableColumnIndices?: number[]
  entityLookupFunc?: () => Promise<any>
}

export function LookupOpenButton(props: ILookupOpenButton) {
  const [showModal, setShowModal] = useState(false)
  const [options, setOptions] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [searchKey, setSearchKey] = useState("")
  const [keepOptionsOpen, setKeepOptionsOpen] = useState(false)

  useEffect(() => {
    const defaultValue = props.defaultValue || props.formInstance.getFieldValue(props.fieldName)
    if (defaultValue) {
      props.searchFunc({ [props.fieldName]: defaultValue }).then((x) => {
        if (x.success) setOptions(x.data)
      })
    }
    // eslint-disable-next-line
  }, [props.defaultValue, props.fieldName])

  const closeModal = (items?: any[]) => {
    if (items && items.length > 0) {
      if (props.extraProps && props.extraProps.isArray) {
        const previousValues: any[] = props.formInstance.getFieldValue(props.fieldName) || []
        console.log("previouse values ", previousValues)
        props.formInstance.setFieldsValue({
          [props.fieldName]: [...previousValues, ...items.map((x) => x[props.valueKey])]
        })
        setOptions([...options, ...items])
      } else {
        setOptions(items)
        props.formInstance.setFieldsValue({ [props.fieldName]: items[0][props.valueKey] })
      }
    }
    if (props.onSelectedItems) {
      setShowModal(false)
      props.onSelectedItems(items)
    }
    setShowModal(false)
  }

  const handleSearch = debounce((searchInput: any): void => {
    if (!searchInput || searchInput === "") return
    setLoading(true)
    props.searchFunc({ [props.searchFieldName || props.displayKey]: searchInput }).then((x) => {
      if (x.success) {
        setOptions(x.data)
      }
      setLoading(false)
    })
  }, 500)
  const toRender = (
    <>
      <SearchFieldWrapper
        help={props.help}
        fieldName={props.fieldName}
        label={props.label}
        rules={props.rules}
        formInstance={props.formInstance}
        labelColSpan={props.labelColSpan}
        wrapperColSpan={props.wrapperColSpan}
      >
        <Select
          showSearch
          loading={loading}
          placeholder={
            props.placeholder
              ? props.placeholder
              : `Search By ${
                  props.searchFieldName
                    ? putSpaceBetweenCapitalLetters(props.searchFieldName)
                    : putSpaceBetweenCapitalLetters(props.displayKey)
                }`
          }
          allowClear={true}
          filterOption={false}
          aria-label={props.ariaLabel}
          disabled={props.disabled}
          notFoundContent={loading ? <Spin size="small" /> : null}
          {...(props.extraProps && props.extraProps.isArray && { mode: "multiple" })}
          listItemHeight={10}
          listHeight={256}
          open={keepOptionsOpen}
          defaultActiveFirstOption={false}
          onChange={(value: any) => {
            if (props.onSelectedItems) {
              if (Array.isArray(value)) {
                const __: any[] = []
                options.forEach((x) => {
                  if (!!value.find((val) => val === x[props.valueKey])) __.push(x)
                })
                props.onSelectedItems(__)
              } else {
                const __ = options.find((x) => x[props.valueKey] === value)
                props.onSelectedItems([__])
              }
              // const data = options.filter((x: any) => x[props.valueKey] === value)
              // props.onSelectedItems(data)
              //if (Array.isArray(value)) props.onSelectedItems(value)
              //else props.onSelectedItems([value])
            }
          }}
          onSearch={debounce((_searchKey) => {
            setSearchKey(_searchKey)
          }, 200)}
          onKeyDown={(event) => {
            if (event.keyCode === 13 && !(!searchKey || searchKey === "")) {
              setKeepOptionsOpen(true)
              setOptions([])
              handleSearch(searchKey)
            }
          }}
          onMouseDown={() => {
            setKeepOptionsOpen(true)
          }}
          onFocus={() => {
            setKeepOptionsOpen(true)
          }}
          onBlur={() => {
            setKeepOptionsOpen(false)
          }}
          onSelect={() => {
            setKeepOptionsOpen(false)
          }}
          menuItemSelectedIcon={<SearchOutlined onClick={() => setShowModal(true)} disabled={props.disabled} />}
          suffixIcon={<SearchOutlined onClick={() => setShowModal(true)} disabled={props.disabled} />}
        >
          {Array.isArray(options) &&
            options.map((x, i) => (
              <Select.Option value={x[props.valueKey]} key={`${x[props.valueKey]}_${i}`}>
                {x[props.displayKey]}
              </Select.Option>
            ))}
        </Select>
      </SearchFieldWrapper>
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
          // defaultFormValue={props.defaultFormValue}
        />
      )}
    </>
  )
  return toRender
}
