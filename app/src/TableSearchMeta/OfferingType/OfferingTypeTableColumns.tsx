import { findOfferingTypes } from "~/ApiServices/BizApi/query/queryIf"
import { renderDetailsLink, TableColumnType } from "~/Component/Common/ResponsiveTable"
import { ITableConfigProp } from "~/TableSearchMeta/ITableConfigProp"

export const getOfferingTypeTableColumns = (isModal = false): ITableConfigProp => {
  const columns: TableColumnType = [
    {
      dataIndex: "OfferingTypeID",
      render: (text: any, record: any) => renderDetailsLink(`/offering-type/${text}`)
    },
    { title: "Offering Type", dataIndex: "OfferingTypeName" },
    { title: "Offering Name", dataIndex: "Name" },
    { title: "Department", dataIndex: "OrganizationName" }
  ]
  return { columns, searchFunc: findOfferingTypes, tableName: "OfferingTypeTableColumns" }
}
