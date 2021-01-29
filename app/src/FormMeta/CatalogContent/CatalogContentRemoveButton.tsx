import { IApiResponse } from "@packages/api/lib/utils/Interfaces"
import { Button } from "antd"
import React, { useState } from "react"
import {
  removeOfferingFromCatalog,
  removeProgramFromCatalog,
  removeSectionFromCatalog
} from "~/ApiServices/Service/CatalogService"
import { eventBus } from "~/utils/EventBus"

export const CatalogContentRemoveButton = (props: { catalog: { [key: string]: any }; eventName: string }) => {
  const [loading, setLoading] = useState(false)
  const [buttonLabel, setButtonLabel] = useState("Remove")
  const addRemoveTagToOffering = async (Params: { [key: string]: any }): Promise<IApiResponse> => {
    setLoading(true)
    const config: { [key: string]: any } = {}
    if (Params.contentType === "Program") {
      config.methodToCall = removeProgramFromCatalog
      config.key = "ProgramID"
    } else if (Params.contentType === "Offering") {
      config.methodToCall = removeOfferingFromCatalog
      config.key = "OfferingID"
    } else {
      config.methodToCall = removeSectionFromCatalog
      config.key = "SectionID"
    }

    const response = await config.methodToCall({
      CatalogID: props.catalog.catalogID,
      [config.key]: props.catalog.contentID
    })
    if (response.success) {
      setButtonLabel("Removed")
      eventBus.publish(props.eventName)
    }
    setLoading(false)
    return response
  }
  return (
    <Button danger type="primary" loading={loading} onClick={() => addRemoveTagToOffering(props.catalog)}>
      {buttonLabel}
    </Button>
  )
}
