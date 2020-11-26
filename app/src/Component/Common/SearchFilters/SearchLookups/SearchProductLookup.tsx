import * as React from "react"
import { SearchLookupOpenButton } from "~/Component/Common/SearchFilters/SearchLookupOpenButton"
import { IFilterFieldComponent, IFilterGenericComponentProps } from "~/Component/Common/SearchFilters/common"
import { getProductTableColumns } from "~/FormMeta/Product/ProductTableColumns"
import { ProductSearchMeta } from "~/FormMeta/Product/ProductSearchMeta"

export function SearchProducttLookup(props: IFilterGenericComponentProps<IFilterFieldComponent>) {
  return (
    <SearchLookupOpenButton
      lookupModalTitle="Select Product"
      valueField={props.valueField || "ProductID"}
      displayField="ProductName"
      {...getProductTableColumns(true)}
      meta={ProductSearchMeta}
      {...props}
    />
  )
}
