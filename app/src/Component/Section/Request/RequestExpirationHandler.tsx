import { Button, DatePicker } from "antd"
import React, { useState } from "react"
import moment from "moment"
import { extendExpirationDate } from "~/ApiServices/Service/RequestActivityService"
import { ACTION_REQUIRED_REQUEST_STATE_ID, DATE_TIME_FORMAT, REQUEST_DATE_TIME_FORMAT } from "~/utils/Constants"
import { eventBus, REFRESH_PAGE } from "~/utils/EventBus"

interface IExpirationProps {
  Request: { [key: string]: any }
}

export default function RequestExpirationHandler(props: IExpirationProps) {
  const [loading, setLoading] = useState(false)
  const [expirationDateUpdate, setExpirationDateUpdate] = useState(true)
  const [expirationDate, setExpirationDate] = useState(Date)

  const expirationDateHandler = (date: any, dateString: any) => {
    if (date === null) {
      setExpirationDateUpdate(true)
    } else {
      setExpirationDate(dateString)
      setExpirationDateUpdate(false)
    }
  }

  const updateExpirationDate = () => {
    const params: any = {}
    params["RequestID"] = Number(props.Request.RequestID)
    params["ExpirationDate"] = expirationDate

    setLoading(true)
    extendExpirationDate(params).then((response) => {
      setLoading(false)
      if (response && response.success) {
        console.log("Update expiration date success")
        eventBus.publish(REFRESH_PAGE)
      } else {
        console.log(response.error)
      }
    })
  }

  return (
    <>
      {props.Request.ExpirationDate && (
        <DatePicker
          disabled={props.Request.StateID !== ACTION_REQUIRED_REQUEST_STATE_ID}
          aria-label="Pick Expiration Date"
          placeholder={DATE_TIME_FORMAT}
          format={DATE_TIME_FORMAT}
          onChange={expirationDateHandler}
          defaultValue={moment(props.Request.ExpirationDate, REQUEST_DATE_TIME_FORMAT)}
        />
      )}
      {props.Request.ExpirationDate && (
        <Button
          style={{ marginLeft: "16px" }}
          loading={loading}
          disabled={expirationDateUpdate}
          onClick={updateExpirationDate}
          type="primary"
        >
          Update
        </Button>
      )}
    </>
  )
}
