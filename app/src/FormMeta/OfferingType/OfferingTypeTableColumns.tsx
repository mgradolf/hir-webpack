import { findOfferingTypes } from "~/ApiServices/BizApi/query/queryIf"
import { renderBoolean, renderDetailsLink, TableColumnType } from "~/Component/Common/ResponsiveTable"
import { ITableConfigProp } from "~/FormMeta/ITableConfigProp"

export const getOfferingTypeTableColumns = (isModal = false): ITableConfigProp => {
  const columns: TableColumnType = [
    {
      render: (text: any, record: any) => renderDetailsLink(`/offering-type/${record.OfferingTypeID}`)
    },
    { title: "Offering Type", dataIndex: "OfferingTypeName" },
    { title: "Offering Name", dataIndex: "Name" },
    { title: "Department", dataIndex: "OrganizationName" }
  ]
  return { columns, searchFunc: findOfferingTypes, responsiveColumnIndices: [], expandableColumnIndices: [] }
}
