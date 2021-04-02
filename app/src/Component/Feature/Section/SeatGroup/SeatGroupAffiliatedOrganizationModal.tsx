import * as React from "react"
import Modal from "~/Component/Common/Modal/index2"
import { useEffect, useState } from "react"
import SeatGroupAffiliateOrganizationForm from "~/Component/Feature/Section/SeatGroup/SeatGroupAffiliateOrganizationForm"
import { findAffiliatedOrgsForSeatGroup, findAvailableAffiliatedOrgs } from "~/ApiServices/Service/SeatGroupService"

interface ISeatGroupAffiliatedOrganizationProps {
  seatgroupId: number
  closeModal?: () => void
}

export default function SeatGroupAffiliatedOrganization({
  seatgroupId,
  closeModal
}: ISeatGroupAffiliatedOrganizationProps) {
  const [sectionSeatGroupLoading, setSectionSeatGroupLoading] = useState(false)
  const [affiliatedOrganization, setAffiliatedOrganization] = useState<Array<any>>([])
  const [apiCallInProgress, setApiCallInProgress] = useState(false)
  const [targetKeys, setTargetKeys] = useState<any[]>([])

  const handleCancel = () => {
    if (closeModal) {
      closeModal()
    }
  }

  useEffect(() => {
    if (seatgroupId) {
      ;(async () => {
        setSectionSeatGroupLoading(true)
        const response = await findAvailableAffiliatedOrgs({ SeatGroupID: seatgroupId })
        if (response && response.success && Array.isArray(response.data)) {
          response.data.map((x: any) => {
            affiliatedOrganization.push({
              key: x.AccountID,
              title: x.AccountDescriptor
            })
            return affiliatedOrganization
          })
          setAffiliatedOrganization(affiliatedOrganization)
        } else {
          if (closeModal) {
            closeModal()
          }
        }
        setSectionSeatGroupLoading(false)
      })()
      ;(async () => {
        const response = await findAffiliatedOrgsForSeatGroup({ SeatGroupID: seatgroupId })
        if (response && response.success && Array.isArray(response.data)) {
          response.data.map((x: any) => {
            affiliatedOrganization.push({
              key: x.AccountID,
              title: x.AccountDescriptor
            })
            return affiliatedOrganization
          })
          setTargetKeys(
            response.data.map((x: any) => {
              return x.AccountID
            })
          )
          setAffiliatedOrganization(affiliatedOrganization)
        }
      })()
    }
  }, [seatgroupId, closeModal, affiliatedOrganization])

  return (
    <Modal
      width="800px"
      loading={sectionSeatGroupLoading}
      apiCallInProgress={apiCallInProgress}
      children={
        <>
          <SeatGroupAffiliateOrganizationForm
            seatgroupId={seatgroupId}
            targetKeys={targetKeys}
            dataSource={affiliatedOrganization}
            handleCancel={handleCancel}
            setApiCallInProgress={setApiCallInProgress}
          />
        </>
      }
    />
  )
}
