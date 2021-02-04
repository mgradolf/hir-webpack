import styles from "~/Component/Common/Form/SearchFilters.module.scss"
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

interface IFilterColumnProps {
  meta: IField[]
  onApplyChanges: (newValues: { [key: string]: any }, appliedFilterCount: number) => void
  hideFilters?: () => void
  initialFormValue?: { [key: string]: any }
  defaultFormValue?: { [key: string]: any }
  showClearbutton?: boolean
  applyButtonLabel?: string
  clearButtonLabel?: string
  closeModal?: () => void
  stopProducingQueryParams?: boolean
}

export function CustomForm({
  showClearbutton = true,
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
          x.fieldName !== "" &&
          (values[x.fieldName] === undefined ||
            values[x.fieldName] === null ||
            (!!x.fieldName2 && !!(values[x.fieldName2] === undefined || values[x.fieldName2] === null)))

        // console.log("validationForSelectorComponent ", validationForSelectorComponent)
        // console.log("validationForOtherCustomComponent ", validationForOtherCustomComponent)
        if (validationForSelectorComponent) {
          x.validateStatus = "error"
          x.help = rules?.filter((rule: any) => rule.required)[0]?.message
          validationPassed = false
        } else if (validationForOtherCustomComponent) {
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
    <Col className={`gutter-row ${styles.offeringFilter}`} xs={24} sm={24} md={24}>
      <Form layout="horizontal" initialValues={props.initialFormValue} form={formInstance} scrollToFirstError>
        <SearchFormFields
          meta={props.meta}
          formInstance={formInstance}
          clearTrigger={clearTrigger}
          showLess={showLess}
        />
      </Form>
      <Row justify="end" gutter={[8, 8]}>
        {!props.closeModal && meta.length > 4 && (
          <Col>
            <Button onClick={() => setShowLess(!showLess)}>{showLess ? "Show More" : "Show Less"}</Button>
          </Col>
        )}
        {props.closeModal && (
          <Col>
            <Button type="ghost" aria-label="Cancel" danger onClick={() => props.closeModal && props.closeModal()}>
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
    </Col>
  )
}

const SearchFormFields = (props: {
  meta: IField[]
  formInstance: FormInstance
  clearTrigger?: boolean
  showLess: boolean
}) => {
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
                  <FormInput {...field} key={i} formInstance={props.formInstance} />
                </Col>
              )
            case BOOLEAN:
              return (
                <Col key={1000 + i} lg={12} md={12} sm={12} xs={24}>
                  <FormCheckbox {...field} key={i} formInstance={props.formInstance} />
                </Col>
              )
            case DROPDOWN:
              return (
                <Col key={1000 + i} lg={12} md={12} sm={12} xs={24}>
                  <FormDropDown {...field} key={i} formInstance={props.formInstance} />
                </Col>
              )
            case MULTI_SELECT_DROPDOWN:
              return (
                <Col key={1000 + i} lg={12} md={12} sm={12} xs={24}>
                  <FormMultiSelectDropDown {...field} key={i} formInstance={props.formInstance} />
                </Col>
              )
            case DATE_PICKER:
              return (
                <Col key={1000 + i} lg={12} md={12} sm={12} xs={24}>
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
                <Col key={1000 + i} lg={12} md={12} sm={12} xs={24}>
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
