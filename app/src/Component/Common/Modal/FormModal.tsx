import { IApiResponse } from "@packages/api/lib/utils/Interfaces"
import React, { useState } from "react"
import Modal from "~/Component/Common/Modal/index2"
import zIndex from "~/utils/zIndex"
import {
  BOOLEAN,
  DATE_PICKER,
  DATE_PICKERS,
  DROPDOWN,
  IFilterField,
  isFilterObject,
  MULTI_SELECT_DROPDOWN,
  NUMBER,
  TEXT
} from "~/Component/Common/SearchFilters/common"
import { Button, Col, Form, Row, Typography } from "antd"
import { SearchInputType } from "~/Component/Common/SearchFilters/SearchInput"
import { BooleanInputType } from "~/Component/Common/SearchFilters/SearchBooleanInput"
import { DropDownInputType } from "~/Component/Common/SearchFilters/SearchDropDown"
import { MultiSelectDropDownInputType } from "~/Component/Common/SearchFilters/SearchMultiSelectDropDown"
import { DatePickerInputType } from "~/Component/Common/SearchFilters/SearchDatePicker"
import { DatePickersInputType } from "~/Component/Common/SearchFilters/SearchDatePickers"
import { eventBus } from "~/utils/EventBus"
import FormError from "~/Component/Common/Form/FormError"
import { ISimplifiedApiErrorMessage } from "@packages/api/lib/utils/HandleResponse/ProcessedApiError"

export const FormModal = (props: {
  title: string
  meta: IFilterField[]
  initialFilter?: { [key: string]: any }
  defaultFilter?: { [key: string]: any }
  formSubmitApi: (Params: any) => Promise<IApiResponse>
  closeModal: () => void
  refreshEventAfterFormSubmission?: string
}) => {
  const [formInstance] = Form.useForm()
  const [clearTrigger, setClearTrigger] = useState(false)
  const [error, setError] = useState<Array<ISimplifiedApiErrorMessage>>()
  const clearParams = () => {
    Object.keys(formInstance.getFieldsValue()).forEach((key) => formInstance.setFieldsValue({ [key]: undefined }))
    setClearTrigger(!clearTrigger)
  }

  const submit = () => {
    const params: { [key: string]: any } = formInstance.getFieldsValue()
    for (const key in params) {
      if (key === "" || !params[key] || key.includes("____")) delete params[key]
    }
    props.formSubmitApi(params).then((x) => {
      setError([])
      if (x.success) {
        props.refreshEventAfterFormSubmission && eventBus.publish(props.refreshEventAfterFormSubmission)
        closeModal()
      } else {
        setError(x.error)
      }
    })
  }

  const closeModal = () => {
    clearParams()
    props.closeModal()
  }

  return (
    <Modal width="1000px" zIndex={zIndex.defaultModal}>
      <Form
        hideRequiredMark
        style={{ overflowY: "scroll", padding: "10px", backgroundColor: "#FFF" }}
        layout="horizontal"
        initialValues={props.initialFilter}
        form={formInstance}
      >
        <FormError errorMessages={error} />
        <Row>
          <Typography.Title level={4}>{props.title}</Typography.Title>
          <hr style={{ width: "100%", marginBottom: "50px" }} />
        </Row>
        <Row>
          <>
            {props.meta.map((field, i) => {
              if (isFilterObject(field)) {
                switch (field.inputType) {
                  case TEXT:
                  case NUMBER:
                    return (
                      <Col key={1000 + i} lg={12} md={12} sm={12} xs={24}>
                        <SearchInputType {...field} key={i} formInstance={formInstance} />
                      </Col>
                    )
                  case BOOLEAN:
                    return (
                      <Col key={1000 + i} lg={12} md={12} sm={12} xs={24}>
                        <BooleanInputType {...field} key={i} formInstance={formInstance} />
                      </Col>
                    )
                  case DROPDOWN:
                    return (
                      <Col key={1000 + i} lg={12} md={12} sm={12} xs={24}>
                        <DropDownInputType {...field} key={i} formInstance={formInstance} />
                      </Col>
                    )
                  case MULTI_SELECT_DROPDOWN:
                    return (
                      <Col key={1000 + i} lg={12} md={12} sm={12} xs={24}>
                        <MultiSelectDropDownInputType {...field} key={i} formInstance={formInstance} />
                      </Col>
                    )
                  case DATE_PICKER:
                    return (
                      <Col key={1000 + i} lg={12} md={12} sm={12} xs={24}>
                        <DatePickerInputType
                          {...field}
                          key={i}
                          formInstance={formInstance}
                          clearTrigger={clearTrigger}
                        />
                      </Col>
                    )
                  case DATE_PICKERS:
                    return (
                      <Col key={1000 + i} lg={12} md={12} sm={12} xs={24}>
                        <DatePickersInputType
                          {...field}
                          key={i}
                          formInstance={formInstance}
                          clearTrigger={clearTrigger}
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
                        formInstance: formInstance,
                        clearTrigger: clearTrigger
                      }}
                    />
                  </Col>
                )
              }
              return null
            })}
          </>
        </Row>
        <Row justify="end" gutter={[8, 8]}>
          <Col>
            <Button onClick={closeModal}>Cancel</Button>
          </Col>
          <Col>
            <Button danger type="primary" onClick={clearParams}>
              Clear
            </Button>
          </Col>
          <Col>
            <Button onClick={submit}>Submit</Button>
          </Col>
        </Row>
      </Form>
    </Modal>
  )
}
