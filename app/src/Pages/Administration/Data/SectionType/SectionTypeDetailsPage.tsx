import React from "react"
import { RouteComponentProps } from "react-router-dom"
import { DetailsPage } from "~/Component/Common/Page/DetailsPage2/DetailsPage"
import { getSectionTypeDetailsMeta } from "~/TableSearchMeta/SectionType/SectionTypeDetailsMeta"
import { getSectionTypeTableColumns } from "~/TableSearchMeta/SectionType/SectionTypeTypeTableColumns"

export default function SectionTypeDetailsPage(props: RouteComponentProps<{ SectiontypeID: string }>) {
  const SectiontypeID = Number(props?.match?.params?.SectiontypeID)
  return (
    <DetailsPage
      getMeta={getSectionTypeDetailsMeta}
      getDetails={() =>
        getSectionTypeTableColumns()
          .searchFunc({ SectiontypeID })
          .then((x) => {
            if (x.success) x.data = x.data[0]
            return x
          })
      }
      // entityType="Account"
      // entityID={SectiontypeID}
    />
  )
}
