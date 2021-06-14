import React, { useState } from "react"
import { Redirect } from "react-router"
import { IconButton } from "~/Component/Common/Form/Buttons/IconButton"
import { removePerson } from "~/ApiServices/Service/PersonService"

interface IPersonRemoveLinkProp {
  PersonID: number
}
export function PersonRemoveLink(props: IPersonRemoveLinkProp) {
  const [redirectAfterRemove, setRedirectAfterRemove] = useState<string>()

  return (
    <>
      {redirectAfterRemove && <Redirect to={redirectAfterRemove} />}
      <IconButton
        iconType="remove"
        toolTip="Delete Person"
        onClickRemove={() => {
          return removePerson({ PersonID: props.PersonID }).then((response) => {
            if (response && response.success) {
              setRedirectAfterRemove(`/person`)
            }
            return response
          })
        }}
      />
    </>
  )
}
