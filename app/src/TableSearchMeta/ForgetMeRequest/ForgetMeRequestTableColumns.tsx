import React from "react"
import { Link } from "react-router-dom"
import { renderBoolean, renderDate, renderEmail, renderLink, TableColumnType } from "~/Component/Common/ResponsiveTable"
import { ITableConfigProp } from "~/TableSearchMeta/ITableConfigProp"
import { ReadOutlined } from "@ant-design/icons"
import { getAnonymizeRequests } from "~/ApiServices/Service/AnonymizationRequestService"

export const getForgetMeRequestTableColumns = (isModal = false): ITableConfigProp => {
  const columns: TableColumnType = [
    {
      ...(!isModal && {
        render: (text: any, record: any) => (
          <Link to={`/forget-me-request/${record.AnonymizationRequestID}`}>
            <ReadOutlined />
          </Link>
        )
      })
    },
    { title: "Request Date", dataIndex: "RequestDate", render: renderDate },
    {
      title: "Person",
      dataIndex: "SortName",
      render: (text: any, record: any) => renderLink(`/person/${record.PersonID}`, text)
    },
    { title: "Email", dataIndex: "EmailAddress", render: renderEmail },
    { title: "Processed", dataIndex: "IsProcessed", render: renderBoolean },
    { title: "Processed Date", dataIndex: "ProcessingDate", render: renderDate }
  ]

  return { columns, searchFunc: getAnonymizeRequests, tableName: "ForgetMeRequestTableColumns" }
}
