import { TableColumnType } from "~/Component/Common/ResponsiveTable"
import { ITableConfigProp } from "~/TableSearchMeta/ITableConfigProp"
import { getTags } from "~/ApiServices/Service/TagService"
import React from "react"
import { TagRemoveButton } from "~/TableSearchMeta/Tags/TagRemoveButton"
import { Link } from "react-router-dom"

export const getTagsTableColumns = (isModal = false, eventName: string): ITableConfigProp => {
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
        render: (text: any, record: any) => <TagRemoveButton eventName={eventName} tag={record} />
      })
    }
  ]

  return { columns, searchFunc: getTags, tableName: "TagsTableColumns" }
}

export const getParentTagsTableColumns = (isModal = false): ITableConfigProp => {
  const columns: TableColumnType = [
    {
      title: "Entity Type",
      dataIndex: "EntityType"
    },
    {
      title: "Entity Name",
      dataIndex: "EntityName"
    },
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

  return { columns, searchFunc: getTags }
}
