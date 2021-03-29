import React, { useState } from "react"
import { Button, message } from "antd"
import { removeAccount } from "~/ApiServices/Service/AccountService"
import { DELETE_SUCCESSFULLY } from "~/utils/Constants"
import { Redirect } from "react-router"

interface IAccountRemoveLinkProp {
  AccountID: number
}
export function AccountRemoveLink(props: IAccountRemoveLinkProp) {
  const [redirectAfterRemove, setRedirectAfterRemove] = useState<string>()

  return (
    <>
      {redirectAfterRemove && <Redirect to={redirectAfterRemove} />}
      <Button
        type="primary"
        danger
        style={{ marginLeft: "10px" }}
        onClick={async () => {
          const response = await removeAccount({ AccountID: props.AccountID })
          if (response && response.success) {
            message.success(DELETE_SUCCESSFULLY)
            setRedirectAfterRemove(`/account`)
          }
        }}
      >
        Remove
      </Button>
    </>
  )
}
