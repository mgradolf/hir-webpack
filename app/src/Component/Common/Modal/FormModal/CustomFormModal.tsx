import React from "react"
import Modal from "~/Component/Common/Modal/index2"
import { Button, Card, Col, Form, Row } from "antd"
import { FormError } from "~/Component/Common/Form/FormError"
import { ISimplifiedApiErrorMessage } from "@packages/api/lib/utils/HandleResponse/ProcessedApiError"
import { FormInstance } from "antd/lib/form"
import { HelpButton } from "~/Component/Common/Form/Buttons/HelpButton"

export interface ICustomFormModal {
  formTitle: string
  customForm: JSX.Element
  formInstance: FormInstance
  closeModal: () => void
  onFormSubmission: (closeModal: () => void) => void
  initialValues: { [key: string]: any }
  apiCallInProgress?: boolean
  loading: boolean
  errorMessages: Array<ISimplifiedApiErrorMessage>
  extraButtons?: JSX.Element[]
  helpKey?: string
}

export function CustomFormModal(props: ICustomFormModal) {
  return (
    <Modal width="1000px" loading={props.loading} apiCallInProgress={props.apiCallInProgress}>
      <Card
        title={
          <Row justify="space-between">
            <Col>{props.formTitle}</Col>
            {props.helpKey && (
              <Col>
                <HelpButton helpKey={props.helpKey} />
              </Col>
            )}
          </Row>
        }
        actions={[
          <Row justify="end" gutter={[8, 8]} style={{ marginRight: "10px" }}>
            {props.extraButtons && props.extraButtons.map((x, i) => <Col key={i}>{x}</Col>)}

            <Col>
              <Button type="primary" danger onClick={props.closeModal}>
                Cancel
              </Button>
            </Col>
            <Col>
              <Button type="primary" onClick={() => props.onFormSubmission(props.closeModal)}>
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
            maxHeight: "66vh",
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
