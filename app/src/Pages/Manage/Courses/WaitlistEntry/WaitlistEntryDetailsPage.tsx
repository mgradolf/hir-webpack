import React from "react"
import { RouteComponentProps } from "react-router-dom"
import { findWaitListEntries } from "~/ApiServices/BizApi/registration/waitlistIF"
import { DetailsPage } from "~/Component/Common/Page/DetailsPage2/DetailsPage"
import { getWaitlistEntriesDetailsMeta } from "~/TableSearchMeta/WaitlistEntries/WaitlistEntriesDetailsMeta"

export default function (props: RouteComponentProps<{ waitListEntryID: string }>) {
  const WaitListEntryID = Number(props?.match?.params?.waitListEntryID)
  return (
    <DetailsPage
      getMeta={getWaitlistEntriesDetailsMeta}
      getDetails={() =>
        findWaitListEntries({ WaitListEntryID }).then((x) => {
          if (x.success) x.data = x.data[0]
          return x
        })
      }
    />
  )
}
