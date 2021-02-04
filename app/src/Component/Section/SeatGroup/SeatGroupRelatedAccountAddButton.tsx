import React, { useState } from "react"
import { Button } from "antd"
import { addAccount } from "~/ApiServices/Service/SeatGroupService"
import { LookupModal } from "~/Component/Common/Modal/LookupModal"
import { eventBus, REFRESH_SEATGROUP_RELATED_ACCOUNT_PAGE } from "~/utils/EventBus"
import { getAccountTableColumns } from "~/FormMeta/Account/AccountTableColumns"
import { AccountSearchMeta } from "~/FormMeta/Account/AccountSearchMeta"

interface ICreateActionButtonProp {
  SeatGroupID: number
}

export default function SeatGroupRelatedAccountAddButton(props: ICreateActionButtonProp) {
  const [showModal, setShowModal] = useState(false)

  const closeModal = (items?: any[]) => {
    if (items && items.length > 0) {
      items.map((x) => {
        addAccount({ SeatGroupID: props.SeatGroupID, AccountID: x.AccountID }).then((x) => {
          if (x.success) eventBus.publish(REFRESH_SEATGROUP_RELATED_ACCOUNT_PAGE)
        })
        return true
      })
      setShowModal(false)
    } else {
      setShowModal(false)
    }
  }

  return (
    <>
      <Button type="primary" onClick={() => setShowModal(true)}>
        + Add Account
      </Button>
      {showModal && (
        <LookupModal
          title="Select Account"
          isArray={true}
          closeModal={closeModal}
          {...getAccountTableColumns()}
          meta={AccountSearchMeta}
          defaultFormValue={{ SeatGroupID: props.SeatGroupID }}
        />
      )}
    </>
  )
}
