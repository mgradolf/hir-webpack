import React from "react"
import { RouteComponentProps } from "react-router-dom"
import { DetailsPage } from "~/Component/Common/Page/DetailsPage2/DetailsPage"
import { getMembershipDetailsMeta } from "~/FormMeta/Membership/MembershipDetailsMeta"
import { getMembershipTableColumns } from "~/FormMeta/Membership/MembershipTableColumns"

export default function MembershipsDetailsPage(props: RouteComponentProps<{ MembershipID: string }>) {
  const MembershipID = Number(props?.match?.params?.MembershipID)
  return (
    <DetailsPage
      getMeta={getMembershipDetailsMeta}
      getDetails={() =>
        getMembershipTableColumns()
          .searchFunc({ MembershipID })
          .then((x) => {
            if (x.success) x.data = x.data[0]
            return x
          })
      }
      entityType="Account"
      entityID={MembershipID}
    />
  )
}
