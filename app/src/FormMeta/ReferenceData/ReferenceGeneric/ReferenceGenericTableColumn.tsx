import React from "react"
import { getRefList } from "~/ApiServices/Service/RefLookupService"
import { renderBoolean, TableColumnType } from "~/Component/Common/ResponsiveTable"
import { ITableConfigProp } from "~/FormMeta/ITableConfigProp"
import { UpdateRefButton, RemoveRefButton } from "~/FormMeta/ReferenceData/ReferenceButtons"

export const getReferenceGenericTableColumn = (refName: string, refreshEventName: string): ITableConfigProp => {
  const columns: TableColumnType = [
    {
      title: "ID",
      dataIndex: "ID"
    },
    {
      title: "Name",
      dataIndex: "Name"
    },
    { title: "Description", dataIndex: "Description" },
    { title: "Active", dataIndex: "IsActive", render: renderBoolean },
    { title: "Sort Position", dataIndex: "SortPosition" },
    {
      title: "Actions",
      dataIndex: "ID",
      render: (ID: any, record: any) => (
        <>
          <UpdateRefButton LookUpName={refName} reference={record} refreshEventName={refreshEventName} />
          <RemoveRefButton LookUpName={refName} ID={ID} refreshEventName={refreshEventName} />
        </>
      )
    }
  ]
  return { columns, searchFunc: getRefList, refreshEventName }
}
