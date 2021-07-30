import React, { useState } from "react"
import { Redirect, RouteComponentProps } from "react-router-dom"
import { copyProgramWithEvent } from "~/ApiServices/BizApi/program/programIF"
import { getProgramDetails } from "~/ApiServices/Service/ProgramService"
import { IconButton } from "~/Component/Common/Form/Buttons/IconButton"
import { showConfirm } from "~/Component/Common/Modal/Confirmation"
import { DetailsPage } from "~/Component/Common/Page/DetailsPage2/DetailsPage"
import { getProgramDetailsMeta } from "~/TableSearchMeta/Program/ProgramDetailsMeta"

export default function (props: RouteComponentProps<{ programID?: string }>) {
  const programID = Number(props?.match?.params?.programID)
  const [apiCallInProgress, setApiCallInProgress] = useState(false)
  const [redirectTo, setRedirectTo] = useState<string>()

  return (
    <DetailsPage
      getMeta={getProgramDetailsMeta}
      getDetails={() => getProgramDetails({ ProgramID: programID })}
      actions={[
        <>
          {redirectTo && <Redirect to={redirectTo} />}
          <IconButton
            iconType="copy"
            toolTip={`Copy this Program`}
            loading={apiCallInProgress}
            onClick={() => {
              showConfirm(
                () => {
                  setApiCallInProgress(true)
                  return copyProgramWithEvent({ ProgramID: programID }).then((x) => {
                    setApiCallInProgress(false)
                    if (x.success) {
                      setRedirectTo(`/program/${x.data.ProgramID}`)
                      setTimeout(() => {
                        window.location.reload()
                      }, 0)
                    }
                    return x
                  })
                },
                "Program Copied Successfully, You have been redirected to the newly copied Program Page",
                "Could not copy this Program",
                "Are you sure to copy this Program?"
              )
            }}
          />
        </>
      ]}
    />
  )
}
