import { IDetailsMeta, IDetailsTabMeta } from "~/Component/Common/Page/DetailsPage2/Common"
import { getParentTagsTableColumns, getTagsTableColumns } from "~/FormMeta/Tags/TagsTableColumns"
import { getParentTags } from "~/ApiServices/Service/TagService"
import { getTagsSearchMeta } from "~/FormMeta/Tags/TagsSearchMeta"

export const getTagsTabPageDetailsMeta = (Params: { [key: string]: any }): IDetailsMeta => {
  const meta: IDetailsTabMeta[] = []
  const EntityType = Params.EntityType
  const EntityID = Params.EntityID
  meta.push({
    tabTitle: `${EntityType} Tags`,
    tabType: "searchtable",
    tabMeta: {
      searchMeta: getTagsSearchMeta(EntityType, EntityID),
      tableProps: {
        ...getTagsTableColumns(false),
        searchParams: { EntityType, EntityID },
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
