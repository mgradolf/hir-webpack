import React, { useState } from "react"
import { renderDate, TableColumnType } from "~/Component/Common/ResponsiveTable"
import { SearchPage } from "~/Component/Common/Page/SearchPage"
import { OrderItemsFiltersMeta } from "~/FormMeta/OrderItem/OrderItemsSearchMeta"
import { getOrderItems } from "~/ApiServices/Service/OrderService"
import { Button, Dropdown, Menu, Space } from "antd"
import { Link } from "react-router-dom"
import { DownOutlined } from "@ant-design/icons"
import ViewReturnItemsModal from "~/Component/Section/Order/ViewReturnItemsModal"
import IssueCreditModal from "~/Component/Section/Order/IssueCreditModal"
import ApplyDiscountModal from "~/Component/Section/Order/ApplyDiscountModal"

export default function PersonTable() {
  const [selectedOrderItem, setSelectedOrderItemID] = useState<{ [key: string]: any }>({})
  const [showViewReturnItemModal, setShowViewReturnItemModal] = useState(false)
  const [showIssueCreditModal, setShowIssueCreditModal] = useState(false)
  const [showApplyDiscountModal, setShowApplyDiscountModal] = useState(false)
  const columns: TableColumnType = [
    {
      title: "Order ID",
      dataIndex: "OrderID",
      render: (text: any, record: any) => <Link to={`/order/${record.OrderID}`}>{text}</Link>
    },
    {
      title: "Order Date",
      dataIndex: "OrderDate",
      render: renderDate
    },
    {
      title: "Purchaser",
      dataIndex: "PurchaserName"
    },
    {
      title: "Item",
      dataIndex: "ItemName"
    },
    {
      title: "Quantity",
      dataIndex: "Quantity"
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
                  <Button
                    type="link"
                    onClick={() => {
                      setSelectedOrderItemID(record)
                      setShowViewReturnItemModal(true)
                    }}
                  >
                    View Return Items
                  </Button>
                </Menu.Item>
                <Menu.Item key="1">
                  <Button
                    type="link"
                    onClick={() => {
                      setSelectedOrderItemID(record)
                      setShowIssueCreditModal(true)
                    }}
                  >
                    Issue Credit
                  </Button>
                </Menu.Item>
                <Menu.Item key="2">
                  <Button
                    type="link"
                    onClick={() => {
                      setSelectedOrderItemID(record)
                      setShowApplyDiscountModal(true)
                    }}
                  >
                    Apply Discounts
                  </Button>
                </Menu.Item>
              </Menu>
            }
            trigger={["click"]}
          >
            <a href="/" className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
              Actions <DownOutlined />
            </a>
          </Dropdown>
        </Space>
      )
    }
  ]
  return (
    <>
      {showViewReturnItemModal && (
        <ViewReturnItemsModal
          setShowViewReturnItemsModal={setShowViewReturnItemModal}
          OrderItemID={selectedOrderItem.OrderItemID}
          OrderID={selectedOrderItem.OrderID}
        />
        // <ViewReturnItemsModal setShowViewReturnItemsModal={setShowViewReturnItemModal} OrderItemID={20896} />
      )}
      {showIssueCreditModal && (
        <IssueCreditModal
          setShowViewReturnItemsModal={setShowIssueCreditModal}
          OrderItemID={selectedOrderItem.OrderItemID}
          OrderID={selectedOrderItem.OrderID}
        />
      )}
      {showApplyDiscountModal && (
        <ApplyDiscountModal
          setShowViewReturnItemsModal={setShowApplyDiscountModal}
          OrderItemID={selectedOrderItem.OrderItemID}
          OrderID={selectedOrderItem.OrderID}
        />
      )}
      <SearchPage
        title="Order Items"
        meta={OrderItemsFiltersMeta}
        hideSearchField={false}
        tableProps={{
          columns: columns,
          searchFunc: getOrderItems,
          rowKey: "OrderItemID",
          pagination: { position: ["topLeft"], pageSize: 20 }
        }}
      ></SearchPage>
    </>
  )
}
