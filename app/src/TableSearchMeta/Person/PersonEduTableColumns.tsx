import React from "react"
import { Button, Dropdown } from "antd"
import { findPersonEducationHist } from "~/ApiServices/Service/PersonService"
import { renderDate, TableColumnType } from "~/Component/Common/ResponsiveTable"
import { ITableConfigProp } from "~/TableSearchMeta/ITableConfigProp"
import { DownOutlined } from "@ant-design/icons"
import PersonEduMenu from "~/Component/Person/PersonEduMenu"

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
      render: (record: any) => (
        <Dropdown overlay={<PersonEduMenu PersonID={record.PersonID} initialData={record} />} trigger={["click"]}>
          <Button type="primary" onClick={(e) => e.preventDefault()}>
            Go To <DownOutlined />
          </Button>
        </Dropdown>
      )
    }
  ]

  return { columns, searchFunc: findPersonEducationHist, tableName: "PersonEduTableColumns" }
}
