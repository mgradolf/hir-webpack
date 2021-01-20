import { findSectionTypes } from "~/ApiServices/BizApi/query/queryIf"
import { renderDetailsLink, TableColumnType } from "~/Component/Common/ResponsiveTable"
import { ITableConfigProp } from "~/FormMeta/ITableConfigProp"

export const getSectionTypeTableColumns = (isModal = false): ITableConfigProp => {
  const columns: TableColumnType = [
    {
      render: (text: any, record: any) => renderDetailsLink(`/section-type/${record.SectionTypeID}`)
    },
    { title: "Section Type", dataIndex: "SectionTypeName" },
    { title: "Section Type Description", dataIndex: "SectionTypeDescription" },
    { title: "Section Description", dataIndex: "Description" }
  ]
  return { columns, searchFunc: findSectionTypes, responsiveColumnIndices: [], expandableColumnIndices: [] }
}
