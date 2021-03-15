import * as React from "react"
import { LookupOpenButton } from "~/Component/Common/Modal/LookupModal/LookupOpenButton"
import { IField, IGeneratedField } from "~/Component/Common/Form/common"
import { getProductTableColumns } from "~/TableSearchMeta/Product/ProductTableColumns"
import { ProductSearchMeta } from "~/TableSearchMeta/Product/ProductSearchMeta"
import { getEntityById } from "~/ApiServices/Service/EntityService"

export function ProductLookup(props: IGeneratedField) {
  return (
    <LookupOpenButton
      lookupModalTitle="Select Product"
      valueField={props.valueField || "ProductID"}
      displayField="ProductName"
      {...getProductTableColumns(true)}
      meta={ProductSearchMeta as IField[]}
      metaName="ProductSearchMeta"
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
