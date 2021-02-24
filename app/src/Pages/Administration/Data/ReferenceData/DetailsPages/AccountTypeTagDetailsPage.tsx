import React from "react"
import { RouteComponentProps } from "react-router-dom"
import { getRefRecord } from "~/ApiServices/Service/RefLookupService"
import { DetailsPage } from "~/Component/Common/Page/DetailsPage2/DetailsPage"
import { getTagsTabPageDetailsMeta } from "~/TableSearchMeta/Tags/TagsTabPageDetailsMeta"

export default function AccountTypeTagDetailsPage(props: RouteComponentProps<{ ID: string }>) {
  const ID = Number(props?.match?.params?.ID)
  return (
    <DetailsPage
      getMeta={(data, type, id) => {
        const __ = getTagsTabPageDetailsMeta(data, type, id)
        return {
          pageTitle: __.pageTitle,
          tabs: [__.tabs[0]]
        }
      }}
      getDetails={() => getRefRecord({ LookUpName: "AccountType", ID })}
      entityType="AccountType"
      entityID={ID}
    />
  )
}
