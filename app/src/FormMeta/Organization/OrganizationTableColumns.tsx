import { findPackages } from "~/ApiServices/Service/PackageService"
import { renderDate, TableColumnType } from "~/Component/Common/ResponsiveTable"
import { ITableConfigProp } from "~/FormMeta/ITableConfigProp"

export const getOrganizationTableColumns = (isModal = false): ITableConfigProp => {
  const columns: TableColumnType = [
    { title: "Package Name", dataIndex: "Name", render: undefined },
    { title: "Account", dataIndex: "AccountName", render: undefined },
    { title: "Start Date", dataIndex: "StartDate", render: renderDate },
    { title: "End Date", dataIndex: "EndDate", render: renderDate },
    { title: "PO Number", dataIndex: "PONumber", render: undefined },
    { title: "PO Date", dataIndex: "PODate", render: renderDate }
  ]

  const responsiveColumnIndices: number[] = []
  const expandableColumnIndices: number[] = []
  return { columns, responsiveColumnIndices, expandableColumnIndices, searchFunc: findPackages }
}
