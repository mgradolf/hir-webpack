import { IApiResponse } from "@packages/api/lib/utils/Interfaces"
import { Button } from "antd"
import React, { useState } from "react"
import { removeTagFromEntity } from "~/ApiServices/Service/TagService"
import { eventBus } from "~/utils/EventBus"

export const TagRemoveButton = (props: { tag: { [key: string]: any }; eventName: string }) => {
  const [loading, setLoading] = useState(false)
  const [disabled, setDisabled] = useState(props.tag.IsActive ? false : true)
  const [buttonLabel, setButtonLabel] = useState(props.tag.IsActive ? "Remove" : "Removed")
  const addRemoveTagToOffering = async (Params: { [key: string]: any }): Promise<IApiResponse> => {
    setLoading(true)
    const methodToCall = removeTagFromEntity
    const response = await methodToCall({
      ...Params
    })
    if (response.success) {
      setDisabled(true)
      setButtonLabel("Removed")
      eventBus.publish(props.eventName)
    }
    setLoading(false)
    return response
  }
  return (
    <Button
      danger
      type="primary"
      loading={loading}
      disabled={disabled}
      onClick={() => addRemoveTagToOffering(props.tag)}
    >
      {buttonLabel}
    </Button>
  )
}
