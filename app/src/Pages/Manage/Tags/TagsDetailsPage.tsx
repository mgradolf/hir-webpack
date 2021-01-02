import React from "react"
import { RouteComponentProps } from "react-router-dom"
import { getTags } from "~/ApiServices/Service/TagService"
import { DetailsPage } from "~/Component/Common/Page/DetailsPage2/DetailsPage"
import { getTagDetailsMeta } from "~/FormMeta/Tags/TagsDetailsMeta"

export const TagsDetailsPage = (props: RouteComponentProps<{ tagID: string }>) => {
  const TagID = Number(props.match.params.tagID)
  return (
    <DetailsPage
      getMeta={getTagDetailsMeta}
      getDetails={() =>
        getTags({ TagID }).then((x) => {
          if (x.success) x.data = x.data[0]
          return x
        })
      }
    />
  )
}
