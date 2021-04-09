import * as React from "react"
import { LookupOpenButton } from "~/Component/Common/Modal/LookupModal/LookupOpenButton"
import { IField, IGeneratedField } from "~/Component/Common/Form/common"
import { getCatalogTableColumns } from "~/TableSearchMeta/Catalog/CatalogTableColumns"
import { CatalogSearchMeta } from "~/TableSearchMeta/Catalog/CatalogSearchMeta"

export function CatalogLookup(props: IGeneratedField) {
  return (
    <LookupOpenButton
      lookupModalTitle="Select Catalog"
      displayKey="Name"
      placeholder="Search By Catalog Name"
      meta={CatalogSearchMeta as IField[]}
      metaName="CatalogSearchMeta"
      {...props}
      {...getCatalogTableColumns(true)}
      valueKey={props.valueKey || "CatalogID"}
    />
  )
}
