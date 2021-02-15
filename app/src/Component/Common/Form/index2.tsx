import styles from "~/Component/Common/Form/SearchFilters.module.scss"
import { Button, Card, Col, Form, Row } from "antd"
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
  CUSTOM_FIELD,
  MULTI_SELECT_CHECKBOX,
  MULTI_RADIO
} from "~/Component/Common/Form/common"
import { FormInput } from "~/Component/Common/Form/FormInput"
import { FormDropDown } from "~/Component/Common/Form/FormDropDown"
import { FormMultiSelectDropDown } from "~/Component/Common/Form/FormMultiSelectDropDown"
import { FormDatePicker } from "~/Component/Common/Form/FormDatePicker"
import { FormDatePickers } from "~/Component/Common/Form/FormDatePickers"
import { FormCheckbox } from "~/Component/Common/Form/FormCheckbox"
import { querystringToObject } from "~/utils/QueryStringToObjectConverter"
import { objectToQueryString } from "~/utils/ObjectToQueryStringConverter"
import { FormInstance } from "antd/lib/form"
import { FormMultipleCheckbox } from "~/Component/Common/Form/FormMultipleCheckbox"
import { FormMultipleRadio } from "~/Component/Common/Form/FormMultipleRadio"
import { ISimplifiedApiErrorMessage } from "@packages/api/lib/utils/HandleResponse/ProcessedApiError"
import { FormError } from "~/Component/Common/Form/FormError"

interface IFilterColumnProps {
  meta: IField[]
  title: string
  loading: boolean
  onApplyChanges: (newValues: { [key: string]: any }, appliedFilterCount: number) => void
  hideFilters?: () => void
  initialFormValue?: { [key: string]: any }
  defaultFormValue?: { [key: string]: any }
  showClearbutton?: boolean
  applyButtonLabel?: string
  clearButtonLabel?: string
  isHorizontal?: boolean
  closeModal?: () => void
  stopProducingQueryParams?: boolean
  errorMessages?: Array<ISimplifiedApiErrorMessage>
}

