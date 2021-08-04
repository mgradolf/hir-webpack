import React from "react"
import { RouteComponentProps } from "react-router-dom"
import { getRefRecord } from "~/ApiServices/Service/RefLookupService"
import { DetailsPage } from "~/Component/Common/Page/DetailsPage2/DetailsPage"
import { getTagsTabPageDetailsMeta } from "~/TableSearchMeta/Tags/TagsTabPageDetailsMeta"

export default function LookupTagDetailsPage(props: RouteComponentProps<{ LookUpName: string; ID: string }>) {
  const ID = Number(props?.match?.params?.ID)
  const LookUpName = props?.match?.params?.LookUpName
  return (
    <DetailsPage
      getMeta={(data, type, id) => {
        const __ = getTagsTabPageDetailsMeta(LookUpName, ID)
        return {
          pageTitle: __.pageTitle,
          tabs: [__.tabs[0]]
        }
      }}
      getDetails={() => getRefRecord({ LookUpName, ID })}
      entityType={LookUpName}
      entityID={ID}
    />
  )
}
