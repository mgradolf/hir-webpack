import React from "react"
import { Dropdown, Menu, Space, Button } from "antd"
import { Link } from "react-router-dom"
import { getOrderItems } from "~/ApiServices/Service/OrderService"
import { renderDate, renderDetailsLink, TableColumnType } from "~/Component/Common/ResponsiveTable"
import { ITableConfigProp } from "~/TableSearchMeta/ITableConfigProp"
import {
  ApplyDiscountModalOpenButton,
  IssueCreditModalOpenButton,
  ViewReturnItemModalOpenButton
} from "~/TableSearchMeta/OrderItem/OrderItemModals"
import { DownOutlined } from "@ant-design/icons"

export const getOrderItemTableColumns = (isModal = false, SectionID?: number): ITableConfigProp => {
  const columns: TableColumnType = [
    {
      title: "",
      dataIndex: "OrderID",
      render: (text: any, record: any) =>
        isModal
          ? { text }
          : renderDetailsLink(SectionID ? `/section/${SectionID}/order/${record.OrderID}` : `/order/${record.OrderID}`)
    },
    {
      title: "Order Date",
      dataIndex: "OrderDate",
      render: renderDate
    },
    {
      title: "Order ID",
      dataIndex: "OrderID",
      render: (text: any, record: any) =>
        isModal ? (
          text
        ) : SectionID ? (
          <Link to={`/section/${SectionID}/order/${record.OrderID}`}>{text}</Link>
        ) : (
          <Link to={`/order/${record.OrderID}`}>{text}</Link>
        )
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
                  <ViewReturnItemModalOpenButton OrderID={record.OrderID} OrderItemID={record.OrderItemID} />
                </Menu.Item>
                <Menu.Item key="1">
                  <IssueCreditModalOpenButton OrderID={record.OrderID} OrderItemID={record.OrderItemID} />
                </Menu.Item>
                <Menu.Item key="2">
                  <ApplyDiscountModalOpenButton OrderID={record.OrderID} OrderItemID={record.OrderItemID} />
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

  const responsiveColumnIndices: number[] = []
  const expandableColumnIndices: number[] = []
  return { columns, responsiveColumnIndices, expandableColumnIndices, searchFunc: getOrderItems }
}
