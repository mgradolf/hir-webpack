import React from "react"
import { Link } from "react-router-dom"
import {
  renderBoolean,
  renderDate,
  renderDetailsLink,
  renderEmail,
  TableColumnType
} from "~/Component/Common/ResponsiveTable"
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
    { title: "Request Date", dataIndex: "RequestDate", render: renderDate },
    {
      title: "Person",
      dataIndex: "SortName",
      render: (text: any, record: any) => renderDetailsLink(`/person/${record.PersonID}`)
    },
    { title: "Email", dataIndex: "EmailAddress", render: renderEmail },
    { title: "Processed", dataIndex: "IsProcessed", render: renderBoolean },
    { title: "Processed Date", dataIndex: "ProcessingDate", render: renderDate }
  ]

  const responsiveColumnIndices: number[] = []
  const expandableColumnIndices: number[] = []
  return { columns, responsiveColumnIndices, expandableColumnIndices, searchFunc: getAnonymizeRequests }
}
