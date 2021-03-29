import { TableColumnType } from "~/Component/Common/ResponsiveTable"
import { ITableConfigProp } from "~/TableSearchMeta/ITableConfigProp"
import { findSystemConfiguration } from "~/ApiServices/BizApi/query/queryIf"

export const getSystemConfigurationTableColumns = (): ITableConfigProp => {
  const columns: TableColumnType = [
    {
      title: "Group Name",
      dataIndex: "GroupName"
    },
    {
      title: "Name",
      dataIndex: "Name"
    },
    {
      title: "Description",
      dataIndex: "Description"
    },
    {
      title: "Current Value",
      dataIndex: "CurrentValue"
    }
  ]

  return { columns, searchFunc: findSystemConfiguration, tableName: "SystemConfigurationTableColumns" }
}
