import React, { useState } from "react"
import Modal from "~/Component/Common/Modal/index2"
import { Button, Card, DatePicker, Form, Input, Select, Typography } from "antd"
import Table from "~/Component/Common/ResponsiveTable"
import { applyReturnItem, getReturnItems } from "~/ApiServices/Service/OrderService"
import moment from "moment"
import { DATE_FORMAT } from "~/utils/Constants"
import TextArea from "antd/lib/input/TextArea"
import { ISimplifiedApiErrorMessage } from "@packages/api/lib/utils/HandleResponse/ProcessedApiError"
import FormError from "~/Component/Common/FormError"
import { eventBus, REFRESH_PAGE } from "~/utils/EventBus"
import OrderDetailForModal from "~/Component/Section/Order/OrderDetailForModal"

interface IIssueCreditModal {
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
  ReturnNote: "ReturnNote",
  CreditMemoData: "CreditMemoData"
}
export default function IssueCreditModal(props: IIssueCreditModal) {
  const [CreditMemoData] = useState<ICreditMemoData[]>([])
  const [formInstance] = Form.useForm()
  const [errorMessages, setErrorMessages] = useState<ISimplifiedApiErrorMessage[]>([])
  const [apiCallInProgress, setApiCallInProgress] = useState(false)
  return (
    <Modal
      width="800px"
      apiCallInProgress={apiCallInProgress}
      children={
        <Card
          title="Issue Credit"
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
                  [fieldNames.OrderItemID]: props.OrderItemID,
                  [fieldNames.CreditMemoData]: CreditMemoData
                }).then((x) => {
                  setApiCallInProgress(false)
                  if (x.success) {
                    eventBus.publish(REFRESH_PAGE)
                    props.setShowViewReturnItemsModal(false)
                  } else setErrorMessages(x.error)
                })
              }}
            >
              Save
            </Button>
          ]}
        >
          <div style={{ height: "65vh", overflowY: "scroll", padding: "10px" }}>
            {" "}
            <OrderDetailForModal OrderID={props.OrderID} />
            <Form form={formInstance} initialValues={{ [fieldNames.ReturnQuantity]: 1 }}>
              <FormError errorMessages={errorMessages} />
              <Form.Item label="Associated With" labelCol={{ span: 6 }}>
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
              <Form.Item name={fieldNames.ReturnQuantity} label="Amount Credited" labelCol={{ span: 6 }}>
                <Input type="number" />
              </Form.Item>
              <Form.Item name={fieldNames.ReturnNote} label="Credit Date" labelCol={{ span: 6 }}>
                <DatePicker
                  aria-label="Pick Termination Date"
                  placeholder="YYYY/MM/DD"
                  format={DATE_FORMAT}
                  // defaultValue={}
                />
              </Form.Item>
              <Form.Item label="Description/Reason" labelCol={{ span: 6 }}>
                <TextArea />
              </Form.Item>
            </Form>
            <Typography.Title level={4}>Order Lines and Credit(s) Against This Order</Typography.Title>
            <Table
              columns={[
                { title: "Line Item Type", dataIndex: "ReturnedQuantity" },
                {
                  title: "Given On",
                  dataIndex: "DateReturned",
                  render: (text: any) => (text !== null ? moment(text).format(DATE_FORMAT) : "")
                },
                { title: "Description/Reason", dataIndex: "ReturnedNote" },
                { title: "Status", dataIndex: "ReturnedNote" },
                { title: "Amount", dataIndex: "ReturnedNote" }
              ]}
              searchFunc={getReturnItems}
              searchParams={{ OrderItemID: props.OrderItemID }}
            />
          </div>
        </Card>
      }
    />
  )
}
