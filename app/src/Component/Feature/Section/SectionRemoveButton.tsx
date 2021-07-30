import { Button, message } from "antd"
import React, { useState } from "react"
import { removeSectionById } from "~/ApiServices/Service/EntityService"
import { Redirect } from "react-router-dom"
import { DeleteOutlined } from "@ant-design/icons"
import { DELETE_SUCCESSFULLY } from "~/utils/Constants"

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
        icon={<DeleteOutlined />}
        shape="circle"
        onClick={() => {
          setRemoveApiCallInProgress(true)
          removeSectionById(props.Section.SectionID)
            .then((x) => {
              if (x.success) {
                message.success(DELETE_SUCCESSFULLY)
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
      />
    </>
  )
}
