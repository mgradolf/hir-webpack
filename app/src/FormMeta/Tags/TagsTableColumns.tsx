import { TableColumnType } from "~/Component/Common/ResponsiveTable"
import { ITableConfigProp } from "~/FormMeta/ITableConfigProp"
import { getTags } from "~/ApiServices/Service/TagService"
import React from "react"
import { TagAddRemoveSwitch } from "~/FormMeta/Tags/TagAddRemoveSwitch"

export const getTagsTableColumns = (isModal = false): ITableConfigProp => {
  const columns: TableColumnType = [
    {
      title: "Tag type",
      dataIndex: "TagType"
    },
    {
      title: "Tag",
      dataIndex: "Name"
    },
    {
      title: "Status",
      dataIndex: "isChecked",
      key: "isChecked",
      render: (text: any, record: any) => (
        <TagAddRemoveSwitch tag={record} />
        // <Switch
        //   defaultChecked={!!text}
        //   onClick={async (checked, e) => {
        //     if (props.select && record && record.ID && typeof record.ID === "number") {
        //       const response = await props.select(record, checked)
        //       if (!response.success) {
        //         console.log(response)
        //       }
        //     }
        //   }}
        // />
      )
    }
  ]

  const responsiveColumnIndices: number[] = []
  const expandableColumnIndices: number[] = []
  return { columns, responsiveColumnIndices, expandableColumnIndices, searchFunc: getTags }
}

export const getParentTagsTableColumns = (isModal = false): ITableConfigProp => {
  const columns: TableColumnType = [
    {
      title: "Tag type",
      dataIndex: "TagType"
    },
    {
      title: "Tag",
      dataIndex: "Tag"
    }
  ]

  const responsiveColumnIndices: number[] = []
  const expandableColumnIndices: number[] = []
  return { columns, responsiveColumnIndices, expandableColumnIndices, searchFunc: getTags }
}
