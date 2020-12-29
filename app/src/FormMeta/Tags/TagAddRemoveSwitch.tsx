import { IApiResponse } from "@packages/api/lib/utils/Interfaces"
import { Switch } from "antd"
import React, { useState } from "react"
import { addTagIntoEntity, removeTagFromEntity } from "~/ApiServices/Service/TagService"

export const TagAddRemoveSwitch = (props: { tag: { [key: string]: any } }) => {
  const [loading, setLoading] = useState(false)
  const [isChecked, setIsChecked] = useState(props.tag.IsActive)
  const addRemoveTagToOffering = async (Params: { [key: string]: any }, add: boolean): Promise<IApiResponse> => {
    setLoading(true)
    const methodToCall = add ? addTagIntoEntity : removeTagFromEntity
    const response = await methodToCall({
      ...Params
    })
    if (response.success) {
      setIsChecked(add)
    }

    setLoading(false)
    return response
  }
  return (
    <Switch
      loading={loading}
      checked={isChecked}
      onClick={async (checked, e) => {
        const response = await addRemoveTagToOffering(props.tag, checked)
        if (!response.success) {
          console.log(response)
        }
      }}
    />
  )
}
