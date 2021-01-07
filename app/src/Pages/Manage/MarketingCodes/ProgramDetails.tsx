import React from "react"
import { RouteComponentProps } from "react-router-dom"
import { searchMarketingProgram } from "~/ApiServices/Service/FinancialService"
import { DetailsPage } from "~/Component/Common/Page/DetailsPage2/DetailsPage"
import { getMarketingProgramDetailsMeta } from "~/FormMeta/MarketingProgram/MarketingProgramDetailsMeta"

export default function ProgramDetailsPage(props: RouteComponentProps<{ marketingProgramID: string }>) {
  const MarketingProgramID = Number(props?.match?.params?.marketingProgramID)

  return (
    <DetailsPage
      getMeta={getMarketingProgramDetailsMeta}
      getDetails={() =>
        searchMarketingProgram({ MarketingProgramID }).then((x) => {
          if (x.success) x.data = x.data[0]
          return x
        })
      }
      entityType="MarketingProgram"
      entityID={MarketingProgramID}
    />
  )
}
