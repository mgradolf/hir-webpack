import React from "react"
import { RouteComponentProps } from "react-router-dom"
import { getProgramAppDetails } from "~/ApiServices/BizApi/program/programApplicationIF"
import { DetailsPage } from "~/Component/Common/Page/DetailsPage2/DetailsPage"
import { getProgramApplicationDetailsMeta } from "~/TableSearchMeta/ProgramApplication/ProgramApplicationDetailsMeta"

export default function (props: RouteComponentProps<{ programID?: string; studentID?: string }>) {
  const ProgramID = Number(props?.match?.params?.programID)
  const StudentID = Number(props?.match?.params?.studentID)

  return (
    <DetailsPage
      getMeta={getProgramApplicationDetailsMeta}
      getDetails={() =>
        getProgramAppDetails({ ProgramID, StudentID }).then((x) => {
          if (x.success) {
            return x
          }
          return x
        })
      }
    />
  )
}
