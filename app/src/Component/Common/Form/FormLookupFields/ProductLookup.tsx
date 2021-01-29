import * as React from "react"
import { LookupOpenButton } from "~/Component/Common/Form/LookupOpenButton"
import { IField, IGeneratedField } from "~/Component/Common/Form/common"
import { getProductTableColumns } from "~/FormMeta/Product/ProductTableColumns"
import { ProductSearchMeta } from "~/FormMeta/Product/ProductSearchMeta"
import { getEntityById } from "~/ApiServices/Service/EntityService"

export function ProductLookup(props: IGeneratedField) {
  return (
    <LookupOpenButton
      lookupModalTitle="Select Product"
      valueField={props.valueField || "ProductID"}
      displayField="ProductName"
      {...getProductTableColumns(true)}
      meta={ProductSearchMeta as IField[]}
      {...props}
      {...(props.defaultValue && {
        entityLookupFunc: () =>
          getEntityById("Product", props.defaultValue).then((x) => {
            return x.data
          })
      })}
    />
  )
}
