import { Button } from "antd"
import React, { useState } from "react"
import { RouteComponentProps } from "react-router-dom"
import { getSectionDetails, getSectionStatistics } from "~/ApiServices/Service/SectionService"
import { DetailsPage } from "~/Component/Common/Page/DetailsPage2/DetailsPage"
import { SectionCopyModal } from "~/Component/Feature/Section/Copy/SectionCopyModal"
import { getSectionDetailsMeta } from "~/TableSearchMeta/Section/SectionDetailsMeta"

export default function SectionDetailsPage(props: RouteComponentProps<{ sectionID?: string; offeringID?: string }>) {
  const [showModal, setShowModal] = useState(false)
  const SectionID = Number(props?.match?.params?.sectionID)

  const getSectionDetailsInfo = () => {
    return Promise.all([
      getSectionDetails({ SectionID: SectionID }),
      getSectionStatistics({ SectionID: SectionID })
    ]).then((responses) => {
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
      actions={[
        <>
          <Button type="primary" onClick={() => setShowModal(true)}>
            Copy
          </Button>
          {showModal && <SectionCopyModal closeModal={() => setShowModal(false)} SectionID={SectionID} />}
        </>
      ]}
    />
  )
}
