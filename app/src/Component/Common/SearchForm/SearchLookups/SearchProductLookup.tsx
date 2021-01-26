import * as React from "react"
import { SearchLookupOpenButton } from "~/Component/Common/SearchForm/SearchLookupOpenButton"
import { IField, IGeneratedField } from "~/Component/Common/SearchForm/common"
import { getProductTableColumns } from "~/FormMeta/Product/ProductTableColumns"
import { ProductSearchMeta } from "~/FormMeta/Product/ProductSearchMeta"
import { getEntityById } from "~/ApiServices/Service/EntityService"

export function SearchProducttLookup(props: IGeneratedField) {
  return (
    <SearchLookupOpenButton
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
