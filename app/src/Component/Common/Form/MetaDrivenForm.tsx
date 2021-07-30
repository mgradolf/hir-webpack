import styles from "~/Component/Common/Form/SearchFilters.module.scss"
import { Button, Card, Col, Form, Row } from "antd"
import React, { useEffect, useState } from "react"
import {
  IField,
  DATE_PICKER,
  DATE_PICKERS,
  DROPDOWN,
  MULTI_SELECT_DROPDOWN,
  NUMBER,
  TEXT,
  BOOLEAN,
  CUSTOM_FIELD,
  MULTI_SELECT_CHECKBOX,
  TEXTAREA,
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
import { FormTextArea } from "~/Component/Common/Form/FormTextArea"
import { FormNumberInput } from "~/Component/Common/Form/FormNumberInput"
import { processFormMetaWithUserMetaConfig } from "~/Component/Common/Form/FormMetaShadowingProcessor"
import { eventBus } from "~/utils/EventBus"
import { generateUUID } from "~/utils/UUID"
import { HelpButton } from "./Buttons/HelpButton"

export function MetaDrivenForm({
  showClearbutton = true,
  applyButtonLabel = "Search",
  clearButtonLabel = "Clear",
  ...props
}: {
  meta: IField[]
  metaName?: string
  title?: React.ReactNode
  helpkey?: string
  loading?: boolean
  isModal?: boolean
  onApplyChanges: (newValues: { [key: string]: any }, appliedFilterCount: number) => void
  initialFormValue?: { [key: string]: any }
  defaultFormValue?: { [key: string]: any }
  showClearbutton?: boolean
  applyButtonLabel?: string
  clearButtonLabel?: string
  isHorizontal?: boolean
  closeModal?: () => void
  stopProducingQueryParams?: boolean
  errorMessages?: Array<ISimplifiedApiErrorMessage>
}) {
  const [formInstance] = Form.useForm()
  const [showLess, setShowLess] = useState(true)
  const [clearTrigger, setClearTrigger] = useState(false)
  const [meta, setMeta] = useState<IField[]>([])
  const REFRESH_EVENT_NAME = generateUUID("REFRESH")

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
          if (key === "" || mergedParams[key] === undefined || mergedParams[key] === null || key.includes("__"))
            delete mergedParams[key]
        }
        const filterCount = Object.keys(mergedParams).length
        props.onApplyChanges(mergedParams, filterCount)

        if (!props.stopProducingQueryParams) {
          // console.log("props.stopProducingQueryParams ", props.stopProducingQueryParams)
          console.log("_mergedParams ", mergedParams)
          const _queryString = objectToQueryString(Object.keys(mergedParams).length > 0 ? mergedParams : null)
          // console.log("_queryString ", _queryString, mergedParams)
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

  const processMeta = () => {
    let _meta: IField[] = props.meta
    const queryParams: { [key: string]: any } = {
      ...props.initialFormValue,
      ...(!props.stopProducingQueryParams && querystringToObject())
    }
    const updateMeta = queryParams && Object.keys(queryParams).length > 0

    if (updateMeta) {
      setShowLess(false)
      formInstance.setFieldsValue(queryParams)
      _meta = props.meta.map((x) => {
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
      applyChanges(queryParams)
    } else if (props.closeModal) {
      setShowLess(false)
    }
    processFormMetaWithUserMetaConfig(_meta, props.metaName || "").then(setMeta)
  }

  useEffect(() => {
    eventBus.subscribe(REFRESH_EVENT_NAME, processMeta)
    eventBus.publish(REFRESH_EVENT_NAME)
    return () => {
      clearParams()
      eventBus.unsubscribe(REFRESH_EVENT_NAME)
    }
    // eslint-disable-next-line
  }, [props.meta, props.metaName])

  return (
    <Card
      title={
        <Row justify="space-between">
          <Col>{props.title}</Col>
          <Col>
            <HelpButton helpKey={props.helpkey} />
          </Col>
        </Row>
      }
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
              <Button
                type="ghost"
                aria-label="Cancel"
                danger
                onClick={() => {
                  formInstance.resetFields()
                  props.closeModal && props.closeModal()
                }}
              >
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
          {...(props.isModal && {
            style: {
              maxHeight: "66vh",
              overflowY: "scroll"
            }
          })}
        >
          <FormError errorMessages={props.errorMessages} />
          <SearchFormFields
            meta={meta}
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
    <Row gutter={16}>
      {props.meta
        .filter((field) => !field.hidden)
        .filter((field, index) => {
          if (props.showLess && index < 4) return true
          return !props.showLess
        })
        .map((field, i) => {
          let formField: any

          switch (field.inputType) {
            case TEXT:
              formField = (
                <FormInput {...field} key={i} formInstance={props.formInstance} labelColSpan={8} wrapperColSpan={24} />
              )
              break
            case NUMBER:
              formField = (
                <FormNumberInput
                  {...field}
                  key={i}
                  formInstance={props.formInstance}
                  labelColSpan={8}
                  wrapperColSpan={24}
                />
              )
              break
            case TEXTAREA:
              formField = (
                <FormTextArea
                  {...field}
                  key={i}
                  formInstance={props.formInstance}
                  labelColSpan={8}
                  wrapperColSpan={24}
                />
              )
              break
            case BOOLEAN:
              formField = (
                <FormCheckbox
                  {...field}
                  key={i}
                  formInstance={props.formInstance}
                  labelColSpan={8}
                  wrapperColSpan={24}
                />
              )
              break
            case MULTI_SELECT_CHECKBOX:
              formField = (
                <FormMultipleCheckbox
                  {...field}
                  key={i}
                  formInstance={props.formInstance}
                  labelColSpan={8}
                  wrapperColSpan={24}
                />
              )
              break
            case MULTI_RADIO:
              formField = (
                <FormMultipleRadio
                  {...field}
                  key={i}
                  formInstance={props.formInstance}
                  labelColSpan={8}
                  wrapperColSpan={24}
                />
              )
              break
            case DROPDOWN:
              formField = (
                <FormDropDown
                  {...field}
                  key={i}
                  formInstance={props.formInstance}
                  labelColSpan={8}
                  wrapperColSpan={24}
                />
              )
              break
            case MULTI_SELECT_DROPDOWN:
              formField = (
                <FormMultiSelectDropDown
                  {...field}
                  key={i}
                  formInstance={props.formInstance}
                  labelColSpan={8}
                  wrapperColSpan={24}
                />
              )
              break
            case DATE_PICKER:
              formField = (
                <FormDatePicker
                  {...field}
                  key={i}
                  formInstance={props.formInstance}
                  clearTrigger={props.clearTrigger}
                  labelColSpan={8}
                  wrapperColSpan={24}
                />
              )
              break
            case DATE_PICKERS:
              formField = (
                <FormDatePickers
                  {...field}
                  key={i}
                  formInstance={props.formInstance}
                  clearTrigger={props.clearTrigger}
                  labelColSpan={8}
                  wrapperColSpan={24}
                />
              )
              break
            case CUSTOM_FIELD:
              if (field.customFilterComponent) {
                formField = (
                  <field.customFilterComponent
                    {...{
                      ...field,
                      key: i,
                      formInstance: props.formInstance,
                      clearTrigger: props.clearTrigger
                    }}
                    labelColSpan={8}
                    wrapperColSpan={24}
                  />
                )
              }
              break
            default:
              break
          }

          const lg = props.isHorizontal ? 24 : 12
          const md = props.isHorizontal ? 24 : 12
          const sm = props.isHorizontal ? 24 : 12
          const xs = 24
          return (
            <Col key={1000 + i} lg={lg} md={md} sm={sm} xs={xs}>
              {formField}
            </Col>
          )
        })}
    </Row>
  )
}
