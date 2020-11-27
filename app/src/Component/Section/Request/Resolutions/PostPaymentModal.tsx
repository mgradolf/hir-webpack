import * as React from "react"
import Modal from "~/Component/Common/Modal"
import { connect } from "react-redux"
import { Dispatch } from "redux"
import { showRequestResolutionModal } from "~/Store/ModalState"
import { Card, Button, Form, Input, Select, Divider } from "antd"
import { IParamsToBeDispatched } from "~/Pages/Request/RequestDetailsPage"
import { eventBus, EVENT_REQUEST_RESOLUTION } from "~/utils/EventBus"
import { REQUEST_PROCESS_ACTION_NAME } from "~/utils/Constants"

const layout = {
  labelCol: { span: 6 }
}

interface IPostPaymentModal {
  taskJson?: any
  extraDataSource?: any
  closePostPaymentModal?: () => void
}

function PostPaymentModal(props: IPostPaymentModal) {
  const [form] = Form.useForm()
  const initialAnswer = props.taskJson.UpdatedResponse !== undefined ? props.taskJson.UpdatedResponse : {}

  const dataSource = props.extraDataSource
  initialAnswer["TransactionAmount"] = dataSource.PaymentAmount
  initialAnswer["PaymentGatewayAccountID"] = dataSource.PaymentGatewayAccountID

  const onFormSubmission = async () => {
    try {
      await form.validateFields()

      props.taskJson["UpdatedResponse"] = form.getFieldsValue()

      const params: any = form.getFieldsValue()
      params["DependencyKey"] = props.taskJson.Issues[0].DependencyKey
      params["TaskKey"] = props.taskJson.Key
      params["ProcessActionName"] = REQUEST_PROCESS_ACTION_NAME.POST_PAYMNET

      const postPayment: IParamsToBeDispatched = {
        ValueUpdate: true,
        Params: params
      }

      eventBus.publish(EVENT_REQUEST_RESOLUTION, postPayment)
      props.closePostPaymentModal && props.closePostPaymentModal()
    } catch (errorInfo) {
      console.log("Failed:", errorInfo)
    }
  }

  return (
    <Modal showModal={true} width="800px" closable={true}>
      <Card
        title="Manual posting of gateway payment"
        actions={[
          <Button type="ghost" onClick={props.closePostPaymentModal}>
            Cancel
          </Button>,
          <Button type="primary" onClick={onFormSubmission}>
            Update
          </Button>
        ]}
      >
        <Form
          initialValues={initialAnswer}
          form={form}
          style={{ height: "65vh", overflowY: "scroll", padding: "10px" }}
        >
          <Divider orientation="left">Payer Information</Divider>
          <Form.Item
            label="Payer Name"
            rules={[{ required: true, message: "Please input your answer!" }]}
            {...layout}
            name="PayerName"
          >
            <Input aria-label="Payer Name" />
          </Form.Item>
          <Form.Item
            label="Billing Email"
            rules={[{ required: true, message: "Please input your answer!" }]}
            {...layout}
            name="BillingEmail"
          >
            <Input aria-label="Billing Email" />
          </Form.Item>
          <Form.Item
            label="Billing Street"
            rules={[{ required: true, message: "Please input your answer!" }]}
            {...layout}
            name="BillingStreet"
          >
            <Input aria-label="Billing Street" />
          </Form.Item>
          <Form.Item
            label="Billing City"
            rules={[{ required: true, message: "Please input your answer!" }]}
            {...layout}
            name="BillingCity"
          >
            <Input aria-label="Billing City" />
          </Form.Item>
          <Form.Item
            label="Billing State"
            rules={[{ required: true, message: "Please input your answer!" }]}
            {...layout}
            name="BillingState"
          >
            <Input aria-label="Billing State" />
          </Form.Item>
          <Form.Item
            label="Billing Postal Code"
            rules={[{ required: true, message: "Please input your answer!" }]}
            {...layout}
            name="BillingPostalCode"
          >
            <Input aria-label="Billing Postal Code" />
          </Form.Item>
          <Form.Item
            label="Billing Country"
            rules={[{ required: true, message: "Please input your answer!" }]}
            {...layout}
            name="BillingCountry"
          >
            <Input aria-label="Billing Country" />
          </Form.Item>

          <Divider orientation="left">Transaction Information</Divider>
          <Form.Item
            label="Payment Type"
            {...layout}
            name="PaymentTypeID"
            rules={[{ required: true, message: "Please select payment type!" }]}
          >
            <Select aria-label="Payment Type">
              <Select.Option key={dataSource.PaymentTypeID} value={dataSource.PaymentTypeID}>
                {dataSource.PaymentTypeName}
              </Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Transaction No"
            rules={[{ required: true, message: "Please input your answer!" }]}
            {...layout}
            name="TransactionNo"
          >
            <Input aria-label="Transaction No" />
          </Form.Item>
          <Form.Item
            label="Authorization Code"
            rules={[{ required: true, message: "Please input your answer!" }]}
            {...layout}
            name="AuthorizationCode"
          >
            <Input aria-label="Authorization Code" />
          </Form.Item>
          <Form.Item label="Payment Amount" {...layout} name="TransactionAmount">
            <Input aria-label="Payment Amount" disabled />
          </Form.Item>
          <Form.Item label="Payment Gateway" className="hidden" {...layout} name="PaymentGatewayAccountID">
            <Input aria-label="Payment Gateway" />
          </Form.Item>
        </Form>
      </Card>
    </Modal>
  )
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    closePostPaymentModal: () => dispatch(showRequestResolutionModal(false))
  }
}

export default connect(undefined, mapDispatchToProps)(PostPaymentModal)
