import React, { useState } from "react"
import { Button, Space } from "antd"
import SearchPage from "~/Component/Common/Page/SearchPage"
import OfferingMenu from "~/Component/Offering/OfferingMenu"
import OfferingSearchFilterMeta from "~/FormMeta/Offering/OfferingSearchFilterMeta"
import { searchOffering } from "~/ApiServices/Service/OfferingService"
import { renderDate, TableColumnType } from "~/Component/Common/ResponsiveTable"
import { Link, RouteComponentProps } from "react-router-dom"
import OfferingFormModal from "~/Component/Offering/CreateEdit/OfferingFormModal"

export default function Offering(props: RouteComponentProps) {
  const [showModal, setShowModal] = useState(false)
  const columns: TableColumnType = [
    {
      title: "Offering Code",
      dataIndex: "OfferingCode",
      key: "OfferingCode",
      render: (text: any, record: any) => <Link to={`/offering/${record.OfferingID}`}>{text}</Link>,
      sorter: (a: any, b: any) => a.OfferingCode.length - b.OfferingCode.length
    },
    {
      title: "Offering Name",
      dataIndex: "OfferingName",
      key: "OfferingName",
      sorter: (a: any, b: any) => a.OfferingName.length - b.OfferingName.length
    },
    {
      title: "Creation Date",
      dataIndex: "CreationDate",
      key: "CreationDate",
      render: renderDate
    },
    {
      title: "Termination Date",
      dataIndex: "TerminationDate",
      key: "TerminationDate",
      render: renderDate
    },
    {
      title: "Status",
      dataIndex: "StatusCode",
      key: "StatusCode",
      sorter: (a: any, b: any) => a.StatusCode.length - b.StatusCode.length
    },
    {
      title: "Offering Type",
      dataIndex: "OfferingTypeName",
      key: "OfferingTypeName"
    },
    {
      title: "Action",
      key: "action",
      render: (record: any) => (
        <Space size="middle">
          <OfferingMenu offering={record} />
        </Space>
      )
    }
  ]

  return (
    <SearchPage
      blocks={[
        <>
          <Button type="primary" style={{ float: "right" }} onClick={() => setShowModal(true)}>
            + Create Offering
          </Button>
          {showModal && <OfferingFormModal closeModal={() => setShowModal(false)} />}
        </>
      ]}
      title="Manage Offerings"
      meta={OfferingSearchFilterMeta}
      tableProps={{
        columns: columns,
        searchFunc: searchOffering,
        responsiveColumnIndices: [1, 2, 3, 4, 5],
        pagination: { position: ["topLeft"], pageSize: 20 },
        rowKey: "OfferingID"
      }}
    ></SearchPage>
  )
}
