import React, { useState } from "react"
import Modal from "~/Component/Common/Modal/index2"
import { Button, Card, Col, Form, Input, Row, Select, Typography } from "antd"
import Table from "~/Component/Common/ResponsiveTable"
import { applyReturnItem, getCreditMemoDataByOrderItemID } from "~/ApiServices/Service/OrderService"
import TextArea from "antd/lib/input/TextArea"
import { ISimplifiedApiErrorMessage } from "@packages/api/lib/utils/HandleResponse/ProcessedApiError"
import FormError from "~/Component/Common/FormError"
import { eventBus, REFRESH_PAGE } from "~/utils/EventBus"
import OrderDetailForModal from "~/Component/Section/Order/OrderDetailForModal"

interface IApplyDiscountModal {
  OrderID: number
  OrderItemID: number
  setShowViewReturnItemsModal: (flag: boolean) => void
}

interface ICreditMemoData {
  OrderLineID: number
  Amount: number
}

const fieldNames = {
  OrderItemID: "OrderItemID",
  ReturnQuantity: "ReturnQuantity",
  ReturnNote: "ReturnNote"
}

export default function ApplyDiscountModal(props: IApplyDiscountModal) {
  const [formInstance] = Form.useForm()
  const [errorMessages, setErrorMessages] = useState<ISimplifiedApiErrorMessage[]>([])
  const [apiCallInProgress, setApiCallInProgress] = useState(false)
  return (
    <Modal
      width="800px"
      apiCallInProgress={apiCallInProgress}
      children={
        <Card
          title="Apply Discount"
          actions={[
            <Button
              onClick={() => {
                props.setShowViewReturnItemsModal(false)
              }}
            >
              Close
            </Button>,
            <Button
              onClick={() => {
                setErrorMessages([])
                setApiCallInProgress(true)
                applyReturnItem({
                  ...formInstance.getFieldsValue(),
                  [fieldNames.OrderItemID]: props.OrderItemID
                }).then((x) => {
                  setApiCallInProgress(false)
                  if (x.success) {
                    eventBus.publish(REFRESH_PAGE)
                    props.setShowViewReturnItemsModal(false)
                  } else setErrorMessages(x.error)
                })
              }}
            >
              Manually Grant Discount
            </Button>
          ]}
        >
          <div style={{ height: "65vh", overflowY: "scroll", padding: "10px" }}>
            {" "}
            <OrderDetailForModal OrderID={props.OrderID} />
            <Form form={formInstance} initialValues={{ [fieldNames.ReturnQuantity]: 1 }}>
              <FormError errorMessages={errorMessages} />
              <Form.Item label="Available Discounts" labelCol={{ span: 6 }}>
                <Select>
                  <Select.Option value="1" key="1">
                    Option 1
                  </Select.Option>
                  <Select.Option value="1" key="2">
                    Option 1
                  </Select.Option>
                  <Select.Option value="1" key="3">
                    Option 1
                  </Select.Option>
                </Select>
              </Form.Item>
              <Form.Item label="Reason" labelCol={{ span: 6 }}>
                <TextArea />
              </Form.Item>
            </Form>
            <Form.Item labelCol={{ span: 6 }}>
              <Row>
                <Col span={12}>
                  <Select defaultValue="1">
                    <Select.Option value="1" key="1">
                      Amount in Doller
                    </Select.Option>
                    <Select.Option value="1" key="2">
                      Amount in Percentage
                    </Select.Option>
                  </Select>
                </Col>
                <Col span={12}>
                  <Input />
                </Col>
              </Row>
            </Form.Item>
            <Typography.Title level={4}>All Discounts Applied To This Enrollment</Typography.Title>
            <Table
              columns={[
                { title: "Discount Program", dataIndex: "Description" },
                { title: "Discount Name", dataIndex: "ChargeAmount" },
                { title: "Discount Description", dataIndex: "ChargeAmount" },
                { title: "Create Date", dataIndex: "ChargeAmount" },
                { title: "Discount in $", dataIndex: "ChargeAmount" }
              ]}
              searchFunc={getCreditMemoDataByOrderItemID}
              searchParams={{ OrderItemID: props.OrderItemID }}
            />
          </div>
        </Card>
      }
    />
  )
}
