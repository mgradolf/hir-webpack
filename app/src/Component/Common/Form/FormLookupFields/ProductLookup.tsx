import * as React from "react"
import { LookupOpenButton } from "~/Component/Common/Modal/LookupModal/LookupOpenButton"
import { IField, IGeneratedField } from "~/Component/Common/Form/common"
import { getProductTableColumns } from "~/TableSearchMeta/Product/ProductTableColumns"
import { ProductSearchMeta } from "~/TableSearchMeta/Product/ProductSearchMeta"

export function ProductLookup(props: IGeneratedField) {
  return (
    <LookupOpenButton
      lookupModalTitle="Select Product"
      valueKey={props.valueKey || "ProductID"}
      displayKey="ProductName"
      {...getProductTableColumns(true)}
      meta={ProductSearchMeta as IField[]}
      metaName="ProductSearchMeta"
      {...props}
    />
  )
}
