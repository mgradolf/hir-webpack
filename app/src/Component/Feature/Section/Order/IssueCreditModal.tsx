import React, { useState } from "react"
import Modal from "~/Component/Common/Modal/index2"
import { Button, Card, DatePicker, Form, Input } from "antd"
import { applyIssueCredit } from "~/ApiServices/Service/OrderService"
import { findOrderLineWiseBalance } from "~/ApiServices/BizApi/order/orderIf"
import { DATE_FORMAT } from "~/utils/Constants"
import TextArea from "antd/lib/input/TextArea"
import { ISimplifiedApiErrorMessage } from "@packages/api/lib/utils/HandleResponse/ProcessedApiError"
import { OldFormError } from "~/Component/Common/OldForm/OldFormError"
import { eventBus, REFRESH_PAGE } from "~/utils/EventBus"
import OrderDetailForModal from "~/Component/Feature/Section/Order/OrderDetailForModal"
import { OldDropDown } from "~/Component/Common/OldForm/OldDropDown"

interface IIssueCreditModal {
  OrderID: number
  OrderItemID: number
  setShowViewReturnItemsModal: (flag: boolean) => void
}

const fieldNames = {
  OrderLineID: "OrderLineID",
  Amount: "Amount",
  Reason: "Reason",
  CreditMemoDate: "CreditMemoDate"
}
export default function IssueCreditModal(props: IIssueCreditModal) {
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
                applyIssueCredit({
                  ...formInstance.getFieldsValue()
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
            <Form form={formInstance}>
              <OldFormError errorMessages={errorMessages} />
              <OldDropDown
                searchFunc={findOrderLineWiseBalance}
                searchParams={{ OrderID: props.OrderID }}
                label="Associated With"
                fieldName={fieldNames.OrderLineID}
                displayField="Description"
                valueField="OrderLineID"
                labelColumn={{ span: 6 }}
              />
              <Form.Item name={fieldNames.Amount} label="Amount Credited" labelCol={{ span: 6 }}>
                <Input type="number" />
              </Form.Item>
              <Form.Item name={fieldNames.CreditMemoDate} label="Credit Date" labelCol={{ span: 6 }}>
                <DatePicker aria-label="Pick Termination Date" placeholder="YYYY/MM/DD" format={DATE_FORMAT} />
              </Form.Item>
              <Form.Item name={fieldNames.Reason} label="Description/Reason" labelCol={{ span: 6 }}>
                <TextArea />
              </Form.Item>
            </Form>
          </div>
        </Card>
      }
    />
  )
}
