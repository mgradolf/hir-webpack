import * as React from "react"
import { SearchLookupOpenButton } from "~/Component/Common/SearchFilters/SearchLookupOpenButton"
import { IFilterFieldComponent, IFilterGenericComponentProps } from "~/Component/Common/SearchFilters/common"
import { SellerFulFillerSearchMeta } from "~/FormMeta/SellerFulFiller/SellerFulFillerSearchMeta"
import { getSellerFulFillerTableColumns } from "~/FormMeta/SellerFulFiller/SellerFulFillerTableColumns"

export function SearchSellerFulfillerLookupButton(props: IFilterGenericComponentProps<IFilterFieldComponent>) {
  return (
    <SearchLookupOpenButton
      lookupModalTitle="Select Seller Fulfiller"
      valueField="OrganizationID"
      displayField="OrganizationName"
      meta={SellerFulFillerSearchMeta}
      {...props}
      formInstance={props.formInstance}
      {...getSellerFulFillerTableColumns(true)}
    />
  )
}
