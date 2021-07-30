import React, { useEffect, useState } from "react"
import { IconButton } from "~/Component/Common/Form/Buttons/IconButton"
import { getPaymentReceipt } from "~/ApiServices/BizApi/payment/paymentIF"

interface IPaymentReceiptProp {
  PaymentID: number
}
export function PaymentReceiptLink(props: IPaymentReceiptProp) {
  const [message, setMessage] = useState<string>("")

  useEffect(() => {
    ;(async function () {
      const result = await getPaymentReceipt({ PaymentID: props.PaymentID })
      if (result.success && result.data) {
        setMessage(result.data.message)
      }
    })()
  }, [props])

  const viewPaymentReceipt = (body: string | undefined) => {
    const newWin: any = window.open("url", `Receipt-${props.PaymentID}`, "height=800,width=700")
    newWin.document.write(body)
  }

  return <IconButton iconType="info" toolTip="View Payment Receipt" onClick={() => viewPaymentReceipt(message)} />
}
