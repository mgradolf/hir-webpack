import React, { useState } from "react"
import { Button, Row } from "antd"
import Notification from "~/utils/notification"
import { eventBus, REFRESH_PAGE } from "~/utils/EventBus"
import { getOrCreateAccountForPurchaser, pushAccountAffiliation } from "~/ApiServices/Service/AccountService"
import { SAVE_SUCCESSFULLY, ACCOUNT_AFFILIATION_STATUS_ACTIVE, AFF_ROLE_PURCHASER } from "~/utils/Constants"
import { AccountLinkModal } from "~/Component/Account/AccountLinkModal"

interface IPersonAccountActionProp {
  initialData: { [key: string]: any }
}

export function PersonAccountAction(props: IPersonAccountActionProp) {
  const [showLinkModal, setShowLinkModal] = useState(false)

  const isAccount: boolean = props.initialData?.AccountID !== undefined

  const createPurchaserAccount = async () => {
    if (props.initialData) {
      const response = await getOrCreateAccountForPurchaser({
        PurchaserPersonID: props.initialData.PersonID
      })
      if (response.success) {
        Notification(SAVE_SUCCESSFULLY)
        eventBus.publish(REFRESH_PAGE)
      }
    }
  }

  const onCloseAccountSelector = (selectedItems?: any[]) => {
    if (selectedItems) {
      const account = selectedItems[0]

      pushAccountAffiliation({
        AccountID: account.AccountID,
        PersonID: props.initialData.PersonID,
        StatusID: ACCOUNT_AFFILIATION_STATUS_ACTIVE,
        AffiliationRoleTypeID: AFF_ROLE_PURCHASER
      }).then((x) => {
        if (x.success) eventBus.publish(REFRESH_PAGE)
      })
      setShowLinkModal(false)
    } else {
      setShowLinkModal(false)
    }
  }

  return (
    <Row>
      <Button
        className={isAccount ? "hidden" : "show"}
        type="primary"
        style={{ marginRight: "10px" }}
        onClick={createPurchaserAccount}
      >
        Add
      </Button>
      {setShowLinkModal && (
        <Button
          className={isAccount ? "hidden" : "show"}
          type="ghost"
          onClick={() => setShowLinkModal && setShowLinkModal(true)}
        >
          Link
        </Button>
      )}
      {showLinkModal && <AccountLinkModal onClose={onCloseAccountSelector} />}
    </Row>
  )
}
