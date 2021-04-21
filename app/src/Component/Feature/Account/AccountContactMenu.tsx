import React from "react"
import { Button, message } from "antd"
import { eventBus } from "~/utils/EventBus"
import { deleteAccountAffiliation } from "~/ApiServices/Service/AccountService"
import { DELETE_SUCCESSFULLY } from "~/utils/Constants"
import { AccountContactFormOpenButton } from "~/Component/Feature/Account/Forms/AccountContactForm"
import { DeleteOutlined } from "@ant-design/icons"
import { showDeleteConfirm } from "~/Component/Common/Modal/Confirmation"

interface IAccountContactMenu {
  initialData: { [key: string]: any }
}

export function AccountContactMenu(props: IAccountContactMenu) {
  return (
    <>
      <AccountContactFormOpenButton editMode={true} initialValues={props.initialData} />
      <Button
        danger
        disabled={props.initialData.PrimaryAccountAffiliation}
        style={{ marginLeft: "5px" }}
        type="primary"
        icon={<DeleteOutlined />}
        shape="circle"
        onClick={() =>
          showDeleteConfirm(() => {
            return deleteAccountAffiliation({
              AccountAffiliationID: props.initialData.AccountAffiliationID
            }).then((x) => {
              if (x.success) {
                message.success(DELETE_SUCCESSFULLY)
                eventBus.publish("REFRESH_CONTACT_TAB")
              }
              return x
            })
          })
        }
      />
    </>
  )
}
