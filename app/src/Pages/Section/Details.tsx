import React, { useState } from "react"
import { RouteComponentProps } from "react-router-dom"
import { getSectionById } from "~/ApiServices/Service/EntityService"
import { StandardDetailsPage } from "~/Component/Common/Page/DetailsPage/StandardDetailsPage"
import { SectionEditLink } from "~/Component/Section/CreateEdit/SectionEditLink"
import { SectionMenu } from "~/Component/Section/SectionMenu"
import { getSectionDetailsMeta } from "~/FormMeta/Section/SectionDetailsMeta"

export default function SectionDetailsPage(props: RouteComponentProps<{ sectionID?: string }>) {
  const SectionID = Number(props?.match?.params?.sectionID)
  const [sectionDetails, setSectionDetails] = useState<{ [key: string]: any }>({})
  return (
    <StandardDetailsPage
      getDetailsMeta={getSectionDetailsMeta}
      getDetailsFunc={() => {
        return getSectionById(SectionID).then((response) => {
          setSectionDetails(response.data)
          return response
        })
      }}
      {...(sectionDetails && {
        actions: [
          <SectionMenu section={sectionDetails} />,
          <SectionEditLink section={sectionDetails} PrimaryType={true} />
        ]
      })}
    />
  )
}
