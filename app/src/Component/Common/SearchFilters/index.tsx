import styles from "~/Component/Common/SearchFilters/SearchFilters.module.scss"
import { Button, Col, Form, Row, Typography } from "antd"
import { CloseOutlined } from "@ant-design/icons"
import React, { useState } from "react"
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
  onApplyChanges: (newValues: { [key: string]: any }, appliedFilterCount: number) => void
  initialFilter: { [key: string]: string }
  isModalView: boolean
  isCheckeble?: boolean
  showClearbutton?: boolean
}

type Show = { [key: string]: boolean }

export default function ({ showClearbutton = true, ...props }: IFilterColumnProps) {
  const [formInstance] = Form.useForm()
  const [showLess, setShowLess] = useState(true)
  const isCheckeble = props.isCheckeble === undefined ? true : props.isCheckeble

  const filterFieldsArray = props.meta.map((field, i) => {
    if (isFilterObject(field)) {
      switch (field.inputType) {
        case TEXT:
        case NUMBER:
          return <TextInputType {...field} key={i} isCheckeble={isCheckeble} formInstance={formInstance} />
        case DROPDOWN:
          return <DropDownInputType {...field} key={i} isCheckeble={isCheckeble} formInstance={formInstance} />
        case DATE_PICKER:
          return <DatePickerInputType {...field} key={i} isCheckeble={isCheckeble} formInstance={formInstance} />
        case DATE_PICKERS:
          return <DatePickersInputType {...field} key={i} isCheckeble={isCheckeble} formInstance={formInstance} />
        default:
          return null
      }
    } else if (field.customFilterComponent) {
      return (
        <field.customFilterComponent
          {...{
            ...field,
            key: i,
            isCheckeble,
            formInstance
          }}
        />
      )
    }
    return null
  })

  const filterContent = isCheckeble ? (
    <Form form={formInstance}>filterFieldsArray</Form>
  ) : (
    <Form
      hideRequiredMark
      {...(props.isModalView && { style: { overflowY: "scroll", padding: "10px" } })}
      layout="horizontal"
      initialValues={props.initialFilter}
      form={formInstance}
    >
      <Row>
        {filterFieldsArray
          .filter((field, index) => {
            if (showLess && index < 4) return true
            return !showLess
          })
          .map((field, i) => (
            <Col key={i + 10000} lg={12} md={12} sm={12} xs={24}>
              {field}
            </Col>
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
        {!isCheckeble && filterFieldsArray.length > 4 && (
          <Col>
            <Button onClick={() => setShowLess(!showLess)}>{showLess ? "Show More" : "Show Less"}</Button>
          </Col>
        )}
        {showClearbutton && (
          <Col>
            <Button
              danger
              type="primary"
              onClick={() => {
                formInstance.resetFields()
                const filterCount = Object.keys(props.initialFilter).length
                console.log("initial filter params ", JSON.stringify(props.initialFilter), filterCount)
                props.onApplyChanges(props.initialFilter, filterCount)
              }}
            >
              Clear
            </Button>
          </Col>
        )}
        <Col>
          <Button
            type="primary"
            aria-label="Apply Filter"
            onClick={() => {
              const params: { [key: string]: any } = formInstance.getFieldsValue()
              const filterCount = Object.keys(params).length
              console.log("params ", JSON.stringify(params), filterCount)
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
