import React from "react"
import { connect } from "react-redux"
import { showSeatGroupAffiliateOrganizationModal } from "~/Store/ModalState"
import { Dispatch } from "redux"
import { Button } from "antd"

interface ISeatGroupAffiliateLinkProp {
  seatgroupId: number
  openSeatGroupAffiliateOrganizationModal: (seatgroupId: number) => void
}
function SeatGroupAffiliateLink(props: ISeatGroupAffiliateLinkProp) {
  return (
    <Button
      type="link"
      onClick={() => {
        props.openSeatGroupAffiliateOrganizationModal(props.seatgroupId)
      }}
    >
      Manage Affiliated Organization
    </Button>
  )
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    openSeatGroupAffiliateOrganizationModal: (seatgroupId: number) => {
      return dispatch(showSeatGroupAffiliateOrganizationModal(true, { seatgroupId }))
    }
  }
}

export default connect(null, mapDispatchToProps)(SeatGroupAffiliateLink)
