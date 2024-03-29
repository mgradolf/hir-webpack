import React, { useState } from "react"
import { Button, Tooltip } from "antd"
import { DeleteOutlined, EditOutlined } from "@ant-design/icons"
import { eventBus } from "~/utils/EventBus"
import { PersonAccountFormModal } from "~/Component/Feature/Person/Forms/PersonAccountFormModal"
import { deleteAccountAffiliation } from "~/ApiServices/Service/AccountService"
import { showDeleteConfirm } from "~/Component/Common/Modal/Confirmation"

interface IPersonAccountMenu {
  initialData: { [key: string]: any }
}

export default function PersonAccountMenu(props: IPersonAccountMenu) {
  const [showUpdateModal, setShowUpdateModal] = useState(false)

  return (
    <>
      <Tooltip title="Edit">
        <Button
          type="primary"
          icon={<EditOutlined />}
          shape="circle"
          style={{ marginRight: "5px" }}
          onClick={() => {
            setShowUpdateModal(true)
          }}
        />
      </Tooltip>
      {showUpdateModal && (
        <PersonAccountFormModal initialData={props.initialData} closeModal={() => setShowUpdateModal(false)} />
      )}
      <Tooltip title="Remove">
        <Button
          danger
          type="primary"
          icon={<DeleteOutlined />}
          shape="circle"
          onClick={() =>
            showDeleteConfirm(() => {
              return deleteAccountAffiliation({
                AccountAffiliationID: props.initialData.AccountAffiliationID
              }).then((x) => {
                if (x.success) {
                  eventBus.publish("REFRESH_CONTACT_TAB")
                }
                return x
              })
            })
          }
        />
      </Tooltip>
    </>
  )
}
