import * as React from "react"
import { LookupOpenButton } from "~/Component/Common/Modal/LookupModal/LookupOpenButton"
import { IField, IGeneratedField } from "~/Component/Common/Form/common"
// import { getEntityById } from "~/ApiServices/Service/EntityService"
import { getCatalogTableColumns } from "~/TableSearchMeta/Catalog/CatalogTableColumns"
import { CatalogSearchMeta } from "~/TableSearchMeta/Catalog/CatalogSearchMeta"
import { getEntityById } from "~/ApiServices/Service/EntityService"

interface ILookupOpenButton extends IGeneratedField {
  valueKey?: string
}
export function CatalogLookup(props: ILookupOpenButton) {
  return (
    <LookupOpenButton
      lookupModalTitle="Select Catalog"
      displayKey="Name"
      meta={CatalogSearchMeta as IField[]}
      metaName="CatalogSearchMeta"
      {...props}
      {...getCatalogTableColumns(true)}
      valueKey={props.valueKey || "CatalogID"}
      {...(props.defaultValue && {
        entityLookupFunc: () =>
          getEntityById("Catalog", props.defaultValue).then((x) => {
            return x.data
          })
      })}
    />
  )
}
