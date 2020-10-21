import moment from "moment"
import React, { useState } from "react"
import { Link, RouteComponentProps } from "react-router-dom"
import OrderItemsSearchFilters from "~/Component/Common/SearchFilters"
import { OrderItemsFiltersMeta } from "~/Component/Section/Order/OrderItemsFilters/OrderItemsFiltersMeta"
import { getOrderItems } from "~/ApiServices/Service/OrderService"
import OrderItemsTable from "~/Component/Common/ResponsiveTable"
import { Button, Dropdown, Menu, Space } from "antd"
import { DownOutlined } from "@ant-design/icons"
import ViewReturnItemsModal from "~/Component/Section/Order/ViewReturnItemsModal"

export default function OrderItems(props: RouteComponentProps<{ sectionID?: string }>) {
  const SectionID = Number(props.match.params.sectionID)
  const [searchParams, setSearchParams] = useState({ SectionID })
  const [selectedOrderItemID, setSelectedOrderItemID] = useState(0)
  const [showViewReturnItemModal, setShowViewReturnItemModal] = useState(false)
  return (
    <div className="site-layout-content">
      <OrderItemsSearchFilters
        meta={OrderItemsFiltersMeta(SectionID)}
        isChecked={false}
        isModalView={true}
        visible={true}
        title="Search Order Items"
        toggleVisiibility={() => {
          console.log("meo")
        }}
        onApplyChanges={(newValues: any, appliedFilterCount: number) => {
          newValues.SectionID = SectionID
          console.log(newValues)
          setSearchParams(newValues)
        }}
        initialFilter={{}}
      />
      {showViewReturnItemModal && (
        <ViewReturnItemsModal
          setShowViewReturnItemsModal={setShowViewReturnItemModal}
          OrderItemID={selectedOrderItemID}
        />
        // <ViewReturnItemsModal setShowViewReturnItemsModal={setShowViewReturnItemModal} OrderItemID={20896} />
      )}
      <OrderItemsTable
        searchFunc={getOrderItems}
        searchParams={searchParams}
        rowKey="OrderItemID"
        columns={[
          {
            title: "Order ID",
            dataIndex: "OrderID",
            render: (text: any, record: any) => <Link to={`/section/${SectionID}/order/${record.OrderID}`}>{text}</Link>
          },
          {
            title: "Order Date",
            dataIndex: "OrderDate",
            render: (text: any) => (text !== null ? moment(text).format("YYYY-MM-DD") : "")
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
            render: (text: any) => (text !== null ? moment(text).format("YYYY-MM-DD") : "")
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
                            setSelectedOrderItemID(record.OrderItemID)
                            setShowViewReturnItemModal(true)
                          }}
                        >
                          View Return Items
                        </Button>
                      </Menu.Item>
                      <Menu.Item key="1">
                        <Button type="link">Issue Credit</Button>
                      </Menu.Item>
                      <Menu.Item key="2">
                        <Button type="link">Apply Discounts</Button>
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
        ]}
      />
    </div>
  )
}
