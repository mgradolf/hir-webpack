import * as React from "react"
import { PackageSearchMeta } from "~/FormMeta/Package/PackageSearchMeta"
import { SearchLookupOpenButton } from "~/Component/Common/SearchForm/SearchLookupOpenButton"
import { IField, IGeneratedField } from "~/Component/Common/SearchForm/common"
import { getPackageTableColumns } from "~/FormMeta/Package/PackageTableColumns"
import { findPackages } from "~/ApiServices/Service/PackageService"

interface ISearchLookupOpenButton extends IGeneratedField {
  valueField?: string
}
export function SearchPackageLookupButton(props: ISearchLookupOpenButton) {
  return (
    <SearchLookupOpenButton
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
