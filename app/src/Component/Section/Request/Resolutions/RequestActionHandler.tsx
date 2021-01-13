import { Button } from "antd"
import React, { useState, useEffect } from "react"
import { retry, cancel } from "~/ApiServices/Service/RequestModelService"
import { getUserByUserLogin } from "~/ApiServices/Service/HRUserService"
import { getUsername } from "@packages/api/lib/utils/UserInfoStore"
import { ADMIN_SOURCE_NAME } from "~/utils/Constants"
import { IApiResponse } from "@packages/api/lib/utils/Interfaces"
import { eventBus, REFRESH_PAGE } from "~/utils/EventBus"

interface IExpirationProps {
  requestJson: {[key: string]: any}
}

export default function RequestActionHandler(props: IExpirationProps) {
  const [loading, setLoading] = useState(false)
  const [userID, setUserID] = useState(String)

  useEffect(() => {
    ;(async function () {
      const result = await getUserByUserLogin({ UserLogin: getUsername() })

      if (result && result.success) {
        setUserID(result.data["UserID"])
      }
    })()
  }, [])

  const applyAction = async (actionName: string) => {
    const params: any = {}
    params["RequestID"] = Number(props.requestJson.RequestID)
    params["Source"] = ADMIN_SOURCE_NAME
    params["ActivityBy"] = userID

    const serviceMethoToCall: (params: { [key: string]: any }) => Promise<IApiResponse> =
      actionName === "retry" ? retry : cancel

    setLoading(true)
    const response = await serviceMethoToCall(params)
    if (response && response.success) {
      console.log("Action done success")
      eventBus.publish(REFRESH_PAGE)
    } else {
      console.log(response.error)
    }
    setLoading(false)
  }

  return (
    <>
      {props.requestJson.RetryStatus && (
        <Button loading={loading} type="primary" onClick={() => applyAction("retry")}>
          Retry
        </Button>
      )}
      {props.requestJson.CancelStatus && (
        <Button loading={loading} style={{ marginLeft: "10px", marginRight: "10px" }} type="primary" onClick={() => applyAction("cancel")}>
          Cancel
        </Button>
      )}
    </>
  )
}
