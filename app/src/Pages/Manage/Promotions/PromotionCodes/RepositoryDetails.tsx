import React from "react"
import { RouteComponentProps } from "react-router-dom"
import { searchMarketingCodes } from "~/ApiServices/Service/MarketingService"
import { DetailsPage } from "~/Component/Common/Page/DetailsPage2/DetailsPage"
import { getMarketingCodeRepositoryDetailsMeta } from "~/TableSearchMeta/MarketingCodeRepository/MarketingCodeRepositoryDetailsMeta"

export default function MarketingCodeRepositoryDetailsPage(props: RouteComponentProps<{ marketingCodeID?: string }>) {
  const MarketingCodeID = Number(props?.match?.params?.marketingCodeID)

  return (
    <DetailsPage
      getMeta={getMarketingCodeRepositoryDetailsMeta}
      getDetails={() =>
        searchMarketingCodes({ MarketingCodeID }).then((x) => {
          if (x.success) x.data = x.data[0]
          return x
        })
      }
    />
  )
}
