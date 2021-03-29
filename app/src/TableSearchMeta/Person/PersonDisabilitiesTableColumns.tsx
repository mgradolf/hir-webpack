import { Switch } from "antd"
import React from "react"
import { getDisabilities, getPersonDisabilities, savePersonDisabilities } from "~/ApiServices/Service/PersonService"
import { TableColumnType } from "~/Component/Common/ResponsiveTable"
import { ITableConfigProp } from "~/TableSearchMeta/ITableConfigProp"
import { eventBus } from "~/utils/EventBus"

export const getPersonDisabilitiesTableColumns = (PersonID: number): ITableConfigProp => {
  const addOrRemoveDisabilities = (IsPublished: boolean, DisabilityTypeID: number) => {
    getPersonDisabilities({ PersonID })
      .then((response) => {
        const publishedRowData = []
        if (response && response.success) {
          for (let i = 0; i < response.data.length; i++) {
            publishedRowData.push(response.data[i].DisabilityTypeID)
          }
        }
        return publishedRowData
      })
      .then((result) => {
        if (IsPublished) {
          result.push(DisabilityTypeID)
        } else {
          const index = result.indexOf(DisabilityTypeID)
          result.splice(index, 1)
        }

        savePersonDisabilities({ PersonID: PersonID, DisabilityTypeIDs: result }).then((response) => {
          if (response && response.success) {
            eventBus.publish("REFRESH_DISABILITES_TAB")
          }
        })
      })
  }

  const columns: TableColumnType = [
    {
      title: "Name",
      dataIndex: "Name"
    },
    {
      title: "Action",
      dataIndex: "IsPublished",
      render: (text: any, record: any) => (
        <Switch checked={!!text} onChange={(e) => addOrRemoveDisabilities(e, record.ID)} />
      )
    }
  ]

  return { columns, searchFunc: getDisabilities, tableName: "PersonDisabilitiesTableColumns" }
}
