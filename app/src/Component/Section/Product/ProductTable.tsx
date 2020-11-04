import { ITableWrapperProps } from "~/Component/Offering/OfferingTable"
import { Row, Col } from "antd"
import React from "react"
import { ResponsiveTable } from "~/Component/Common/ResponsiveTable"

export function ProductTable(props: ITableWrapperProps) {
  const columns = [
    {
      title: "Name",
      dataIndex: "ProductName",
      key: "ProductName"
    },
    {
      title: "Description",
      dataIndex: "Description",
      key: "Description"
    },
    {
      title: "Available",
      dataIndex: "InventoryUnits",
      key: "InventoryUnits"
    },
    {
      title: "Price",
      dataIndex: "Price",
      key: "Price"
    }
  ]

  function expandableRowRender(data: any, display: boolean) {
    return (
      <div style={{ border: "1px solid", padding: "5px" }}>
        {display && (
          <Row>
            <Col span="8">Description:</Col>
            <Col span="16">{data.Description}</Col>
          </Row>
        )}
        {display && (
          <Row>
            <Col span="8">Available:</Col>
            <Col span="16">{data.Available}</Col>
          </Row>
        )}
        {display && (
          <Row>
            <Col span="8">Price:</Col>
            <Col span="16">{data.Price}</Col>
          </Row>
        )}
      </div>
    )
  }

  return (
    <ResponsiveTable
      columns={columns}
      dataSource={props.dataSource}
      loading={props.loading}
      bordered
      breakpoints={["xxl"]}
      responsiveColumnIndices={[1, 2, 3]}
      rowSelection={props.rowSelection}
      expandableRowRender={expandableRowRender}
      rowKey="ProductID"
      pagination={{ position: ["topLeft"], pageSize: 20 }}
      isModal={props.isModal}
    />
  )
}
