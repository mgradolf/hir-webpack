import React, { useState } from "react"
import { Menu, Button } from "antd"
import SeatGroupRemoveLink from "~/Component/Section/SeatGroup/SeatGroupRemoveLink"
import UpdateSeatGroup from "~/Component/Section/SeatGroup/SectionSeatGroupFormModal"
import SeatGroupAffiliatedOrganizationModal from "~/Component/Section/SeatGroup/SeatGroupAffiliatedOrganizationModal"

interface ISeatGroupMenu {
  additionalData: { [key: string]: any }
}

export default function SeatGroupMenu(props: ISeatGroupMenu) {
  const [showUpdateModal, setShowUpdateModal] = useState(false)
  const [showAffiliatedModal, setShowAffiliatedModal] = useState(false)

  const sectionID = props.additionalData.SectionID
  const isDefault = props.additionalData.IsDefault
  const seatGroupID = props.additionalData.SeatGroupID
  const programID = props.additionalData.ProgramID
  const programCode = props.additionalData.ProgramCode
  const packageID = props.additionalData.PackageID

  return (
    <Menu>
      <Menu.Item key="0">
        <Button
          type="link"
          onClick={() => {
            setShowUpdateModal(true)
          }}
        >
          Edit
        </Button>
        {showUpdateModal && (
          <UpdateSeatGroup
            sectionId={sectionID}
            isDefault={isDefault}
            seatgroupId={seatGroupID}
            programId={programID}
            programCode={programCode}
            closeModal={() => setShowUpdateModal(false)}
          />
        )}
      </Menu.Item>
      <Menu.Item key="1">
        <SeatGroupRemoveLink seatgroupId={seatGroupID} />
      </Menu.Item>
      {!isDefault && !packageID && (
        <Menu.Item key="2">
          <Button
            type="link"
            onClick={() => {
              setShowAffiliatedModal(true)
            }}
          >
            Manage Affiliated Organization
          </Button>
          {showAffiliatedModal && (
            <SeatGroupAffiliatedOrganizationModal
              seatgroupId={seatGroupID}
              closeModal={() => setShowAffiliatedModal(false)}
            />
          )}
        </Menu.Item>
      )}
    </Menu>
  )
}
