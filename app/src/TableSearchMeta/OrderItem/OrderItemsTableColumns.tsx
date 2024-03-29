import React from "react"
import { Dropdown, Menu, Space, Button } from "antd"
import { Link } from "react-router-dom"
import { getOrderItems } from "~/ApiServices/Service/OrderService"
import { renderDate, TableColumnType } from "~/Component/Common/ResponsiveTable"
import { ITableConfigProp } from "~/TableSearchMeta/ITableConfigProp"
import {
  ApplyDiscountModalOpenButton,
  IssueCreditModalOpenButton,
  ViewReturnItemModalOpenButton
} from "~/TableSearchMeta/OrderItem/OrderItemModals"
import { DownOutlined } from "@ant-design/icons"

export const getOrderItemTableColumns = (
  isModal = false,
  helpKeys?: {
    helpKeyViewReturnItemsModal?: string
    helpKeyIssueCreditModal?: string
    helpKeyApplyDiscountModal?: string
  }
): ITableConfigProp => {
  const columns: TableColumnType = [
    {
      dataIndex: "OrderID",
      render: (text: any, record: any) => (isModal ? { text } : `/order/${text}`)
    },
    {
      title: "Order Date",
      dataIndex: "OrderDate",
      render: renderDate
    },
    {
      title: "Order ID",
      dataIndex: "OrderID",
      render: (text: any, record: any) => (isModal ? text : <Link to={`/order/${record.OrderID}`}>{text}</Link>)
    },
    {
      title: "Purchaser",
      dataIndex: "PurchaserName",
      render: (text: any, record: any) => {
        return isModal ? { text } : <Link to={`/person/${record?.PersonID}`}>{text}</Link>
      }
    },
    {
      title: "Account",
      dataIndex: "AccountName",
      render: (text: any, record: any) => (isModal ? text : <Link to={`/account/${record.AccountID}`}>{text}</Link>)
    },
    {
      title: "Quantity",
      dataIndex: "Quantity"
    },
    {
      title: "Item",
      dataIndex: "ItemName"
    },
    {
      title: "Balance",
      dataIndex: "Balance"
    },
    {
      title: "Due Date",
      dataIndex: "PaymentDueDate",
      render: renderDate
    },
    {
      title: "Action",
      key: "action",
      render: (record: any) => (
        <Space size="middle">
          <Dropdown
            overlay={
              <Menu>
                <Menu.Item key="0">
                  <ViewReturnItemModalOpenButton
                    helpKey={helpKeys && helpKeys.helpKeyViewReturnItemsModal}
                    OrderID={record.OrderID}
                    OrderItemID={record.OrderItemID}
                  />
                </Menu.Item>
                <Menu.Item key="1">
                  <IssueCreditModalOpenButton
                    helpKey={helpKeys && helpKeys.helpKeyIssueCreditModal}
                    OrderID={record.OrderID}
                    OrderItemID={record.OrderItemID}
                  />
                </Menu.Item>
                <Menu.Item key="2">
                  <ApplyDiscountModalOpenButton
                    helpKey={helpKeys && helpKeys.helpKeyApplyDiscountModal}
                    OrderID={record.OrderID}
                    OrderItemID={record.OrderItemID}
                  />
                </Menu.Item>
              </Menu>
            }
            trigger={["click"]}
          >
            <Button type="primary" onClick={(e) => e.preventDefault()}>
              Go To <DownOutlined />
            </Button>
          </Dropdown>
        </Space>
      )
    }
  ]

  return { columns, searchFunc: getOrderItems, tableName: "OrderItemsTableColumns" }
}
