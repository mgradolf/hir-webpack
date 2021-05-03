import React from "react"
import { findPersonEducationHist } from "~/ApiServices/Service/PersonService"
import { renderDate, TableColumnType } from "~/Component/Common/ResponsiveTable"
import { ITableConfigProp } from "~/TableSearchMeta/ITableConfigProp"
import PersonEduMenu from "~/Component/Feature/Person/PersonEduMenu"

export const getPersonEduTableColumns = (): ITableConfigProp => {
  const columns: TableColumnType = [
    { title: "Start", dataIndex: "StartDate", render: renderDate },
    { title: "End", dataIndex: "EndDate", render: renderDate },
    { title: "Institution", dataIndex: "EstablishmentName" },
    { title: "Program", dataIndex: "CredentialName" },
    { title: "Degree", dataIndex: "CredentialType" },
    {
      title: "Action",
      key: "action",
      render: (record: any) => <PersonEduMenu PersonID={record.PersonID} initialData={record} />
    }
  ]

  return { columns, searchFunc: findPersonEducationHist, tableName: "PersonEduTableColumns" }
}
