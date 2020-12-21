import styles from "~/Component/Common/SearchFilters/SearchFilters.module.scss"
import { Button, Col, Form, Row, Typography } from "antd"
import { CloseOutlined } from "@ant-design/icons"
import React, { useEffect, useState } from "react"
import { SearchInputType } from "~/Component/Common/SearchFilters/SearchInput"
import {
  IFilterField,
  isFilterObject,
  DATE_PICKER,
  DATE_PICKERS,
  DROPDOWN,
  NUMBER,
  TEXT,
  BOOLEAN
} from "~/Component/Common/SearchFilters/common"
import { DropDownInputType } from "~/Component/Common/SearchFilters/SearchDropDown"
import { DatePickerInputType } from "~/Component/Common/SearchFilters/SearchDatePicker"
import { DatePickersInputType } from "~/Component/Common/SearchFilters/SearchDatePickers"
import { BooleanInputType } from "~/Component/Common/SearchFilters/SearchBooleanInput"
import { querystringToObject } from "~/utils/QueryStringToObjectConverter"
import { objectToQueryString } from "~/utils/ObjectToQueryStringConverter"
import { FormInstance } from "antd/lib/form"

const { Title } = Typography

interface IFilterColumnProps {
  meta: IFilterField[]
  visible: boolean
  title: string
  hideFilters?: () => void
  onApplyChanges: (newValues: { [key: string]: any }, appliedFilterCount: number) => void
  initialFilter?: { [key: string]: any }
  isModalView: boolean
  isCheckeble?: boolean
  showClearbutton?: boolean
  applyButtonLabel?: string
  clearButtonLabel?: string
}

export default function ({
  showClearbutton = true,
  applyButtonLabel = "Search",
  clearButtonLabel = "Clear",
  ...props
}: IFilterColumnProps) {
  const [formInstance] = Form.useForm()
  const [showLess, setShowLess] = useState(true)
  const isCheckeble = props.isCheckeble === undefined ? true : props.isCheckeble
  const [clearTrigger, setClearTrigger] = useState(false)
  const [meta, setMeta] = useState<IFilterField[]>([])

  const applyChanges = (queryParams?: { [key: string]: any }) => {
    const params: { [key: string]: any } = queryParams || formInstance.getFieldsValue()
    for (const key in params) {
      if (key === "" || !params[key] || key.includes("____")) delete params[key]
    }
    const filterCount = Object.keys(params).length
    props.onApplyChanges(params, filterCount)

    const _queryString = objectToQueryString(Object.keys(params).length > 0 ? params : null)
    window.history && window.history.pushState({}, "", _queryString)
  }

  const clearParams = () => {
    formInstance.resetFields()
    setClearTrigger(!clearTrigger)
    const _meta = props.meta.map((x) => {
      x.defaultValue = undefined
      x.defaultValue2 = undefined
      return x
    })
    setMeta(_meta)
  }

  useEffect(() => {
    const queryParams: { [key: string]: any } = querystringToObject()
    const updateMeta = queryParams && Object.keys(queryParams).length > 0 && !props.isModalView
    if (updateMeta) {
      setShowLess(false)
      formInstance.setFieldsValue(queryParams)
      const _meta = props.meta.map((x) => {
        x.defaultValue = queryParams[x.fieldName]
        x.defaultValue2 = x.fieldName2 ? queryParams[x.fieldName2] : undefined
        console.log(x.extraProps)
        if (x.extraProps && Array.isArray(x.extraProps.selectorKeys)) {
          x.extraProps.selectorKeys = x.extraProps.selectorKeys.map((y) => {
            y.defaultValue = queryParams[y.fieldName]
            console.log("y ", y, "  queryParams", queryParams)
            return y
          })
        }
        return x
      })
      setMeta(_meta)
      applyChanges(queryParams)
    } else {
      setMeta(props.meta)
    }

    // eslint-disable-next-line
  }, [])

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
      <SearchForm
        meta={meta}
        initialFilter={props.initialFilter}
        isCheckeble={isCheckeble}
        formInstance={formInstance}
        clearTrigger={clearTrigger}
        showLess={showLess}
      />
      <Row justify="end" gutter={[8, 8]}>
        {!isCheckeble && meta.length > 4 && (
          <Col>
            <Button onClick={() => setShowLess(!showLess)}>{showLess ? "Show More" : "Show Less"}</Button>
          </Col>
        )}
        {showClearbutton && (
          <Col>
            <Button danger type="primary" onClick={clearParams}>
              {clearButtonLabel}
            </Button>
          </Col>
        )}
        <Col>
          <Button type="primary" aria-label="Apply Filter" onClick={() => applyChanges()}>
            {applyButtonLabel}
          </Button>
        </Col>
      </Row>
    </Col>
  )
}

