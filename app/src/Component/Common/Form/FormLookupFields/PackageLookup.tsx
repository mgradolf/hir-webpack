import * as React from "react"
import { PackageSearchMeta } from "~/TableSearchMeta/Package/PackageSearchMeta"
import { LookupOpenButton } from "~/Component/Common/Modal/LookupModal/LookupOpenButton"
import { IField, IGeneratedField } from "~/Component/Common/Form/common"
import { getPackageTableColumns } from "~/TableSearchMeta/Package/PackageTableColumns"

export function SearchPackageLookupButton(props: IGeneratedField) {
  return (
    <LookupOpenButton
      lookupModalTitle="Select Package"
      displayKey="Name"
      placeholder="Search By Package Name"
      meta={PackageSearchMeta as IField[]}
      metaName="PackageSearchMeta"
      valueKey={props.valueKey || "PackageID"}
      {...props}
      {...getPackageTableColumns(true)}
    />
  )
}
