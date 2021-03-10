import React from "react"
import { RouteComponentProps } from "react-router-dom"
import { DetailsPage } from "~/Component/Common/Page/DetailsPage2/DetailsPage"
import { getSectionTypeDetailsMeta } from "~/TableSearchMeta/SectionType/SectionTypeDetailsMeta"
import { getSectionTypeTableColumns } from "~/TableSearchMeta/SectionType/SectionTypeTypeTableColumns"

export default function SectionTypeDetailsPage(props: RouteComponentProps<{ SectionTypeID: string }>) {
  const SectionTypeID = Number(props?.match?.params?.SectionTypeID)
  return (
    <DetailsPage
      getMeta={getSectionTypeDetailsMeta}
      getDetails={() =>
        getSectionTypeTableColumns()
          .searchFunc({ SectionTypeID })
          .then((x) => {
            if (x.success) x.data = x.data[0]
            return x
          })
      }
      // entityType="Account"
      // entityID={SectionTypeID}
    />
  )
}
