import React, { useEffect, useState } from "react"
import { IconButton } from "~/Component/Common/Form/Buttons/IconButton"
import { getPrintableInvoice } from "~/ApiServices/BizApi/order/orderIf"

interface IOrderReceiptProp {
  OrderID: number
}
export function OrderReceiptLink(props: IOrderReceiptProp) {
  const [message, setMessage] = useState<string>("")

  useEffect(() => {
    ;(async function () {
      const result = await getPrintableInvoice({ OrderID: props.OrderID })
      if (result.success && result.data) {
        setMessage(result.data.message)
      }
    })()
  }, [props])

  const viewInvoice = (body: string | undefined) => {
    const newWin: any = window.open("url", `Invoice-${props.OrderID}`, "height=800,width=700")
    newWin.document.write(body)
  }

  return <IconButton iconType="info" toolTip="View Invoice" onClick={() => viewInvoice(message)} />
}
