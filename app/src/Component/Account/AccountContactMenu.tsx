import React, { useState } from "react"
import { Button, Menu } from "antd"
import { eventBus } from "~/utils/EventBus"
import { deleteAccountAffiliation } from "~/ApiServices/Service/AccountService"
import { AccountContactFormModal } from "~/Component/Account/AccountContactFormModal"
import Notification from "~/utils/notification"
import { DELETE_SUCCESSFULLY } from "~/utils/Constants"

interface IAccountContactMenu {
  initialData: { [key: string]: any }
}

export default function AccountContactMenu(props: IAccountContactMenu) {
  const [showUpdateModal, setShowUpdateModal] = useState(false)

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
          <AccountContactFormModal initialData={props.initialData} closeModal={() => setShowUpdateModal(false)} />
        )}
      </Menu.Item>
      <Menu.Item key="1">
        <Button
          type="link"
          onClick={async () => {
            const response = await deleteAccountAffiliation({
              AccountAffiliationID: props.initialData.AccountAffiliationID
            })
            if (response && response.success) {
              Notification(DELETE_SUCCESSFULLY)
              eventBus.publish("REFRESH_CONTACT_TAB")
            }
          }}
        >
          Remove
        </Button>
      </Menu.Item>
    </Menu>
  )
}
