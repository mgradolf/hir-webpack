import { Col, Row } from "antd"
import moment from "moment"
import React from "react"
import { findCatalog } from "~/ApiServices/BizApi/catalog/catalogIf"
import SearchPage from "~/Component/Common/Page/SearchPage"
import { IFilterField } from "~/Component/Common/SearchFilters/common"
import { SectionLookupOpenButton } from "~/Component/LookupModals/SectionLookupModal"

export default function SectionCatalog() {
  const columns = [
    {
      title: "Catalog Name",
      dataIndex: "catalogName",
      key: "catalogName"
    },
    {
      title: "Start Date",
      dataIndex: "startDate",
      key: "startDate",
      render: (text: any) => (text !== null ? moment(text).format("YYYY-MM-DD") : "")
    },
    {
      title: "End Date",
      dataIndex: "endDate",
      key: "endDate",
      render: (text: any) => (text !== null ? moment(text).format("YYYY-MM-DD") : "")
    },
    {
      title: "Current Status",
      dataIndex: "currentStatus",
      key: "currentStatus"
    }
  ]

  const expandableRowRender = (data: any, mobileView: boolean): JSX.Element => {
    return (
      <div style={{ border: "1px solid", padding: "5px" }}>
        {mobileView && (
          <Row>
            <Col span="10">Start Date:</Col>
            <Col span="14">{moment(data.startDate).format("YYYY-MM-DD")}</Col>
          </Row>
        )}
        {mobileView && (
          <Row>
            <Col span="10">End Date:</Col>
            <Col span="14">{moment(data.endDate).format("YYYY-MM-DD")}</Col>
          </Row>
        )}
        {mobileView && (
          <Row>
            <Col span="10">Current Status:</Col>
            <Col span="14">{data.currentStatus}</Col>
          </Row>
        )}
      </div>
    )
  }

  const catalogMeta: IFilterField[] = [
    {
      label: "Section Lookup",
      fieldName: "",
      customFilterComponent: SectionLookupOpenButton
    }
  ]
  return (
    <SearchPage
      title="Catalogs"
      initialFilter={{}}
      meta={catalogMeta}
      hideSearchField={false}
      tableProps={{
        columns: columns,
        searchFunc: findCatalog,
        bordered: true,
        breakpoints: ["xxl"],
        responsiveColumnIndices: [1, 2, 3],
        expandableRowRender: expandableRowRender,
        rowKey: "ProductID",
        pagination: { position: ["topLeft"], pageSize: 20 }
      }}
    ></SearchPage>
  )
}
