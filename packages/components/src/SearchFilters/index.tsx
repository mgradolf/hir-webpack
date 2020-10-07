import styles from "./SearchFilters.module.scss"
import { Button, Col, Row, Typography } from "antd"
import { CloseOutlined } from "@ant-design/icons"
import React, { useState, useEffect } from "react"
import { CheckboxChangeEvent } from "antd/lib/checkbox"

import { DATE_PICKER, DATE_PICKERS, DROPDOWN, IFilterField, isFilterObject, TEXT } from "./common"
import TextInputType from "./TextInput"
import DropDownInputType from "./DropDown"
import DatePickerInputType from "./DatePicker"
import DatePickersInputType from "./DatePickers"
// import { eventBus, REFRESH_FILTER_DATA_OF_PAGE } from "~/utils/EventBus"

const { Title } = Typography

interface IFilterColumnProps {
  meta: IFilterField[]
  visible: boolean
  title: string
  toggleVisiibility: () => void
  onApplyChanges: (newValues: { [key: string]: string }, appliedFilterCount: number) => void
  data: { [key: string]: string }
  isModalView: boolean
}

type Show = { [key: string]: boolean }

export default function SearchFilters(props: IFilterColumnProps) {
  const { visible, title, meta, data, toggleVisiibility } = props
  const [filterData, updateFilterData] = useState<{ [key: string]: string }>(data)
  const [metaState, updateMetaState] = useState<typeof meta>(meta)
  const initialShow = meta.reduce((show, field) => ({ ...show, [field.fieldName as string]: false }), {}) as Show

  const [show, updateShow] = useState<Show>(
    Object.keys(data).reduce(
      (visibilityRecord, key) => ({ ...visibilityRecord, [key]: Boolean(data[key] !== "") }),
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

  const onChangeFieldCopmonent = (values: React.SetStateAction<{ [key: string]: string }>) => {
    updateFilterData({
      ...filterData,
      ...values
    })
  }

  useEffect(() => {
    function transformIntoOptions(remoteDataArray: any[], displayKey: string, valueKey: string) {
      return (
        (remoteDataArray && remoteDataArray.map((data) => ({ label: data[displayKey], value: data[valueKey] }))) || []
      )
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

    // eventBus.subscribe(REFRESH_FILTER_DATA_OF_PAGE, loadRemoteData)
    loadRemoteData()
    // return () => {
    //   eventBus.unsubscribe(REFRESH_FILTER_DATA_OF_PAGE)
    // }
  }, [props.meta])

  return (
    <Col
      className={visible ? `gutter-row ${styles.offeringFilter}` : styles.hidden}
      xs={24}
      sm={24}
      md={props.isModalView ? 12 : 6}
    >
      <Row>
        <Col span={12}>
          <Title level={4}>{title}</Title>
        </Col>
        <Col span={12} className={styles.padding5px}>
          <CloseOutlined onClick={toggleVisiibility} style={{ fontSize: "20px", color: "black", float: "right" }} />
        </Col>
      </Row>
      {metaState.map((field, i) => {
        if (isFilterObject(field)) {
          const { inputType, fieldName } = field
          if (inputType === TEXT) {
            return (
              <TextInputType
                {...field}
                key={i}
                value={filterData[fieldName]}
                show={show[fieldName]}
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
                toggleCheckboxHandler={toggleShow(fieldName)}
                filterValueChanged={onChangeField}
              />
            )
          }
        } else if (field.customFilterComponent) {
          return field.customFilterComponent({
            ...field,
            key: i,
            value: filterData,
            show,
            toggleCheckboxHandler: (fieldName: string | string[]) => toggleShow(fieldName),
            filterValueChanged: onChangeFieldCopmonent
          })
        }

        return null
      })}

      <Row className={styles.floatRight}>
        <Button
          type="primary"
          aria-label="Apply Filter"
          className={styles.applyBtn}
          onClick={() => {
            const filterCount = Object.keys(filterData).filter((key) => filterData[key] !== "").length
            props.onApplyChanges(filterData, filterCount)
          }}
        >
          Apply
        </Button>
      </Row>
    </Col>
  )
}
