import { ITableWrapperProps } from "~/Component/Offering/OfferingTable"
import { Row, Col } from "antd"
import React, { useState } from "react"
import ResponsiveTable from "~/Component/Common/ResponsiveTable"
import ProductSearchFilterMeta from "~/FormMeta/Section/Product/ProductSearchFilterMeta"
import ProductSearchFilters from "~/Component/Common/SearchFilters"
import { searchProducts } from "~/ApiServices/Service/ProductService"

export default function ProductPage(props: ITableWrapperProps) {
  const [filterData, updateFilterData] = useState<{ [key: string]: any }>({})

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
    <div>
      <ProductSearchFilters
        initialFilter={filterData}
        visible={true}
        isModalView={true}
        isCheckeble={false}
        meta={ProductSearchFilterMeta}
        title="Product Filter"
        toggleVisiibility={() => {
          console.log("meo")
        }}
        onApplyChanges={(newFilterValues, newFilterCount) => {
          updateFilterData(newFilterValues)
        }}
      />

      <ResponsiveTable
        columns={columns}
        searchFunc={searchProducts}
        searchParams={filterData}
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
    </div>
  )
}
