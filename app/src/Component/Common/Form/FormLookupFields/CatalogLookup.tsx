import * as React from "react"
import { LookupOpenButton } from "~/Component/Common/Modal/LookupModal/LookupOpenButton"
import { IField, IGeneratedField } from "~/Component/Common/Form/common"
// import { getEntityById } from "~/ApiServices/Service/EntityService"
import { getCatalogTableColumns } from "~/TableSearchMeta/Catalog/CatalogTableColumns"
import { CatalogSearchMeta } from "~/TableSearchMeta/Catalog/CatalogSearchMeta"
import { getEntityById } from "~/ApiServices/Service/EntityService"

interface ILookupOpenButton extends IGeneratedField {
  valueField?: string
}
export function CatalogLookup(props: ILookupOpenButton) {
  return (
    <LookupOpenButton
      lookupModalTitle="Select Catalog"
      displayField="Name"
      meta={CatalogSearchMeta as IField[]}
      {...props}
      {...getCatalogTableColumns(true)}
      valueField={props.valueField || "CatalogID"}
      {...(props.defaultValue && {
        entityLookupFunc: () =>
          getEntityById("Catalog", props.defaultValue).then((x) => {
            return x.data
          })
      })}
    />
  )
}
