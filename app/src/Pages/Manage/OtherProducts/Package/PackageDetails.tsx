import React from "react"
import { RouteComponentProps } from "react-router-dom"
import { findPackageDetails } from "~/ApiServices/BizApi/query/queryIf"
import { DetailsPage } from "~/Component/Common/Page/DetailsPage2/DetailsPage"
import { PackageEmailFormOpenButton } from "~/Component/Feature/Package/Forms/PackageEmailForm"
import PackageUtilizationReport from "~/Component/Feature/Package/PackageUtilizationReport"
import { getPackageDetailsMeta } from "~/TableSearchMeta/Package/PackageDetailsMeta"

export default function PackageDetailsPage(props: RouteComponentProps<{ packageID: string }>) {
  const PackageID = Number(props?.match?.params?.packageID)

  return (
    <DetailsPage
      getMeta={getPackageDetailsMeta}
      getDetails={() =>
        findPackageDetails({ PackageID }).then((x) => {
          return x
        })
      }
      entityType="Package"
      entityID={PackageID}
      actions={[
        <PackageEmailFormOpenButton initialValues={{ PackageID: PackageID }} />,
        <PackageUtilizationReport PackageID={PackageID} />
      ]}
    />
  )
}
