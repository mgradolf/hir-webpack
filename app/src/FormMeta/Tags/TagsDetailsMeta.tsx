import React from "react"
import { Link } from "react-router-dom"
import { findTagContent } from "~/ApiServices/Service/TagService"
import { CardContainer } from "~/Component/Common/Page/DetailsPage/DetailsPageInterfaces"
import { IDetailsMeta, IDetailsTabMeta } from "~/Component/Common/Page/DetailsPage2/Common"
import { IDetailsCustomTabProp } from "~/Component/Common/Page/DetailsPage2/DetailsCustomTab"
import { renderBoolean, sortByString } from "~/Component/Common/ResponsiveTable"
import { TagAddDropdown } from "~/FormMeta/Tags/TagAddDropdown"
import { TagRemoveButton } from "~/FormMeta/Tags/TagRemoveButton"
import { QuestionTaggingPage } from "~/Pages/Manage/Question/QuestionTaggingPage"

export const getTagDetailsMeta = (Tag: { [key: string]: any }): IDetailsMeta => {
  const tabMeta: IDetailsTabMeta[] = []
  const summary: CardContainer = {
    contents: [
      { label: "Tag Type", value: Tag.TagType },
      { label: "Description", value: Tag.Description },
      { label: "Active", value: Tag.IsActive, render: renderBoolean },
      { label: "Sort Position", value: Tag.SortTypeName }
    ]
  }

  tabMeta.push({
    tabTitle: "Summary",
    tabType: "summary",
    tabMeta: {
      summary: [summary]
    }
  })

  tabMeta.push({
    tabTitle: "Content",
    tabType: "table",
    tabMeta: {
      blocks: [<TagAddDropdown TagID={Tag.TagID} eventName="REFRESH_TAGS_CONTENT_TABLE" />],
      tableProps: {
        columns: [
          {
            title: "Type",
            dataIndex: "ContentType",
            sorter: (a: any, b: any) => sortByString(a.ContentType, b.ContentType)
          },
          {
            title: "Name",
            dataIndex: "ContentName",
            sorter: (a: any, b: any) => sortByString(a.ContentName, b.ContentName),
            render: (text: any, record: any) => <Link to={`/${record.ContentType}/${record.ContentID}`}>{text}</Link>
          },
          {
            title: "Action",
            render: (text: any, record: any) => (
              <TagRemoveButton
                tag={{
                  EntityType: record.ContentType,
                  EntityID: record.ContentID,
                  TagID: record.TagID,
                  IsActive: true
                }}
                eventName="REFRESH_TAGS_CONTENT_TABLE"
              />
            )
          }
        ],
        searchFunc: findTagContent,
        searchParams: { TagID: Tag.TagID },
        refreshEventName: "REFRESH_TAGS_CONTENT_TABLE"
      }
    }
  })

  const scheduleMeta: IDetailsCustomTabProp = {
    component: QuestionTaggingPage,
    props: { TagID: Tag.TagID }
  }
  tabMeta.push({
    tabTitle: "Event Questions",
    tabType: "custom",
    tabMeta: scheduleMeta
  })

  return {
    pageTitle: `${Tag.TagType} - ${Tag.Name}`,
    tabs: tabMeta
  }
}
