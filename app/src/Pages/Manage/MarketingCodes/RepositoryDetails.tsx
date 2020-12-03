import React from "react"
import { RouteComponentProps } from "react-router-dom"
import { searchMarketingCodes } from "~/ApiServices/Service/MarketingService"
import { StandardDetailsPage } from "~/Component/Common/Page/DetailsPage/StandardDetailsPage"
import { getMarketingCodeRepositoryDetailsMeta } from "~/FormMeta/MarketingCodeRepository/MarketingCodeRepositoryDetailsMeta"

export default function MarketingCodeRepositoryDetailsPage(props: RouteComponentProps<{ marketingCodeID?: string }>) {
  const MarketingCodeID = Number(props?.match?.params?.marketingCodeID)

  return (
    <StandardDetailsPage
      getDetailsMeta={getMarketingCodeRepositoryDetailsMeta}
      getDetailsFunc={() =>
        searchMarketingCodes({ MarketingCodeID }).then((x) => {
          if (x.success) x.data = x.data[0]
          return x
        })
      }
    />
  )
}
