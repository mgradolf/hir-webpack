import * as React from "react"
import Modal from "~/Component/Common/Modal"
import { useEffect, useState } from "react"
import SeatGroupAffiliateOrganizationForm from "~/Component/Section/SeatGroup/SeatGroupAffiliateOrganizationForm"
import { connect } from "react-redux"
import { Dispatch } from "redux"
import { showSeatGroupAffiliateOrganizationModal } from "~/Store/ModalState"
import { findAffiliatedOrgsForSeatGroup, findAvailableAffiliatedOrgs } from "~/ApiServices/Service/SeatGroupService"

interface ISeatGroupAffiliatedOrganizationProps {
  seatgroupId: number
  closeSeatGroupAffiliatedOrganizationModal?: () => void
}

function SeatGroupAffiliatedOrganization({
  seatgroupId,
  closeSeatGroupAffiliatedOrganizationModal
}: ISeatGroupAffiliatedOrganizationProps) {
  const [sectionSeatGroupLoading, setSectionSeatGroupLoading] = useState(false)
  const [affiliatedOrganization, setAffiliatedOrganization] = useState<Array<any>>([])
  const [apiCallInProgress, setApiCallInProgress] = useState(false)
  const [targetKeys, setTargetKeys] = useState<any[]>([])

  const handleCancel = () => {
    if (closeSeatGroupAffiliatedOrganizationModal) {
      closeSeatGroupAffiliatedOrganizationModal()
    }
  }

  useEffect(() => {
    if (seatgroupId) {
      ;(async () => {
        setSectionSeatGroupLoading(true)
        const response = await findAvailableAffiliatedOrgs(seatgroupId)
        if (response && response.success && Array.isArray(response.data)) {
          response.data.map((x) => {
            affiliatedOrganization.push({
              key: x.AccountID,
              title: x.AccountDescriptor
            })
            return affiliatedOrganization
          })
          setAffiliatedOrganization(affiliatedOrganization)
        } else {
          if (closeSeatGroupAffiliatedOrganizationModal) {
            closeSeatGroupAffiliatedOrganizationModal()
          }
        }
        setSectionSeatGroupLoading(false)
      })()
      ;(async () => {
        const response = await findAffiliatedOrgsForSeatGroup(seatgroupId)
        if (response && response.success && Array.isArray(response.data)) {
          response.data.map((x) => {
            affiliatedOrganization.push({
              key: x.AccountID,
              title: x.AccountDescriptor
            })
            return affiliatedOrganization
          })
          setTargetKeys(
            response.data.map((x) => {
              return x.AccountID
            })
          )
          setAffiliatedOrganization(affiliatedOrganization)
        }
      })()
    }
  }, [seatgroupId, closeSeatGroupAffiliatedOrganizationModal, affiliatedOrganization])

  return (
    <Modal
      showModal={true}
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

const mapDispatchToProps = (dispatch: Dispatch) => {
  return { closeSeatGroupAffiliatedOrganizationModal: () => dispatch(showSeatGroupAffiliateOrganizationModal(false)) }
}

export default connect(undefined, mapDispatchToProps)(SeatGroupAffiliatedOrganization)
