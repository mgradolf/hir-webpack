import React, { useState } from "react"
import Modal from "~/Component/Common/Modal/index2"
import { Button, Card, Col, Form, Input, Row, Typography } from "antd"
import { ResponsiveTable } from "~/Component/Common/ResponsiveTable"
import { applyReturnItem, getCreditMemoDataByOrderItemID } from "~/ApiServices/Service/OrderService"
import TextArea from "antd/lib/input/TextArea"
import { ISimplifiedApiErrorMessage } from "@packages/api/lib/utils/HandleResponse/ProcessedApiError"
import { OldFormError } from "~/Component/Common/OldForm/OldFormError"
import { eventBus, REFRESH_PAGE } from "~/utils/EventBus"
import OrderDetailForModal from "~/Component/Feature/Section/Order/OrderDetailForModal"
import { HelpButton } from "~/Component/Common/Form/Buttons/HelpButton"

interface IViewReturnItemsModal {
  OrderID: number
  OrderItemID: number
  setShowViewReturnItemsModal: (flag: boolean) => void
  helpkey?: string
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
export default function ViewReturnItemsModal(props: IViewReturnItemsModal) {
  const [CreditMemoData, setCreditMemoData] = useState<{ [key: string]: any }>({})
  const [formInstance] = Form.useForm()
  const [errorMessages, setErrorMessages] = useState<ISimplifiedApiErrorMessage[]>([])
  const [apiCallInProgress, setApiCallInProgress] = useState(false)
  return (
    <Modal
      width="800px"
      apiCallInProgress={apiCallInProgress}
      children={
        <Card
          title={
            <Row justify="space-between">
              <Col>View Return Items</Col>
              <Col>
                <HelpButton helpKey={props.helpkey} />
              </Col>
            </Row>
          }
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
                  [fieldNames.CreditMemoData]: Object.keys(CreditMemoData).map((x) => {
                    return { OrderLineID: Number(x), Amount: CreditMemoData[x] }
                  })
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
          <div className="modal-form">
            {" "}
            <OrderDetailForModal OrderID={props.OrderID} />
            <Form form={formInstance} initialValues={{ [fieldNames.ReturnQuantity]: 1 }}>
              <OldFormError errorMessages={errorMessages} />
              <Form.Item name={fieldNames.ReturnQuantity} label="Return Quantity" labelCol={{ span: 6 }}>
                <Input type="number" />
              </Form.Item>
              <Form.Item name={fieldNames.ReturnNote} label="Return Note" labelCol={{ span: 6 }}>
                <TextArea />
              </Form.Item>
            </Form>
            <Typography.Title level={4}>Credit Amount (Click "Credit Amount" Column to Edit)</Typography.Title>
            <ResponsiveTable
              columns={[
                { title: "Item", dataIndex: "Description" },
                { title: "Cost", dataIndex: "ChargeAmount" },
                {
                  title: "Credit Amount",
                  dataIndex: "Amount",
                  render: (text: any, record: any) => {
                    return (
                      <Input
                        type="number"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
                          e.persist()
                          const item = { [String(record.OrderLineID)]: Number(e.target.value) }
                          setCreditMemoData({ ...CreditMemoData, ...item })
                        }}
                      />
                    )
                  }
                }
              ]}
              searchFunc={getCreditMemoDataByOrderItemID}
              searchParams={{ OrderItemID: props.OrderItemID }}
              pagination={false}
            />
          </div>
        </Card>
      }
    />
  )
}
