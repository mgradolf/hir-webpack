import React from "react"
import { Button, Menu } from "antd"
import { eventBus } from "~/utils/EventBus"
import { deleteAccountAffiliation } from "~/ApiServices/Service/AccountService"
import Notification from "~/utils/notification"
import { DELETE_SUCCESSFULLY } from "~/utils/Constants"
import { AccountContactFormOpenButton } from "~/Component/Account/Forms/AccountContactForm"

interface IAccountContactMenu {
  initialData: { [key: string]: any }
}

export default function AccountContactMenu(props: IAccountContactMenu) {
  return (
    <Menu>
      <Menu.Item key="0">
        <AccountContactFormOpenButton editMode={true} initialValues={props.initialData} />
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
