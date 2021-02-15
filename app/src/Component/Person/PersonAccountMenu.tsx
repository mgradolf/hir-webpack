import React, { useState } from "react"
import { Button, Menu } from "antd"
import { eventBus } from "~/utils/EventBus"
import PersonAccountFormModal from "~/Component/Person/PersonAccountFormModal"
import { deleteAccountAffiliation } from "~/ApiServices/Service/AccountService"

interface IPersonAccountMenu {
  initialData: { [key: string]: any }
}

export default function PersonAccountMenu(props: IPersonAccountMenu) {
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
          <PersonAccountFormModal initialData={props.initialData} closeModal={() => setShowUpdateModal(false)} />
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
