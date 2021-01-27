import styles from "~/Component/Common/SearchForm/SearchFilters.module.scss"
import { Button, Col, Form, Row } from "antd"
import React, { useEffect, useState } from "react"
import {
  DATE_PICKER,
  DATE_PICKERS,
  DROPDOWN,
  MULTI_SELECT_DROPDOWN,
  NUMBER,
  TEXT,
  BOOLEAN,
  IField,
  CUSTOM_FIELD
} from "~/Component/Common/SearchForm/common"
import { SearchInputType } from "~/Component/Common/SearchForm/SearchInput"
import { DropDownInputType } from "~/Component/Common/SearchForm/SearchDropDown"
import { MultiSelectDropDownInputType } from "~/Component/Common/SearchForm/SearchMultiSelectDropDown"
import { DatePickerInputType } from "~/Component/Common/SearchForm/SearchDatePicker"
import { DatePickersInputType } from "~/Component/Common/SearchForm/SearchDatePickers"
import { BooleanInputType } from "~/Component/Common/SearchForm/SearchBooleanInput"
import { querystringToObject } from "~/utils/QueryStringToObjectConverter"
import { objectToQueryString } from "~/utils/ObjectToQueryStringConverter"
import { FormInstance } from "antd/lib/form"

interface IFilterColumnProps {
  meta: IField[]
  onApplyChanges: (newValues: { [key: string]: any }, appliedFilterCount: number) => void
  hideFilters?: () => void
  initialFilter?: { [key: string]: any }
  defaultFilter?: { [key: string]: any }
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
  const [clearTrigger, setClearTrigger] = useState(false)
  const [meta, setMeta] = useState<IField[]>([])

  const validationPassed = (values: { [key: string]: any }): boolean => {
    let validationPassed = true
    const __meta = meta.map((x) => {
      const rules: Array<{ [key: string]: any }> = x.rules as Array<{ [key: string]: any }>
      const rulesExist = !!(rules && rules.length > 0)
      const certainInputType: boolean = x.inputType === CUSTOM_FIELD || x.inputType === DATE_PICKERS
      if (!rulesExist || !certainInputType) return x

      const rulesRequired = !!rules?.find((rule: any) => rule && rule.required)
      const fieldValue: boolean = values[x.fieldName] === undefined || values[x.fieldName] === null
      const fieldValue2: boolean = values[x.fieldName] === undefined || values[x.fieldName] === null
      if (certainInputType && rulesExist && rulesRequired) {
        if (fieldValue || fieldValue2) {
          x.validateStatus = "error"
          x.help = rules?.filter((rule: any) => rule.required)[0]?.message
          validationPassed = false
        } else {
          x.validateStatus = ""
          x.help = ""
        }
      }
      console.log(
        "x || rulesExist || certainInputType || rulesRequired",
        x,
        rulesExist,
        certainInputType,
        rulesRequired
      )
      return x
    })
    setMeta(__meta)
    return validationPassed
  }

  const applyChanges = (queryParams?: { [key: string]: any }) => {
    const validationFailed: boolean = validationPassed(formInstance.getFieldsValue())
    formInstance
      .validateFields()
      .then((validatedValues) => {
        if (!validationFailed) return
        console.log(validatedValues)
        const params: { [key: string]: any } = queryParams || validatedValues
        const mergedParams: { [key: string]: any } = { ...params, ...props.defaultFilter }
        for (const key in mergedParams) {
          if (key === "" || mergedParams[key] === undefined || mergedParams[key] === null || key.includes("____"))
            delete mergedParams[key]
        }
        const filterCount = Object.keys(mergedParams).length
        props.onApplyChanges(mergedParams, filterCount)

        const _queryString = objectToQueryString(Object.keys(params).length > 0 ? params : null)
        window.history && window.history.pushState({}, "", _queryString)
      })
      .catch((validationError) => {
        console.log("validationError ", validationError)
      })
  }

  const clearParams = () => {
    Object.keys(formInstance.getFieldsValue()).forEach((key) => formInstance.setFieldsValue({ [key]: undefined }))
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
    const updateMeta = queryParams && Object.keys(queryParams).length > 0
    if (updateMeta) {
      setShowLess(false)
      formInstance.setFieldsValue(queryParams)
      const _meta = props.meta.map((x) => {
        x.defaultValue = queryParams[x.fieldName]
        x.defaultValue2 = x.fieldName2 ? queryParams[x.fieldName2] : undefined
        if (x.extraProps && Array.isArray(x.extraProps.selectorKeys)) {
          x.extraProps.selectorKeys = x.extraProps.selectorKeys.map((y) => {
            y.defaultValue = queryParams[y.fieldName]
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
    <Col className={`gutter-row ${styles.offeringFilter}`} xs={24} sm={24} md={24}>
      <Form
        // {...(props.isModalView && { style: { overflowY: "scroll", padding: "10px" } })}
        layout="horizontal"
        initialValues={props.initialFilter}
        form={formInstance}
        scrollToFirstError
      >
        <SearchFormFields
          meta={props.meta}
          formInstance={formInstance}
          clearTrigger={clearTrigger}
          showLess={showLess}
        />
      </Form>
      <Row justify="end" gutter={[8, 8]}>
        {meta.length > 4 && (
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
  meta: IField[]
  formInstance: FormInstance
  clearTrigger?: boolean
  showLess: boolean
}) => {
  useEffect(() => {
    console.log("SearchFormFields ", props.meta)
  }, [props.meta])
  return (
    <Row>
      {props.meta
        .filter((field, index) => {
          if (props.showLess && index < 4) return true
          return !props.showLess
        })
        .map((field, i) => {
          switch (field.inputType) {
            case TEXT:
            case NUMBER:
              return (
                <Col key={1000 + i} lg={12} md={12} sm={12} xs={24}>
                  <SearchInputType {...field} key={i} formInstance={props.formInstance} />
                </Col>
              )
            case BOOLEAN:
              return (
                <Col key={1000 + i} lg={12} md={12} sm={12} xs={24}>
                  <BooleanInputType {...field} key={i} formInstance={props.formInstance} />
                </Col>
              )
            case DROPDOWN:
              return (
                <Col key={1000 + i} lg={12} md={12} sm={12} xs={24}>
                  <DropDownInputType {...field} key={i} formInstance={props.formInstance} />
                </Col>
              )
            case MULTI_SELECT_DROPDOWN:
              return (
                <Col key={1000 + i} lg={12} md={12} sm={12} xs={24}>
                  <MultiSelectDropDownInputType {...field} key={i} formInstance={props.formInstance} />
                </Col>
              )
            case DATE_PICKER:
              return (
                <Col key={1000 + i} lg={12} md={12} sm={12} xs={24}>
                  <DatePickerInputType
                    {...field}
                    key={i}
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
                    formInstance={props.formInstance}
                    clearTrigger={props.clearTrigger}
                  />
                </Col>
              )
            case CUSTOM_FIELD:
              if (field.customFilterComponent) {
                return (
                  <Col key={1000 + i} lg={12} md={12} sm={12} xs={24}>
                    <field.customFilterComponent
                      {...{
                        ...field,
                        key: i,
                        formInstance: props.formInstance,
                        clearTrigger: props.clearTrigger
                      }}
                    />
                  </Col>
                )
              }
              break
            default:
              break
          }
          return null
        })}
    </Row>
  )
}
