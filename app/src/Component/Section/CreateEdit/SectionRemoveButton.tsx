import { Button } from "antd"
import React, { useState } from "react"
import { removeSectionById } from "~/ApiServices/Service/EntityService"
import apiErroreEventBus from "@packages/api/lib/utils/GlobalHttpErrorEventBus"
import { Redirect } from "react-router-dom"

export function SectionRemoveButton(props: { Section: { [key: string]: any }; OfferingID?: number }) {
  const [removeApiCallInProgress, setRemoveApiCallInProgress] = useState(false)
  const [redirectAfterRemoveURL, setRedirectAfterRemove] = useState<string>()

  return (
    <>
      {redirectAfterRemoveURL && <Redirect to={redirectAfterRemoveURL} />}
      <Button
        type="primary"
        danger
        loading={removeApiCallInProgress}
        disabled={removeApiCallInProgress}
        style={{ marginLeft: "5px" }}
        onClick={() => {
          setRemoveApiCallInProgress(true)
          removeSectionById(props.Section.SectionID)
            .then((x) => {
              if (x.success) {
                apiErroreEventBus.publish([{ message: `Section ${props.Section.SectionNumber} removed` }])
                if (props.OfferingID) {
                  setRedirectAfterRemove(`/offering/${props.OfferingID}/section`)
                } else {
                  setRedirectAfterRemove(`/section`)
                }
              }
            })
            .finally(() => {
              setRemoveApiCallInProgress(false)
            })
        }}
      >
        Remove
      </Button>
    </>
  )
}
