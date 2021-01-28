import { IApiResponse } from "@packages/api/lib/utils/Interfaces"
import React, { useState } from "react"
import Modal from "~/Component/Common/Modal/index2"
import zIndex from "~/utils/zIndex"
import {
  BOOLEAN,
  CUSTOM_FIELD,
  DATE_PICKER,
  DATE_PICKERS,
  DROPDOWN,
  IField,
  MULTI_SELECT_DROPDOWN,
  NUMBER,
  TEXT
} from "~/Component/Common/Form/common"
import { Button, Card, Col, Form, Row } from "antd"
import { SearchInputType } from "~/Component/Common/Form/SearchInput"
import { BooleanInputType } from "~/Component/Common/Form/SearchBooleanInput"
import { DropDownInputType } from "~/Component/Common/Form/SearchDropDown"
import { MultiSelectDropDownInputType } from "~/Component/Common/Form/SearchMultiSelectDropDown"
import { DatePickerInputType } from "~/Component/Common/Form/SearchDatePicker"
import { DatePickersInputType } from "~/Component/Common/Form/SearchDatePickers"
import { eventBus } from "~/utils/EventBus"
import FormError from "~/Component/Common/OldForm/FormError"
import { ISimplifiedApiErrorMessage } from "@packages/api/lib/utils/HandleResponse/ProcessedApiError"

export const FormModal = (props: {
  title: string
  meta: IField[]
  initialFilter?: { [key: string]: any }
  defaultFilter?: { [key: string]: any }
  formSubmitApi: (Params: any) => Promise<IApiResponse>
  closeModal: () => void
  refreshEventAfterFormSubmission?: string
}) => {
  const [formInstance] = Form.useForm()
  const [clearTrigger, setClearTrigger] = useState(false)
  const [error, setError] = useState<Array<ISimplifiedApiErrorMessage>>()
  const [loading, setLoading] = useState(false)
  const clearParams = () => {
    Object.keys(formInstance.getFieldsValue()).forEach((key) => formInstance.setFieldsValue({ [key]: undefined }))
    setClearTrigger(!clearTrigger)
  }

  const submit = () => {
    const params: { [key: string]: any } = formInstance.getFieldsValue()
    for (const key in params) {
      if (key === "" || !params[key] || key.includes("____")) delete params[key]
    }
    setError([])
    setLoading(true)
    props
      .formSubmitApi(params)
      .then((x) => {
        if (x.success) {
          props.refreshEventAfterFormSubmission && eventBus.publish(props.refreshEventAfterFormSubmission)
          closeModal()
        } else {
          setError(x.error)
        }
      })
      .finally(() => setLoading(true))
  }

  const closeModal = () => {
    clearParams()
    props.closeModal()
  }

  return (
    <Modal width="1000px" zIndex={zIndex.defaultModal}>
      <Card
        title={props.title}
        actions={[
          <Button onClick={closeModal} disabled={loading} loading={loading}>
            Cancel
          </Button>,
          <Button danger type="primary" onClick={clearParams} disabled={loading}>
            Clear
          </Button>,
          <Button onClick={submit} disabled={loading}>
            Submit
          </Button>
        ]}
      >
        <Form
          hideRequiredMark
          style={{ height: "65vh", overflow: "scroll", padding: "10px", backgroundColor: "#FFF" }}
          layout="horizontal"
          initialValues={props.initialFilter}
          form={formInstance}
        >
          <FormError errorMessages={error} />
          <Row>
            <>
              {props.meta.map((field, i) => {
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
                  case CUSTOM_FIELD:
                    return field.customFilterComponent ? (
                      <Col key={1000 + i} lg={12} md={12} sm={12} xs={24}>
                        <field.customFilterComponent
                          {...{
                            ...field,
                            key: i,
                            formInstance: formInstance,
                            clearTrigger: clearTrigger
                          }}
                        />
                      </Col>
                    ) : null
                  default:
                    return null
                }
              })}
            </>
          </Row>
        </Form>
      </Card>
    </Modal>
  )
}
