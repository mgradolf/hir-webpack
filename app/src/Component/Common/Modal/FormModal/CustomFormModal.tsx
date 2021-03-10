import React from "react"
import Modal from "~/Component/Common/Modal/index2"
import { Button, Card, Col, Form, Row } from "antd"
import { FormError } from "~/Component/Common/Form/FormError"
import { ISimplifiedApiErrorMessage } from "@packages/api/lib/utils/HandleResponse/ProcessedApiError"
import { FormInstance } from "antd/lib/form"

export interface ICustomFormModal {
  formTitle: string
  customForm: JSX.Element
  formInstance: FormInstance
  closeModal: () => void
  onFormSubmission: (Params: { [key: string]: any }) => void
  initialValues: { [key: string]: any }
  apiCallInProgress?: boolean
  loading: boolean
  errorMessages: Array<ISimplifiedApiErrorMessage>
}

export function CustomFormModal(props: ICustomFormModal) {
  return (
    <Modal width="1000px" loading={props.loading} apiCallInProgress={props.apiCallInProgress}>
      <Card
        title={props.formTitle}
        actions={[
          <Row justify="end" gutter={[8, 8]} style={{ marginRight: "10px" }}>
            <Col>
              <Button type="primary" danger onClick={props.closeModal}>
                Cancel
              </Button>
            </Col>
            <Col>
              <Button type="primary" onClick={props.onFormSubmission}>
                Submit
              </Button>
            </Col>
          </Row>
        ]}
      >
        <Form
          form={props.formInstance}
          initialValues={props.initialValues}
          scrollToFirstError
          style={{
            maxHeight: "80vh",
            overflowY: "scroll"
          }}
        >
          <FormError errorMessages={props.errorMessages} />
          {props.customForm}
        </Form>
      </Card>
    </Modal>
  )
}
