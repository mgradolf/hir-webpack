import styles from "~/Component/SearchFilters/SearchFilters.module.scss"
import { Button, Col, Row, Typography } from "antd"
import { CloseOutlined } from "@ant-design/icons"
import React, { useState, useEffect } from "react"
import { RecordType } from "~/Component/ResponsiveTable"
import { CheckboxChangeEvent } from "antd/lib/checkbox"

import { TextInputType } from "./TextInput"
import { DATE_PICKER, DATE_PICKERS, DROPDOWN, IFilterField, TEXT } from "./common"
import { DropDownInputType } from "~/Component/SearchFilters/DropDown"
import { DatePickerInputType } from "~/Component/SearchFilters/DatePicker"
import { DatePickersInputType } from "~/Component/SearchFilters/DatePickers"
import { eventBus, REFRESH_FILTER_DATA_OF_PAGE } from "~/utils/EventBus"

const { Title } = Typography

interface IFilterColumnProps {
  meta: IFilterField[]
  visible: boolean
  title: string
  toggleVisiibility: () => void
  onApplyChanges: (newValues: RecordType, appliedFilterCount: number) => void
  data: RecordType
  isModalView: boolean
  customFilters?: Array<{ customInputType: string; customInputComponent: any }>
}

type Show = { [key: string]: boolean }

export default function (props: IFilterColumnProps) {
  const { visible, title, meta, data, toggleVisiibility } = props
  const [filterData, updateFilterData] = useState<RecordType>(data)
  const [metaState, updateMetaState] = useState<typeof meta>(meta)
  const initialShow = meta.reduce((show, { fieldName }) => ({ ...show, [fieldName as string]: false }), {}) as Show

  const [show, updateShow] = useState<Show>(
    Object.keys(data).reduce(
      (visibilityRecord, key) => ({ ...visibilityRecord, [key]: Boolean(data[key] !== "") }),
      initialShow
    )
  )

  const toggleShow = (name: string) => (event: CheckboxChangeEvent) => {
    updateShow({ ...show, [name]: !show[name] })
    updateFilterData({ ...filterData, [name]: event.target.checked ? filterData[name] : "" })
    console.log("show ", show)
    console.log("filterData ", filterData)
  }

  const onChangeField = (fieldName: string, value: string) => {
    updateFilterData({
      ...filterData,
      [fieldName]: value
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
        if (typeof field.refLookupService === "function" && field.inputType === DROPDOWN) {
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

        return null
      })}

      {metaState.map((field, i) => {
        return (
          props.customFilters &&
          props.customFilters.length > 0 &&
          props.customFilters.map((customFilter) => {
            const { inputType, fieldName } = field
            const { customInputType, customInputComponent } = customFilter
            if (inputType === customInputType) {
              console.log("inputType === customInputType", inputType, customInputType, customInputComponent)
              return customInputComponent({
                ...field,
                key: i + customInputType,
                value: filterData[fieldName],
                show: show[fieldName],
                toggleCheckboxHandler: toggleShow(fieldName),
                filterValueChanged: onChangeField
              })
            }
            return null
          })
        )
      })}

      <Row className={styles.floatRight}>
        <Button
          type="primary"
          aria-label="Apply Filter"
          className={styles.applyBtn}
          onClick={() => {
            const filterCount = Object.keys(filterData).filter((x) => x !== "" || !x).length
            props.onApplyChanges(filterData, filterCount)
          }}
        >
          Apply
        </Button>
      </Row>
    </Col>
  )
}
