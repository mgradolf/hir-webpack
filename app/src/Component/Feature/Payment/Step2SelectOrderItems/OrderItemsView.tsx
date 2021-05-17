import React, { useEffect } from "react"
import { Typography, Form, Input, Select, Row, Col } from "antd"
import { addOrderItemsToPay } from "~/ApiServices/Service/PaymentService"
import { IApiResponse } from "@packages/api/lib/utils/Interfaces"
import { generatePaymentAllocation } from "~/ApiServices/BizApi/payment/paymentIF"
import { OrderItemsTableForPayment } from "./OrderItemsTableColumnsForPayment"
import { FormInstance } from "antd/lib/form"

export const OrderItemsView = (props: {
  PersonID?: number
  totalBalance: number
  totalPayment: number
  selectedOrderItems: any
  allocatedItems: any
  setSelectedOrderItems: (Params: any[]) => void
  setTotalBalance: (balance: number) => void
  setTotalPayment: (payment: number) => void
  setAllocatedItems: (Params: any[]) => void
  PersonFormInstance: FormInstance
  setSelectedPayer: (Params: any) => void
  setDefaultPersonID: (PersonID: number) => void
  loading: boolean
  setLoading: (flag: boolean) => void
  selectePaymentAmountType: string
  setSelectePaymentAmountType: (paymentType: string) => void
}) => {
  const [tableFormInstance] = Form.useForm()
  const __addOrderItemsToPay = (___: any[]): Promise<IApiResponse> => {
    if (___.length > 0) {
      props.setLoading(true)
      return addOrderItemsToPay({ OrderItemIDs: ___.map((x) => x.OrderItemID) }).then((response) => {
        if (response.success && response.data && response.data.Allocation && Array.isArray(response.data.Allocation)) {
          props.setAllocatedItems(response.data.Allocation)
          const temp = ___.filter((x) => response.data.Allocation.find((a: any) => a.OrderItemID === x.OrderItemID))
          props.setSelectedOrderItems(temp)
          props.setTotalBalance(response.data.Allocation.reduce((acc: number, curr: any) => acc + curr.Balance, 0))
          props.setTotalPayment(response.data.Allocation.reduce((acc: number, curr: any) => acc + curr.Amount, 0))

          props.setLoading(false)
        }
        return response
      })
    }
    props.setAllocatedItems([])
    props.setSelectedOrderItems([])

    return Promise.resolve({ code: 200, success: true, error: false, data: "" })
  }

  useEffect(() => {
    props.setLoading(true)
    const temp = props.selectedOrderItems
    props.setSelectedOrderItems([])
    setTimeout(() => {
      props.setLoading(false)
      props.setSelectedOrderItems(temp)
    }, 0)
    // eslint-disable-next-line
  }, [props.selectePaymentAmountType])

  return (
    <Form form={tableFormInstance}>
      <OrderItemsTableForPayment
        {...props}
        __addOrderItemsToPay={__addOrderItemsToPay}
        loading={props.loading}
        setLoading={props.setLoading}
        selectePaymentAmountType={props.selectePaymentAmountType}
      />
      <Row style={{ marginTop: "10px", marginBottom: "30px" }}>
        {/* <Col span={24}>
          <Form.Item>
            <Select
              defaultValue="full_amount"
              onChange={(type) => {
                setSelectePaymentAmountType(type)
              }}
            >
              {[
                { label: "Full Payment", value: "full_amount" },
                { label: "Partial Payment", value: "partial_amount" },
                { label: "Custom Payment", value: "custom_amount" }
              ].map((x) => (
                <Select.Option key={x.value} value={x.value}>
                  {x.label}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col> */}
        <Col span={24}>
          {props.selectedOrderItems.length > 0 && (
            <Typography.Title level={4}>
              <Row justify="end">
                <Col span={6}></Col>
                <Col span={6}>Total Balance </Col>
                <Col span={1}></Col>
                <Col span={6}> {props.totalBalance}</Col>
              </Row>
              {(props.selectePaymentAmountType === "full_amount" ||
                props.selectePaymentAmountType === "custom_amount") && (
                <Row justify="end">
                  <Col span={6}>
                    <Form.Item>
                      <Select
                        defaultValue="full_amount"
                        onChange={(type) => {
                          props.setSelectePaymentAmountType(type)
                        }}
                      >
                        {[
                          { label: "Full Payment", value: "full_amount" },
                          { label: "Partial Payment", value: "partial_amount" },
                          { label: "Custom Payment", value: "custom_amount" }
                        ].map((x) => (
                          <Select.Option key={x.value} value={x.value}>
                            {x.label}
                          </Select.Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col span={1}></Col>
                  <Col span={6}> {props.totalPayment}</Col>
                </Row>
              )}
              {props.selectePaymentAmountType === "partial_amount" && (
                <Row justify="end">
                  <Col span={6}>
                    <Form.Item>
                      <Select
                        defaultValue={props.selectePaymentAmountType}
                        onChange={(type) => {
                          props.setSelectePaymentAmountType(type)
                        }}
                      >
                        {[
                          { label: "Full Payment", value: "full_amount" },
                          { label: "Partial Payment", value: "partial_amount" },
                          { label: "Custom Payment", value: "custom_amount" }
                        ].map((x) => (
                          <Select.Option key={x.value} value={x.value}>
                            {x.label}
                          </Select.Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col span={1}></Col>
                  <Col span={6}>
                    <Form.Item style={{ width: "100px" }}>
                      <Input
                        type="number"
                        min={0}
                        max={props.totalBalance}
                        defaultValue={props.totalBalance}
                        onChange={(event) => {
                          console.log(event.target.value)
                          props.setLoading(true)
                          generatePaymentAllocation({
                            AllocationSource: 2,
                            OrderItemList: props.selectedOrderItems.map((x: any) => x.OrderItemID),
                            TotalPaymentAmount: parseFloat(event.target.value)
                          }).then((response) => {
                            props.setLoading(false)
                            if (response.success) {
                              props.setAllocatedItems(response.data.Allocation)
                              props.setTotalPayment(
                                response.data.Allocation.reduce((acc: any, curr: any) => acc + curr.Amount, 0)
                              )
                            }
                          })
                        }}
                      />
                    </Form.Item>
                  </Col>
                </Row>
              )}
            </Typography.Title>
          )}
        </Col>
      </Row>
    </Form>
  )
}
