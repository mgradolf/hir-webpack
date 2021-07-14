import { Button, Tooltip } from "antd"
import React, { useState } from "react"
import { RouteComponentProps } from "react-router-dom"
import { getSectionDetails, getSectionStatistics } from "~/ApiServices/Service/SectionService"
import { DetailsPage } from "~/Component/Common/Page/DetailsPage2/DetailsPage"
import { SectionCopyModal } from "~/Component/Feature/Section/Copy/SectionCopyModal"
import { getSectionDetailsMeta } from "~/TableSearchMeta/Section/SectionDetailsMeta"
import { CopyOutlined } from "@ant-design/icons"
import { SectionRosterReport } from "~/Component/Feature/Section/SectionRosterReport"

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
          <SectionRosterReport SectionID={SectionID} />
          <Tooltip title="Copy this section">
            <Button icon={<CopyOutlined />} shape="circle" type="primary" onClick={() => setShowModal(true)} />
          </Tooltip>
          {showModal && <SectionCopyModal closeModal={() => setShowModal(false)} SectionID={SectionID} />}
        </>
      ]}
    />
  )
}
