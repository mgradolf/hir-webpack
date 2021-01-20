import React from "react"
import { RouteComponentProps } from "react-router-dom"
import { getProgramAppDetails } from "~/ApiServices/BizApi/program/programApplicationIF"
import { DetailsPage } from "~/Component/Common/Page/DetailsPage2/DetailsPage"
import { getProgramApplicationDetailsMeta } from "~/FormMeta/ProgramApplication/ProgramApplicationDetailsMeta"

export function ProgramApplicationDetailsPage(props: RouteComponentProps<{ programID?: string; studentID?: string }>) {
  const programID = Number(props?.match?.params?.programID)
  const studentID = Number(props?.match?.params?.studentID)

  return (
    <DetailsPage
      getMeta={getProgramApplicationDetailsMeta}
      getDetails={() =>
        getProgramAppDetails([programID, studentID]).then((x) => {
          if (x.success) {
            return x
          }
          return x
        })
      }
    />
  )
}
