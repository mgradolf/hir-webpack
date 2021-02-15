import { findBuildings } from "~/ApiServices/BizApi/query/queryIf"
import { renderLink, TableColumnType } from "~/Component/Common/ResponsiveTable"
import { ITableConfigProp } from "~/TableSearchMeta/ITableConfigProp"

export const getBuildingTypeTableColumns = (isModal = false): ITableConfigProp => {
  const columns: TableColumnType = [
    {
      title: "Building Number",
      dataIndex: "BuildingNumber",
      render: (text: any, record: any) => renderLink(`/building/${record.BuildingID}`, text, isModal)
    },
    { title: "Building Name", dataIndex: "Name" },
    {
      title: "Site",
      dataIndex: "SiteName",
      render: (text: any, record: any) => renderLink(`/site/${record.SiteID}`, text, isModal)
    }
  ]
  return { columns, searchFunc: findBuildings, responsiveColumnIndices: [], expandableColumnIndices: [] }
}
