import React, { useEffect, useState } from "react"
import { Button, message, Select, Typography } from "antd"
import { getPaymentGatewayAccounts } from "~/ApiServices/Service/RefLookupService"
import { UPDATE_SUCCESSFULLY, UPDATE_FAILED } from "~/utils/Constants"
import { eventBus, REFRESH_PAGE } from "~/utils/EventBus"
import { updateOffering } from "~/ApiServices/Service/OfferingService"
import { EditOutlined, CloseOutlined } from "@ant-design/icons"
import "~/Sass/utils.scss"

interface IOfferingPaymentGatewayFormProps {
  initialValue: { [key: string]: any }
}

export function OfferingPaymentGatewayForm(props: IOfferingPaymentGatewayFormProps) {
  const [loading, setLoading] = useState<boolean>(false)
  const [showUpdateGateway, setShowUpdateGateway] = useState<boolean>(false)
  const [paymentGateway, setPaymentGateway] = useState<Array<any>>([])

  useEffect(() => {
    getPaymentGatewayAccounts().then((x) => {
      if (x.success) setPaymentGateway(x.data)
    })
  }, [])

  const handlePaymentGateway = (paymentGatewayAccountID: number) => {
    const params = props.initialValue
    params["PaymentGatewayAccountID"] = paymentGatewayAccountID

    setLoading(true)
    updateOffering(params).then((x) => {
      if (x && x.success) {
        message.success(UPDATE_SUCCESSFULLY)
        eventBus.publish(REFRESH_PAGE)
      } else {
        message.error(UPDATE_FAILED)
        setShowUpdateGateway(false)
      }
      setLoading(false)
    })
  }

  return (
    <>
      {!showUpdateGateway && (
        <Typography.Text>
          {props.initialValue.PaymentGatewayAccountName != null
            ? props.initialValue.PaymentGatewayAccountName
            : "Default"}
        </Typography.Text>
      )}
      {setShowUpdateGateway && (
        <Button
          danger={showUpdateGateway}
          type="default"
          shape="circle"
          icon={showUpdateGateway ? <CloseOutlined /> : <EditOutlined />}
          style={{ float: "right" }}
          onClick={() => {
            setShowUpdateGateway && setShowUpdateGateway(!showUpdateGateway)
          }}
        />
      )}
      {showUpdateGateway && (
        <Select
          loading={loading}
          style={{ width: "150px" }}
          defaultValue={props.initialValue.PaymentGatewayAccountID}
          onChange={handlePaymentGateway}
          aria-label="Select Payment Gateway"
        >
          {paymentGateway &&
            paymentGateway.map((x) => {
              return (
                <Select.Option key={x.ID} value={x.ID}>
                  {x.Name}
                </Select.Option>
              )
            })}
        </Select>
      )}
    </>
  )
}
