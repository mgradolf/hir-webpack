import React from "react"
import { Link } from "react-router-dom"
//TODO: fix columns
import { findSectionTypes } from "~/ApiServices/BizApi/account/accountIF"
import { ITableConfigProp } from "~/FormMeta/ITableConfigProp"

export const getSectionTypeTableColumns = (isModal = false): ITableConfigProp => {
  const columns: TableColumnType = [
    {
      render: (text: any, record: any) =>
          <Link to={`/section-type/${record.SectionTypeID}`}>
            <ReadOutlined />
          </Link>
    },  
    { title: "Section Type", dataIndex: "SectionTypeName"   },
    { title: "Section Type Description", dataIndex: "SectionTypeDescription" },
    { title: "Section Description", dataIndex: "Description" }
  ]
  return { columns, searchFunc: findSectionTypes, responsiveColumnIndices: [], expandableColumnIndices: [] }
}
