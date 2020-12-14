import React from "react"
import { RouteComponentProps } from "react-router-dom"
import { getSectionDetails, getSectionStatistics } from "~/ApiServices/Service/SectionService"
import { DetailsPage } from "~/Component/Common/Page/DetailsPage2/DetailsPage"
import { getSectionDetailsMeta } from "~/FormMeta/Section/SectionDetailsMeta"

export default function SectionDetailsPage(props: RouteComponentProps<{ sectionID?: string; offeringID?: string }>) {
  const SectionID = Number(props?.match?.params?.sectionID)

  const getSectionDetailsInfo = () => {
    return Promise.all([getSectionDetails(SectionID), getSectionStatistics(SectionID)]).then((responses) => {
      const response1 = responses[0]
      const response2 = responses[1]
      if (response1.success && response2.success) {
        response2.data = {
          ...response2.data,
          ...response1.data
        }
        return response2
      } else if (response2.success) {
        return response2
      } else {
        return response1
      }
    })
  }

  return (
    <DetailsPage
      getMeta={getSectionDetailsMeta}
      getDetails={getSectionDetailsInfo}
      entityType="Section"
      entityID={SectionID}
      titleKey="SectionNumber"
    />
  )
}
