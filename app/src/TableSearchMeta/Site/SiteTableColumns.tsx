import { findSites } from "~/ApiServices/BizApi/query/queryIf"
import { renderLink, TableColumnType } from "~/Component/Common/ResponsiveTable"
import { ITableConfigProp } from "~/TableSearchMeta/ITableConfigProp"

export const getSiteTableColumns = (isModal = false): ITableConfigProp => {
  const columns: TableColumnType = [
    {
      title: "Site Code",
      dataIndex: "SiteCode",
      render: (text: any, record: any) => renderLink(`/site/${record.SiteID}`, text, isModal)
    },
    { title: "Site Name", dataIndex: "Name" },
    {
      title: "Parent Organization",
      dataIndex: "OrganizationName",
      render: (text: any, record: any) => renderLink(`/organization/${record.OrganizationID}`, text, isModal)
    }
  ]

  return { columns, searchFunc: findSites, responsiveColumnIndices: [], expandableColumnIndices: [] }
}
