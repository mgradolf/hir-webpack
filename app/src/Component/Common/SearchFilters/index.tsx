import styles from "~/Component/Common/SearchFilters/SearchFilters.module.scss"
import { Button, Col, Form, Row, Typography } from "antd"
import { CloseOutlined } from "@ant-design/icons"
import React, { useState, useEffect } from "react"
import { RecordType } from "~/Component/Common/ResponsiveTable"
import { CheckboxChangeEvent } from "antd/lib/checkbox"

import { TextInputType } from "~/Component/Common/SearchFilters/TextInput"
import {
  DATE_PICKER,
  DATE_PICKERS,
  DROPDOWN,
  IFilterField,
  isFilterObject,
  NUMBER,
  TEXT
} from "~/Component/Common/SearchFilters/common"
import { DropDownInputType } from "~/Component/Common/SearchFilters/DropDown"
import { DatePickerInputType } from "~/Component/Common/SearchFilters/DatePicker"
import { DatePickersInputType } from "~/Component/Common/SearchFilters/DatePickers"
import { eventBus, REFRESH_FILTER_DATA_OF_PAGE } from "~/utils/EventBus"

const { Title } = Typography

interface IFilterColumnProps {
  meta: IFilterField[]
  visible: boolean
  title: string
  toggleVisiibility: () => void
  onApplyChanges: (newValues: RecordType, appliedFilterCount: number) => void
  initialFilter: { [key: string]: string }
  isModalView: boolean
  isChecked?: boolean
}

type Show = { [key: string]: boolean }

