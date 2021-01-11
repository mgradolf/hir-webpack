import React from "react"
import { RouteComponentProps } from "react-router-dom"
import { DetailsPage } from "~/Component/Common/Page/DetailsPage2/DetailsPage"
import { getTagsTabPageDetailsMeta } from "~/FormMeta/Tags/TagsTabPageDetailsMeta"

export default function (props: RouteComponentProps<{ offeringID: string }>) {
  const offeringID = Number(props.match.params.offeringID)
  return (
    <DetailsPage
      getMeta={getTagsTabPageDetailsMeta}
      getDetails={() =>
        Promise.resolve({
          code: 200,
          data: { EntityType: "Offering", EntityID: offeringID },
          success: true,
          error: false
        })
      }
    />
  )
}
