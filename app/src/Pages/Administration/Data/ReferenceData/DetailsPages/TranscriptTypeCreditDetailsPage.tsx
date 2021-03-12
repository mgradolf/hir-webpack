import React from "react"
import { Switch } from "antd"
import { IApiResponse } from "@packages/api/lib/utils/Interfaces"
import { RouteComponentProps } from "react-router-dom"
import { saveCreditType } from "~/ApiServices/Service/GradingService"
import { SearchPage } from "~/Component/Common/Page/SearchPage"
import { TableColumnType } from "~/Component/Common/ResponsiveTable"
import { eventBus } from "~/utils/EventBus"

const getCreditTypeOfTranscripts = (Params: { [key: string]: any }): Promise<IApiResponse> =>
  Promise.resolve({ code: 200, success: true, data: [], error: false })

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
      tableProps={{
        columns: getColumns(ID, []),
        searchFunc: getCreditTypeOfTranscripts,
        refreshEventName
      }}
    />
  )
}
