import React, { useState } from "react"
import { message } from "antd"
import { removeAccount } from "~/ApiServices/Service/AccountService"
import { DELETE_SUCCESSFULLY } from "~/utils/Constants"
import { Redirect } from "react-router"
import { IconButton } from "~/Component/Common/Form/Buttons/IconButton"

interface IAccountRemoveLinkProp {
  AccountID: number
}
export function AccountRemoveLink(props: IAccountRemoveLinkProp) {
  const [redirectAfterRemove, setRedirectAfterRemove] = useState<string>()

  return (
    <>
      {redirectAfterRemove && <Redirect to={redirectAfterRemove} />}
      <IconButton
        iconType="remove"
        toolTip="Delete Account"
        onClickRemove={() => {
          return removeAccount({ AccountID: props.AccountID }).then((response) => {
            if (response && response.success) {
              message.success(DELETE_SUCCESSFULLY)
              setRedirectAfterRemove(`/account`)
            }
            return response
          })
        }}
      />
    </>
  )
}