export default function (props: IFilterColumnProps) {
  const isChecked = props.isChecked === undefined ? true : props.isChecked
  const [filterData, updateFilterData] = useState<RecordType>(props.initialFilter)
  const [metaState, updateMetaState] = useState<typeof props.meta>(props.meta)
  const initialShow = props.meta.reduce((show, field) => ({ ...show, [field.fieldName as string]: false }), {}) as Show

  const [show, updateShow] = useState<Show>(
    Object.keys(props.initialFilter).reduce(
      (visibilityRecord, key) => ({
        ...visibilityRecord,
        [key]: Boolean(props.initialFilter[key] !== "" && props.initialFilter[key] !== "*")
      }),
      initialShow
    )
  )

  const toggleShow = (name: string | string[]) => (event: CheckboxChangeEvent) => {
    if (typeof name === "string") {
      updateShow({ ...show, [name]: event.target.checked })
      updateFilterData({ ...filterData, [name]: event.target.checked ? filterData[name] : "" })
    } else {
      // group of fields to reset when unchecked
      const fieldShow = name.reduce((s, f) => ({ ...s, [f]: event.target.checked }), {})
      const fieldValues = name.reduce((v, f) => ({ ...v, [f]: "" }), {})

      updateShow({ ...show, ...fieldShow })
      updateFilterData({ ...filterData, ...fieldValues })
    }
  }

  const onChangeField = (fieldName: string, value: string) => {
    updateFilterData({
      ...filterData,
      [fieldName]: value
    })
  }

  const onChangeDatePickersField = (fieldName: string, value: string, fieldName2?: string, value2?: string) => {
    updateFilterData({
      ...filterData,
      [fieldName]: value,
      ...(fieldName2 && value2 && { [fieldName2]: value2 })
    })
  }

  const onChangeFieldCopmonent = (values: RecordType) => {
    updateFilterData({
      ...filterData,
      ...values
    })

    const newShow: { [key: string]: boolean } = {}

    Object.keys(values).forEach((key) => {
      if (values[key] !== "" && !show[key]) {
        newShow[key] = true
      }
    })

    if (Object.keys(newShow).length > 0) {
      updateShow({ ...show, ...newShow })
    }
  }

  useEffect(() => {
    function transformIntoOptions(remoteDataArray: any[], displayKey: string, valueKey: string) {
      return (remoteDataArray && remoteDataArray.map((x) => ({ label: x[displayKey], value: x[valueKey] }))) || []
    }

    function loadRemoteData() {
      const metaList = [...props.meta]
      metaList.forEach(async (field) => {
        if (isFilterObject(field) && typeof field.refLookupService === "function" && field.inputType === DROPDOWN) {
          const res = await field.refLookupService()
          field.options = transformIntoOptions(res.data, field.displayKey as string, field.valueKey as string)
          updateMetaState(metaList)
        }
      })
    }

    eventBus.subscribe(REFRESH_FILTER_DATA_OF_PAGE, loadRemoteData)
    loadRemoteData()
    return () => {
      eventBus.unsubscribe(REFRESH_FILTER_DATA_OF_PAGE)
    }
  }, [props.meta])

  const filterFieldsArray = metaState.map((field, i) => {
    if (isFilterObject(field)) {
      const { inputType, fieldName } = field
      if (inputType === TEXT || inputType === NUMBER) {
        return (
          <TextInputType
            {...field}
            key={i}
            value={filterData[fieldName]}
            show={show[fieldName]}
            isChecked={isChecked}
            toggleCheckboxHandler={toggleShow(fieldName)}
            filterValueChanged={onChangeField}
          />
        )
      }

      if (inputType === DROPDOWN) {
        return (
          <DropDownInputType
            {...field}
            key={i}
            value={filterData[fieldName]}
            show={show[fieldName]}
            isChecked={isChecked}
            toggleCheckboxHandler={toggleShow(fieldName)}
            filterValueChanged={onChangeField}
          />
        )
      }

      if (inputType === DATE_PICKER) {
        return (
          <DatePickerInputType
            {...field}
            key={i}
            value={filterData[fieldName]}
            show={show[fieldName]}
            isChecked={isChecked}
            toggleCheckboxHandler={toggleShow(fieldName)}
            filterValueChanged={onChangeField}
          />
        )
      }

      if (inputType === DATE_PICKERS) {
        return (
          <DatePickersInputType
            {...field}
            key={i}
            value={filterData[field.valueKey as string]}
            value2={filterData[field.valueKey2 as string]}
            show={show[fieldName]}
            isChecked={isChecked}
            toggleCheckboxHandler={toggleShow(fieldName)}
            filterValueChanged={onChangeDatePickersField}
          />
        )
      }
    } else if (field.customFilterComponent) {
      return field.customFilterComponent({
        ...field,
        key: i,
        value: filterData,
        show,
        isChecked,
        toggleCheckboxHandler: (fieldName: string | string[]) => toggleShow(fieldName),
        filterValueChanged: onChangeFieldCopmonent
      })
    }

    return null
  })

  const filterContent = isChecked ? (
    filterFieldsArray
  ) : (
    <Form
      hideRequiredMark
      layout="horizontal"
      initialValues={filterData}
      onValuesChange={(newValues) => updateFilterData({ ...filterData, ...newValues })}
    >
      {filterFieldsArray}
    </Form>
  )

  return (
    <Col
      className={props.visible ? `gutter-row ${styles.offeringFilter}` : "hidden"}
      xs={24}
      sm={24}
      md={props.isModalView ? (!isChecked ? 24 : 12) : 6}
    >
      {isChecked && (
        <Row>
          <Col span={12}>
            <Title level={4}>{props.title}</Title>
          </Col>
          <Col span={12} className={styles.padding5px}>
            <CloseOutlined
              onClick={props.toggleVisiibility}
              style={{ fontSize: "20px", color: "black", float: "right" }}
            />
          </Col>
        </Row>
      )}

      {filterContent}

      <Row className={styles.floatRight}>
        <Button
          type="primary"
          aria-label="Apply Filter"
          className={styles.applyBtn}
          onClick={() => {
            const filterCount = Object.keys(filterData).filter(
              (key) => filterData[key] !== "" && filterData[key] !== "*"
            ).length
            props.onApplyChanges(filterData, filterCount)
          }}
        >
          Apply
        </Button>
      </Row>
    </Col>
  )
}
