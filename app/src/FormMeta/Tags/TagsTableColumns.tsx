import { TableColumnType } from "~/Component/Common/ResponsiveTable"
import { ITableConfigProp } from "~/FormMeta/ITableConfigProp"
import { getTags } from "~/ApiServices/Service/TagService"
import React from "react"
import { TagRemoveButton } from "~/FormMeta/Tags/TagRemoveButton"
import { Link } from "react-router-dom"

export const getTagsTableColumns = (isModal = false): ITableConfigProp => {
  const columns: TableColumnType = [
    {
      title: "Tag Name",
      dataIndex: "Name",
      render: (text: any, record: any) => <Link to={`/tags/${record.TagID}`}>{text}</Link>
    },
    {
      title: "Tag Type",
      dataIndex: "TagType"
    },
    {
      ...(!isModal && {
        title: "Action",
        dataIndex: "isChecked",
        key: "isChecked",
        render: (text: any, record: any) => <TagRemoveButton tag={record} />
      })
    }
  ]

  const responsiveColumnIndices: number[] = []
  const expandableColumnIndices: number[] = []
  return { columns, responsiveColumnIndices, expandableColumnIndices, searchFunc: getTags }
}

export const getParentTagsTableColumns = (isModal = false): ITableConfigProp => {
  const columns: TableColumnType = [
    {
      title: "Tag Type",
      dataIndex: "TagType"
    },
    {
      title: "Tag Name",
      dataIndex: "Tag",
      render: (text: any, record: any) => <Link to={`/tags/${record.TagID}`}>{text}</Link>
    }
  ]

  const responsiveColumnIndices: number[] = []
  const expandableColumnIndices: number[] = []
  return { columns, responsiveColumnIndices, expandableColumnIndices, searchFunc: getTags }
}
