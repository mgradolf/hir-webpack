import { findSectionTypes } from "~/ApiServices/BizApi/query/queryIf"
import { renderDetailsLink, TableColumnType } from "~/Component/Common/ResponsiveTable"
import { ITableConfigProp } from "~/TableSearchMeta/ITableConfigProp"

export const getSectionTypeTableColumns = (isModal = false): ITableConfigProp => {
  const columns: TableColumnType = [
    {
      dataIndex: "SectionTypeID",
      render: (text: any, record: any) => renderDetailsLink(`/section-type/${text}`)
    },
    { title: "Section Type", dataIndex: "SectionTypeName", width: 100 },
    { title: "Section Type Description", dataIndex: "SectionTypeDescription", width: 150 },
    { title: "Section Description", dataIndex: "Description", width: 200 }
  ]
  return { columns, searchFunc: findSectionTypes, responsiveColumnIndices: [], expandableColumnIndices: [] }
}
