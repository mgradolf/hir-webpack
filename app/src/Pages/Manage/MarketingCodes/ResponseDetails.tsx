import React from "react"
import { RouteComponentProps } from "react-router-dom"
import { searchMarketingCodeResponses } from "~/ApiServices/Service/MarketingService"
import { StandardDetailsPage } from "~/Component/Common/Page/DetailsPage/StandardDetailsPage"
import { getMarketingCodeResponseDetailsMeta } from "~/TableSearchMeta/MarketingCodeResponse/MarketingCodeResponseDetailsMeta"

export default function MarketingCodeResponseDetailsPage(
  props: RouteComponentProps<{ orderItemID?: string; marketingCodeID?: string }>
) {
  const MarketingCodeID = Number(props?.match?.params?.marketingCodeID)
  const OrderItemID = Number(props?.match?.params?.orderItemID)

  return (
    <StandardDetailsPage
      getDetailsMeta={getMarketingCodeResponseDetailsMeta}
      getDetailsFunc={() =>
        searchMarketingCodeResponses({ OrderItemID, MarketingCodeID }).then((x) => {
          if (x.success) x.data = x.data[0]
          return x
        })
      }
    />
  )
}
