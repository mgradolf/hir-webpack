import React from "react"
import { Link } from "react-router-dom"
import { findBatches } from "~/ApiServices/Service/BatchService"
import { renderDate, TableColumnType } from "~/Component/Common/ResponsiveTable"
import { ITableConfigProp } from "~/FormMeta/ITableConfigProp"
import { ReadOutlined } from "@ant-design/icons"

export const getBatchTableColumns = (isModal = false): ITableConfigProp => {
  const columns: TableColumnType = [
    {
      ...(!isModal && {
        title: "",
        dataIndex: "",
        render: (text: any, record: any) => (
          <Link to={`/batch/${record.BatchImportID}`}>
            <ReadOutlined />
          </Link>
        )
      })
    },
    {
      title: "Date",
      dataIndex: "CreatedDate",
      render: renderDate
    },
    { title: "Type", dataIndex: "Name" },
    { title: "Status", dataIndex: "State" },
    { title: "Uploaded", render: (text, record) => record?.BatchDetails?.TotalUploaded },
    { title: "Processed", render: (text, record) => record?.BatchDetails?.TotalProcessed },
    { title: "Failed", render: (text, record) => record?.BatchDetails?.TotalFailed }
  ]
  return { columns, searchFunc: findBatches, responsiveColumnIndices: [], expandableColumnIndices: [] }
}
