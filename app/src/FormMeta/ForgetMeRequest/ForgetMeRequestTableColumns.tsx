import React from "react"
import { Link } from "react-router-dom"
import { renderDate, renderEmail, TableColumnType } from "~/Component/Common/ResponsiveTable"
import { ITableConfigProp } from "~/FormMeta/ITableConfigProp"
import { ReadOutlined } from "@ant-design/icons"
import { getAnonymizeRequests } from "~/ApiServices/Service/AnonymizationRequestService"

export const getForgetMeRequestTableColumns = (isModal = false): ITableConfigProp => {
  const columns: TableColumnType = [
    {
      ...(!isModal && {
        title: "",
        dataIndex: "",
        render: (text: any, record: any) => (
          <Link to={`/forget-me-request/${record.AnonymizationRequestID}`}>
            <ReadOutlined />
          </Link>
        )
      })
    },
    { title: "First Name", dataIndex: "FirstName" },
    { title: "Last Name", dataIndex: "LastName" },
    { title: "Email Address", dataIndex: "EmailAddress", render: renderEmail },
    { title: "Request Date", dataIndex: "RequestDate", render: renderDate },
    { title: "Request Source", dataIndex: "SourceName" },
    { title: "Request By", dataIndex: "StaffUserName" },
    { title: "Processed", dataIndex: "IsProcessed" },
    { title: "Processing Date", dataIndex: "ProcessingDate", render: renderDate }
  ]

  const responsiveColumnIndices: number[] = []
  const expandableColumnIndices: number[] = []
  return { columns, responsiveColumnIndices, expandableColumnIndices, searchFunc: getAnonymizeRequests }
}
