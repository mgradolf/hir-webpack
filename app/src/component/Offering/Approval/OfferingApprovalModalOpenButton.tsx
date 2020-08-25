import React, { useState, useEffect } from "react"

import { Button } from "antd"
import { connect } from "react-redux"
import { showOfferingApprovalModal } from "~/store/ModalState"
import { Dispatch } from "redux"
import { searchOffering } from "~/ApiServices/Service/OfferingService"
import styles from "~/component/Offering/Approval/ApprovalModal.module.scss"

interface ICreateActionButtonProp {
  offeringId: number
  openOfferingApprovalModal?: (offeringId: number) => void
}
function ApprovalActionButton(props: ICreateActionButtonProp) {
  const [offeringDetails, setOfferingDetails] = useState<Array<any>>([])

  useEffect(() => {
    ;(async function () {
      const result = await searchOffering({ OfferingID: Number(props.offeringId) })

      if (result && result.success) {
        setOfferingDetails(result.data)
      }
    })()
  }, [props.offeringId])

  const onClick = () => {
    if (props.openOfferingApprovalModal) props.openOfferingApprovalModal(props.offeringId)
  }
  return (
    <>
      {offeringDetails.length &&
        offeringDetails.map((offering) => {
          return (
            <Button
              type="primary"
              className={offering.StatusCode === "Open" ? styles.hidden : styles.show}
              onClick={onClick}
            >
              Manage Approval
            </Button>
          )
        })}
    </>
  )
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    openOfferingApprovalModal: (offeringId: number) => dispatch(showOfferingApprovalModal(true, { offeringId }))
  }
}

export default connect(null, mapDispatchToProps)(ApprovalActionButton)
