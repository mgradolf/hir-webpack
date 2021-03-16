import React from "react"
import { Switch } from "antd"
import { RouteComponentProps } from "react-router-dom"
import { findAvailableCreditType, saveCreditType } from "~/ApiServices/Service/GradingService"
import { SearchPage } from "~/Component/Common/Page/SearchPage"
import { TableColumnType } from "~/Component/Common/ResponsiveTable"
import { eventBus } from "~/utils/EventBus"

let creditTypeIDs: number[] = []
const refreshEventName = "REFRESH_TranscriptTypeCreditDetailsPage"
const getColumns = (TranscriptTypeID: number, IDs: number[]): TableColumnType => [
  {
    title: "CreditName",
    dataIndex: "CreditTypeDescriptor"
  },
  {
    title: "Attach",
    dataIndex: "isPublished",
    render: (text: any, record: any) => (
      <Switch
        defaultChecked={record.IsSelected}
        onChange={(event) => {
          if (event) {
            console.log(creditTypeIDs)
            creditTypeIDs.push(record.CreditTypeID)
          } else {
            const index = creditTypeIDs.indexOf(record.CreditTypeID)
            creditTypeIDs.splice(index, 1)
          }
          saveCreditType({ TranscriptTypeID, SelectedCreditTypeIDs: creditTypeIDs }).then((x) => {
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
      title={`Transcript Credit Types`}
      hideSearchField={false}
      defaultFormValue={{ TranscriptTypeID: ID }}
      tableProps={{
        columns: getColumns(ID, []),
        searchFunc: (Params) =>
          findAvailableCreditType(Params).then((x) => {
            if (x.success) {
              creditTypeIDs = x.data
                .filter((credit: any) => credit.IsSelected)
                .map((credit: any) => credit.CreditTypeID)
            }
            return x
          }),
        refreshEventName
      }}
    />
  )
}
