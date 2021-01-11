import React from "react"
import { RouteComponentProps } from "react-router-dom"
import { DetailsPage } from "~/Component/Common/Page/DetailsPage2/DetailsPage"
import { getTagsTabPageDetailsMeta } from "~/FormMeta/Tags/TagsTabPageDetailsMeta"

export default function (props: RouteComponentProps<{ sectionID: string }>) {
  const sectionID = Number(props.match.params.sectionID)
  return (
    <DetailsPage
      getMeta={getTagsTabPageDetailsMeta}
      getDetails={() =>
        Promise.resolve({
          code: 200,
          data: { EntityType: "Section", EntityID: sectionID },
          success: true,
          error: false
        })
      }
    />
  )
}
