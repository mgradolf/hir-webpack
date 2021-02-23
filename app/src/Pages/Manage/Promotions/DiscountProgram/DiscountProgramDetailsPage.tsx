import React from "react"
import { RouteComponentProps } from "react-router-dom"
import { searchDiscountProgram } from "~/ApiServices/Service/FinancialService"
import { DetailsPage } from "~/Component/Common/Page/DetailsPage2/DetailsPage"
import { getDiscountProgramsDetailsMeta } from "~/TableSearchMeta/DiscountPrograms/DiscountProgramsDetailsMeta"

export default function OrderDetailsPage(props: RouteComponentProps<{ discountProgramID: string }>) {
  const DiscountProgramID = Number(props?.match?.params?.discountProgramID)
  return (
    <DetailsPage
      getMeta={getDiscountProgramsDetailsMeta}
      getDetails={() =>
        searchDiscountProgram({ DiscountProgramID }).then((x) => {
          if (x.success) x.data = x.data[0]
          return x
        })
      }
      entityType="DiscountProgram"
      entityID={DiscountProgramID}
    />
  )
}
