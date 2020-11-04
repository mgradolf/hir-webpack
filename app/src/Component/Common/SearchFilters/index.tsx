import styles from "~/Component/Common/SearchFilters/SearchFilters.module.scss"
import { Button, Col, Form, Row, Typography } from "antd"
import { CloseOutlined } from "@ant-design/icons"
import React, { useState } from "react"
import { RecordType } from "~/Component/Common/ResponsiveTable"
import { CheckboxChangeEvent } from "antd/lib/checkbox"
import { TextInputType } from "~/Component/Common/SearchFilters/SearchInput"
import {
  IFilterField,
  isFilterObject,
  DATE_PICKER,
  DATE_PICKERS,
  DROPDOWN,
  NUMBER,
  TEXT
} from "~/Component/Common/SearchFilters/common"
import { DropDownInputType } from "~/Component/Common/SearchFilters/SearchDropDown"
import { DatePickerInputType } from "~/Component/Common/SearchFilters/SearchDatePicker"
import { DatePickersInputType } from "~/Component/Common/SearchFilters/SearchDatePickers"

const { Title } = Typography

interface IFilterColumnProps {
  meta: IFilterField[]
  visible: boolean
  title: string
  hideFilters?: () => void
  onApplyChanges: (newValues: RecordType, appliedFilterCount: number) => void
  initialFilter: { [key: string]: string }
  isModalView: boolean
  isCheckeble?: boolean
}

type Show = { [key: string]: boolean }

export default function (props: IFilterColumnProps) {
  const isCheckeble = props.isCheckeble === undefined ? true : props.isCheckeble
  const [filterData, setFilterData] = useState<RecordType>(props.initialFilter)
  const initialShow = props.meta.reduce((show, field) => ({ ...show, [field.fieldName as string]: false }), {}) as Show
  const [showLess, setShowLess] = useState(true)

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
      setFilterData({ ...filterData, [name]: event.target.checked ? filterData[name] : "" })
    } else {
      // group of fields to reset when unchecked
      const fieldShow = name.reduce((s, f) => ({ ...s, [f]: event.target.checked }), {})
      const fieldValues = name.reduce((v, f) => ({ ...v, [f]: "" }), {})

      updateShow({ ...show, ...fieldShow })
      setFilterData({ ...filterData, ...fieldValues })
    }
  }

  const onChangeField = (fieldName: string, value: string) => {
    setFilterData({
      ...filterData,
      [fieldName]: value
    })
  }

  const onChangeDatePickersField = (fieldName: string, value: string, fieldName2?: string, value2?: string) => {
    setFilterData({
      ...filterData,
      [fieldName]: value,
      ...(fieldName2 && value2 && { [fieldName2]: value2 })
    })
  }

  const onChangeFieldCopmonent = (values: RecordType) => {
    setFilterData({
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

  const filterFieldsArray = props.meta.map((field, i) => {
    if (isFilterObject(field)) {
      const { inputType, fieldName } = field
      if (inputType === TEXT || inputType === NUMBER) {
        return (
          <TextInputType
            {...field}
            key={i}
            value={filterData[fieldName]}
            isCheckeble={isCheckeble}
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
            isCheckeble={isCheckeble}
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
            isCheckeble={isCheckeble}
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
            isCheckeble={isCheckeble}
            filterValueChanged={onChangeDatePickersField}
          />
        )
      }
    } else if (field.customFilterComponent) {
      return (
        <field.customFilterComponent
          {...{
            ...field,
            key: i,
            value: filterData,
            show,
            isCheckeble,
            toggleCheckboxHandler: (fieldName: string | string[]) => toggleShow(fieldName),
            filterValueChanged: onChangeFieldCopmonent
          }}
        />
      )
    }

    return null
  })

  const filterContent = isCheckeble ? (
    filterFieldsArray
  ) : (
    <Form
      hideRequiredMark
      {...(props.isModalView && { style: { overflowY: "scroll", padding: "10px" } })}
      layout="horizontal"
      initialValues={filterData}
      onValuesChange={(newValues) => setFilterData({ ...filterData, ...newValues })}
    >
      <Row>
        {filterFieldsArray
          .filter((field, index) => {
            if (showLess && index < 5) return true
            return !showLess
          })
          .map((field) => (
            <Col span={12}>{field}</Col>
          ))}
      </Row>
    </Form>
  )

  return (
    <Col
      className={props.visible ? `gutter-row ${styles.offeringFilter}` : "hidden"}
      xs={24}
      sm={24}
      md={props.isModalView ? (!isCheckeble ? 24 : 12) : 6}
    >
      {isCheckeble && props.hideFilters && (
        <Row>
          <Col span={12}>
            <Title level={4}>{props.title}</Title>
          </Col>
          <Col span={12} className={styles.padding5px}>
            <CloseOutlined onClick={props.hideFilters} style={{ fontSize: "20px", color: "black", float: "right" }} />
          </Col>
        </Row>
      )}

      {filterContent}

      <Row justify="end" gutter={[8, 8]}>
        {!isCheckeble && (
          <Col>
            <Button onClick={() => setShowLess(!showLess)}>{showLess ? "Show More" : "Show Less"}</Button>
          </Col>
        )}
        <Col>
          <Button
            type="primary"
            aria-label="Apply Filter"
            // className={styles.applyBtn}
            onClick={() => {
              const filterCount = Object.keys(filterData).filter(
                (key) => filterData[key] !== "" && filterData[key] !== "*"
              ).length

              const params: { [key: string]: any } = filterData
              console.log("filterData ", JSON.stringify(filterData))
              const objectKeys = Object.keys(params)
              objectKeys.forEach((key) => {
                if (
                  params[key] === undefined ||
                  params[key] === null ||
                  params[key] === "" ||
                  params[key] === "0" ||
                  params[key] === 0
                ) {
                  delete params[key]
                }
                // if (!isNaN(Number(params[key] && !Array.isArray(params[key])))) {
                //   params[key] = Number(params[key])
                // }
              })
              console.log("params ", JSON.stringify(params))
              props.onApplyChanges(params, filterCount)
            }}
          >
            Apply
          </Button>
        </Col>
      </Row>
    </Col>
  )
}
