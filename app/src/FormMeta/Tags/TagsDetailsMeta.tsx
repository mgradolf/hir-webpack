import React from "react"
import { Link } from "react-router-dom"
import { findTagContent } from "~/ApiServices/Service/TagService"
import { CardContainer } from "~/Component/Common/Page/DetailsPage/DetailsPageInterfaces"
import { IDetailsMeta, IDetailsTabMeta } from "~/Component/Common/Page/DetailsPage2/Common"
import { renderBoolean, sortByString } from "~/Component/Common/ResponsiveTable"
import { TagAddDropdown } from "~/FormMeta/Tags/TagAddDropdown"
import { TagRemoveButton } from "~/FormMeta/Tags/TagRemoveButton"

export const getTagDetailsMeta = (Tag: { [key: string]: any }): IDetailsMeta => {
  const tabMeta: IDetailsTabMeta[] = []
  const summary: CardContainer = {
    contents: [
      // { label: "Name", value: Tag.Name },
      { label: "Description", value: Tag.Description },
      { label: "Active", value: Tag.IsActive, render: renderBoolean },
      { label: "Sort Position", value: Tag.SortTypeName }
    ]
  }

  tabMeta.push({
    tabTitle: "Summary",
    tabType: "summary",
    tabMeta: {
      actions: [<TagAddDropdown TagID={Tag.TagID} />],
      summary: [summary]
    }
  })

  tabMeta.push({
    tabTitle: "Content",
    tabType: "table",
    tabMeta: {
      tableProps: {
        columns: [
          {
            title: "Name",
            dataIndex: "ContentName",
            sorter: (a: any, b: any) => sortByString(a.ContentName, b.ContentName)
          },
          {
            title: "Type",
            dataIndex: "ContentType",
            sorter: (a: any, b: any) => sortByString(a.ContentType, b.ContentType)
          },
          {
            title: "Code",
            dataIndex: "ContentCode",
            sorter: (a: any, b: any) => sortByString(a.ContentCode, b.ContentCode),
            render: (text: any, record: any) => <Link to={`/${record.ContentType}/${record.ContentID}`}>{text}</Link>
          },
          {
            title: "Action",
            render: (text: any, record: any) => (
              <TagRemoveButton
                tag={{
                  EntityType: record.ContentType,
                  EntityID: record.ContentID,
                  TagId: record.TagID,
                  IsActive: true
                }}
              />
            )
          }
        ],
        searchFunc: findTagContent,
        searchParams: { TagID: Tag.TagID }
      }
    }
  })

  return {
    pageTitle: `Tag - ${Tag.Name}`,
    tabs: tabMeta
  }
}