export function CustomForm({
  showClearbutton = false,
  applyButtonLabel = "Search",
  clearButtonLabel = "Clear",
  ...props
}: IFilterColumnProps) {
  const [formInstance] = Form.useForm()
  const [showLess, setShowLess] = useState(true)
  const [clearTrigger, setClearTrigger] = useState(false)
  const [meta, setMeta] = useState<IField[]>([])

  const checkValidationOnCustomFormFields = (values: { [key: string]: any }): boolean => {
    let validationPassed = true
    const __meta = meta.map((x: IField) => {
      const rules: Array<{ [key: string]: any }> = x.rules as Array<{ [key: string]: any }>
      const rulesExist = !!(rules && rules.length > 0)
      const certainInputType: boolean = x.inputType === CUSTOM_FIELD || x.inputType === DATE_PICKERS
      if (!rulesExist || !certainInputType) return x

      const rulesRequired = !!rules?.find((rule: any) => rule && rule.required)
      if (certainInputType && rulesExist && rulesRequired) {
        const validationForSelectorComponent =
          x.fieldName === "" &&
          x?.extraProps &&
          Array.isArray(x?.extraProps?.selectorKeys) &&
          x?.extraProps?.selectorKeys.length > 0 &&
          x?.extraProps?.selectorKeys.filter(
            (field: { [key: string]: any }) => !!values[field.fieldName] || !!values[field.fieldName2]
          ).length === 0

        const validationForOtherCustomComponent =
          x.fieldName !== "" && (values[x.fieldName] === undefined || values[x.fieldName] === null)

        const validationForDatePickersComponent =
          (!!x.fieldName &&
            !!(values[x.fieldName] === undefined || values[x.fieldName] === null || values[x.fieldName] === "")) ||
          (!!x.fieldName2 &&
            !!(values[x.fieldName2] === undefined || values[x.fieldName2] === null || values[x.fieldName2] === ""))

        if (validationForSelectorComponent) {
          x.validateStatus = "error"
          x.help = rules?.filter((rule: any) => rule.required)[0]?.message
          validationPassed = false
        } else if (validationForOtherCustomComponent || validationForDatePickersComponent) {
          x.validateStatus = "error"
          x.help = rules?.filter((rule: any) => rule.required)[0]?.message
          validationPassed = false
        } else {
          x.validateStatus = ""
          x.help = ""
        }
      }
      // console.log(
      //   "x || rulesExist || certainInputType || rulesRequired",
      //   x,
      //   rulesExist,
      //   certainInputType,
      //   rulesRequired
      // )
      return x
    })
    setMeta(__meta)
    return validationPassed
  }

  const applyChanges = (queryParams?: { [key: string]: any }) => {
    const isCustomFormFieldValuesValid: boolean = checkValidationOnCustomFormFields(formInstance.getFieldsValue())
    formInstance
      .validateFields()
      .then((validatedValues) => {
        // console.log("validatedValues ", validatedValues)
        if (!isCustomFormFieldValuesValid) return
        // console.log(validatedValues)
        const params: { [key: string]: any } = queryParams || validatedValues
        const mergedParams: { [key: string]: any } = { ...params, ...props.defaultFormValue }
        for (const key in mergedParams) {
          if (key === "" || mergedParams[key] === undefined || mergedParams[key] === null || key.includes("____"))
            delete mergedParams[key]
        }
        const filterCount = Object.keys(mergedParams).length
        props.onApplyChanges(mergedParams, filterCount)

        if (!props.stopProducingQueryParams) {
          const _queryString = objectToQueryString(Object.keys(params).length > 0 ? params : null)
          window.history && window.history.pushState({}, "", _queryString)
        }
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
    if (updateMeta && !props.stopProducingQueryParams) {
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
      if (props.closeModal) setShowLess(false)
      setMeta(props.meta)
    }

    // eslint-disable-next-line
  }, [])

  return (
    <Card
      title={props.title}
      loading={props.loading}
      actions={[
        <Row justify="end" gutter={[8, 8]} style={{ marginRight: "10px" }}>
          {!props.closeModal && meta.length > 4 && (
            <Col>
              <Button onClick={() => setShowLess(!showLess)}>{showLess ? "Show More" : "Show Less"}</Button>
            </Col>
          )}
          {props.closeModal && (
            <Col>
              <Button type="primary" aria-label="Cancel" danger onClick={() => props.closeModal && props.closeModal()}>
                Cancel
              </Button>
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
      ]}
    >
      <Col className={`gutter-row ${styles.offeringFilter}`} xs={24} sm={24} md={24}>
        <Form
          layout="horizontal"
          initialValues={props.initialFormValue}
          form={formInstance}
          scrollToFirstError
          style={{
            maxHeight: "80vh",
            overflowY: "scroll"
          }}
        >
          <FormError errorMessages={props.errorMessages} />
          <SearchFormFields
            meta={props.meta}
            isHorizontal={props.isHorizontal}
            formInstance={formInstance}
            clearTrigger={clearTrigger}
            showLess={showLess}
          />
        </Form>
      </Col>
    </Card>
  )
}

const SearchFormFields = (props: {
  meta: IField[]
  formInstance: FormInstance
  clearTrigger?: boolean
  showLess: boolean
  isHorizontal?: boolean
}) => {
  return (
    <Row>
      {props.meta
        .filter((field, index) => {
          if (props.showLess && index < 4) return true
          return !props.showLess
        })
        .map((field, i) => {
          const lg = props.isHorizontal ? 24 : 12
          const md = props.isHorizontal ? 24 : 12
          const sm = props.isHorizontal ? 24 : 12
          const xs = 24

          switch (field.inputType) {
            case TEXT:
            case NUMBER:
              return (
                <Col key={1000 + i} lg={lg} md={md} sm={sm} xs={xs}>
                  <FormInput {...field} key={i} formInstance={props.formInstance} />
                </Col>
              )
            case BOOLEAN:
              return (
                <Col key={1000 + i} lg={lg} md={md} sm={sm} xs={xs}>
                  <FormCheckbox {...field} key={i} formInstance={props.formInstance} />
                </Col>
              )
            case MULTI_SELECT_CHECKBOX:
              return (
                <Col key={1000 + i} lg={lg} md={md} sm={sm} xs={xs}>
                  <FormMultipleCheckbox {...field} key={i} formInstance={props.formInstance} />
                </Col>
              )
            case MULTI_RADIO:
              return (
                <Col key={1000 + i} lg={lg} md={md} sm={sm} xs={xs}>
                  <FormMultipleRadio {...field} key={i} formInstance={props.formInstance} />
                </Col>
              )
            case DROPDOWN:
              return (
                <Col key={1000 + i} lg={lg} md={md} sm={sm} xs={xs}>
                  <FormDropDown {...field} key={i} formInstance={props.formInstance} />
                </Col>
              )
            case MULTI_SELECT_DROPDOWN:
              return (
                <Col key={1000 + i} lg={lg} md={md} sm={sm} xs={xs}>
                  <FormMultiSelectDropDown {...field} key={i} formInstance={props.formInstance} />
                </Col>
              )
            case DATE_PICKER:
              return (
                <Col key={1000 + i} lg={lg} md={md} sm={sm} xs={xs}>
                  <FormDatePicker
                    {...field}
                    key={i}
                    formInstance={props.formInstance}
                    clearTrigger={props.clearTrigger}
                  />
                </Col>
              )
            case DATE_PICKERS:
              return (
                <Col key={1000 + i} lg={lg} md={md} sm={sm} xs={xs}>
                  <FormDatePickers
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
                  <Col key={1000 + i} lg={lg} md={md} sm={sm} xs={xs}>
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
