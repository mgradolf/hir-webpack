import React, { useState } from "react"
import { Redirect } from "react-router"
import { IconButton } from "~/Component/Common/Form/Buttons/IconButton"

interface IOrderTransactionProp {
  OrderID: number
}

export function OrderTransactionLink(props: IOrderTransactionProp) {
  const [redirect, setRedirect] = useState<string>()

  return (
    <>
      {redirect && <Redirect to={redirect} />}
      <IconButton
        iconType="right"
        toolTip="View Deposit"
        onClick={() => setRedirect(`/transaction?OrderID=${props.OrderID}`)}
      />
    </>
  )
}
