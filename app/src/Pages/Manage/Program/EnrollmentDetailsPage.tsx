import React from "react"
import { RouteComponentProps } from "react-router-dom"
import { searchEnrollment } from "~/ApiServices/BizApi/program/programEnrollmentIF"
import { DetailsPage } from "~/Component/Common/Page/DetailsPage2/DetailsPage"
import { getProgramEnrollmentDetailsMeta } from "~/FormMeta/ProgramEnrollment/ProgramEnrollmentDetailsMeta"

export function ProgramEnrollmentDetailsPage(props: RouteComponentProps<{ programEnrollmentID?: string }>) {
  const programEnrollmentID = Number(props?.match?.params?.programEnrollmentID)
  return (
    <DetailsPage
      getMeta={getProgramEnrollmentDetailsMeta}
      getDetails={() =>
        searchEnrollment({ enrollmentID: programEnrollmentID }).then((x) => {
          if (x.success) {
            x.data = x.data[0]
          }
          return x
        })
      }
    />
  )
}
