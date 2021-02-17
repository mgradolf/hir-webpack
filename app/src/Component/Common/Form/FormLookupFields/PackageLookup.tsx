import * as React from "react"
import { PackageSearchMeta } from "~/TableSearchMeta/Package/PackageSearchMeta"
import { LookupOpenButton } from "~/Component/Common/Modal/LookupModal/LookupOpenButton"
import { IField, IGeneratedField } from "~/Component/Common/Form/common"
import { getPackageTableColumns } from "~/TableSearchMeta/Package/PackageTableColumns"
import { findPackages } from "~/ApiServices/Service/PackageService"

interface ILookupOpenButton extends IGeneratedField {
  valueField?: string
}
export function SearchPackageLookupButton(props: ILookupOpenButton) {
  return (
    <LookupOpenButton
      lookupModalTitle="Select Package"
      displayField="Name"
      meta={PackageSearchMeta as IField[]}
      {...props}
      {...getPackageTableColumns(true)}
      valueField={props.valueField || "PackageID"}
      {...(props.defaultValue && {
        entityLookupFunc: () =>
          findPackages({ PackageID: props.defaultValue }).then((x) => {
            if (x.success) return x.data[0]
            else return undefined
          })
      })}
    />
  )
}
