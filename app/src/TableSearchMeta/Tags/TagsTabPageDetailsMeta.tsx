import React from "react"
import { IDetailsMeta, IDetailsTabMeta } from "~/Component/Common/Page/DetailsPage2/Common"
import { getParentTagsTableColumns, getTagsTableColumns } from "~/TableSearchMeta/Tags/TagsTableColumns"
import { getParentTags } from "~/ApiServices/Service/TagService"
import { TagAddButton } from "~/TableSearchMeta/Tags/TagAddButton"
import { HelpButton } from "~/Component/Common/Form/Buttons/HelpButton"

export const getTagsTabPageDetailsMeta = (EntityType: string, EntityID: number, helpKey?: string): IDetailsMeta => {
  const meta: IDetailsTabMeta[] = []
  meta.push({
    tabTitle: `${EntityType} Tags`,
    tabType: "table",
    tabMeta: {
      blocks: [
        <>
          {EntityType && EntityID && (
            <TagAddButton EntityType={EntityType} EntityID={EntityID} eventName="REFRESH_CATALOGS_TAB" />
          )}
        </>,
        <>{helpKey && <HelpButton helpKey={helpKey} />}</>
      ],
      tableProps: {
        ...getTagsTableColumns(false, "REFRESH_CATALOGS_TAB"),
        searchParams: { EntityType, EntityID, IsSelected: true },
        refreshEventName: "REFRESH_CATALOGS_TAB"
      }
    }
  })
  meta.push({
    tabTitle: "Parent Tags",
    tabType: "table",
    tabMeta: {
      tableProps: {
        ...getParentTagsTableColumns(false),
        searchFunc: getParentTags,
        searchParams: { EntityType, EntityID, TagTypeID: [] },
        refreshEventName: "REFRESH_PACKAGES_TAB"
      }
    }
  })

  return {
    pageTitle: `Tags`,
    tabs: meta
  }
}
