import { getRefList } from "~/ApiServices/Service/RefLookupService"
import { renderBoolean, TableColumnType } from "~/Component/Common/ResponsiveTable"
import { ITableConfigProp } from "~/FormMeta/ITableConfigProp"

export const getReferenceGenericTableColumn = (refName: string): ITableConfigProp => {
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
    { title: "Sort Position", dataIndex: "SortPosition" }
  ]
  return { columns, searchFunc: getRefList }
}