const SearchFormFields = (props: {
  meta: IFilterField[]
  isCheckeble: boolean
  formInstance: FormInstance
  clearTrigger?: boolean
  showLess: boolean
}) => (
  <>
    {props.meta
      .filter((field, index) => {
        if (props.showLess && index < 4) return true
        return !props.showLess
      })
      .map((field, i) => {
        if (isFilterObject(field)) {
          switch (field.inputType) {
            case TEXT:
            case NUMBER:
              return (
                <Col key={1000 + i} lg={12} md={12} sm={12} xs={24}>
                  <SearchInputType
                    {...field}
                    key={i}
                    isCheckeble={props.isCheckeble}
                    formInstance={props.formInstance}
                  />
                </Col>
              )
            case BOOLEAN:
              return (
                <Col key={1000 + i} lg={12} md={12} sm={12} xs={24}>
                  <BooleanInputType
                    {...field}
                    key={i}
                    isCheckeble={props.isCheckeble}
                    formInstance={props.formInstance}
                  />
                </Col>
              )
            case DROPDOWN:
              return (
                <Col key={1000 + i} lg={12} md={12} sm={12} xs={24}>
                  <DropDownInputType
                    {...field}
                    key={i}
                    isCheckeble={props.isCheckeble}
                    formInstance={props.formInstance}
                  />
                </Col>
              )
            case DATE_PICKER:
              return (
                <Col key={1000 + i} lg={12} md={12} sm={12} xs={24}>
                  <DatePickerInputType
                    {...field}
                    key={i}
                    isCheckeble={props.isCheckeble}
                    formInstance={props.formInstance}
                    clearTrigger={props.clearTrigger}
                  />
                </Col>
              )
            case DATE_PICKERS:
              return (
                <Col key={1000 + i} lg={12} md={12} sm={12} xs={24}>
                  <DatePickersInputType
                    {...field}
                    key={i}
                    isCheckeble={props.isCheckeble}
                    formInstance={props.formInstance}
                    clearTrigger={props.clearTrigger}
                  />
                </Col>
              )
            default:
              return null
          }
        } else if (field.customFilterComponent) {
          return (
            <Col
              key={1000 + i}
              lg={field.fullWidth ? 24 : 12}
              md={field.fullWidth ? 24 : 12}
              sm={field.fullWidth ? 24 : 12}
              xs={field.fullWidth ? 24 : 24}
            >
              <field.customFilterComponent
                {...{
                  ...field,
                  key: i,
                  isCheckeble: props.isCheckeble,
                  formInstance: props.formInstance,
                  clearTrigger: props.clearTrigger
                }}
              />
            </Col>
          )
        }
        return null
      })}
  </>
)

const SearchForm = (props: {
  isModalView?: boolean
  meta: IFilterField[]
  initialFilter?: { [key: string]: any }
  isCheckeble: boolean
  formInstance: FormInstance
  clearTrigger?: boolean
  showLess: boolean
}) =>
  props.isCheckeble ? (
    <Form initialValues={props.initialFilter} form={props.formInstance}>
      <SearchFormFields
        meta={props.meta}
        isCheckeble={props.isCheckeble}
        formInstance={props.formInstance}
        clearTrigger={props.clearTrigger}
        showLess={props.showLess}
      />
    </Form>
  ) : (
    <Form
      hideRequiredMark
      {...(props.isModalView && { style: { overflowY: "scroll", padding: "10px" } })}
      layout="horizontal"
      initialValues={props.initialFilter}
      form={props.formInstance}
    >
      <Row>
        <SearchFormFields
          meta={props.meta}
          isCheckeble={props.isCheckeble}
          formInstance={props.formInstance}
          clearTrigger={props.clearTrigger}
          showLess={props.showLess}
        />
      </Row>
    </Form>
  )
