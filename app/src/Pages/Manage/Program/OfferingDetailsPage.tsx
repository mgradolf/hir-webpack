import React from "react"
import { RouteComponentProps } from "react-router-dom"
import { searchProgramOffering } from "~/ApiServices/BizApi/program/programIF"
import { StandardDetailsPage } from "~/Component/Common/Page/DetailsPage/StandardDetailsPage"
import { getProgramOfferingDetailsMeta } from "~/FormMeta/ProgramOffering/ProgramOfferingDetailsMeta"

export function ProgramOfferingDetailsPage(props: RouteComponentProps<{ programOfferingID?: string }>) {
  const programOfferingID = Number(props?.match?.params?.programOfferingID)
  return (
    <StandardDetailsPage
      getDetailsMeta={getProgramOfferingDetailsMeta}
      getDetailsFunc={() =>
        searchProgramOffering({ programOfferingID }).then((x) => {
          if (x.success) {
            x.data = x.data[0]
          }
          return x
        })
      }
    />
  )
}
