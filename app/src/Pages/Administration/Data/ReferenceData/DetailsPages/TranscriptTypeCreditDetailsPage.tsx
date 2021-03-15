import React from "react"
import { Switch } from "antd"
import { RouteComponentProps } from "react-router-dom"
import { findAvailableCreditType, saveCreditType } from "~/ApiServices/Service/GradingService"
import { SearchPage } from "~/Component/Common/Page/SearchPage"
import { TableColumnType } from "~/Component/Common/ResponsiveTable"
import { eventBus } from "~/utils/EventBus"

const refreshEventName = "REFRESH_TranscriptTypeCreditDetailsPage"
const getColumns = (TranscriptTypeID: number, IDs: number[]): TableColumnType => [
  {
    title: "CreditName",
    dataIndex: "Name"
  },
  {
    title: "Attach",
    dataIndex: "isPublished",
    render: (text: any, record: any) => (
      <Switch
        checked={!!text}
        onChange={(event) => {
          if (event) {
            IDs.push(record.ID)
          } else {
            const index = IDs.indexOf(record.ID)
            IDs.splice(index, 1)
          }
          saveCreditType({ TranscriptTypeID, SelectedCreditTypeIDs: IDs }).then((x) => {
            eventBus.publish(refreshEventName)
          })
        }}
      />
    )
  }
]

export default function TranscriptTypeCreditDetailsPage(props: RouteComponentProps<{ ID: string }>) {
  const ID = Number(props?.match?.params?.ID)
  return (
    <SearchPage
      title={`Credit Types of `}
      hideSearchField={false}
      defaultFormValue={{ TranscriptTypeID: ID }}
      tableProps={{
        columns: getColumns(ID, []),
        searchFunc: findAvailableCreditType,
        refreshEventName
      }}
    />
  )
}
