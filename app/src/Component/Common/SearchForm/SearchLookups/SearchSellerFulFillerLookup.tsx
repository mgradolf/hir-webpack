import * as React from "react"
import { SearchLookupOpenButton } from "~/Component/Common/SearchForm/SearchLookupOpenButton"
import { IField, IGeneratedField } from "~/Component/Common/SearchForm/common"
import { SellerFulFillerSearchMeta } from "~/FormMeta/SellerFulFiller/SellerFulFillerSearchMeta"
import { getSellerFulFillerTableColumns } from "~/FormMeta/SellerFulFiller/SellerFulFillerTableColumns"

export function SearchSellerFulfillerLookupButton(props: IGeneratedField) {
  return (
    <SearchLookupOpenButton
      lookupModalTitle="Select Seller Fulfiller"
      valueField="OrganizationID"
      displayField="OrganizationName"
      meta={SellerFulFillerSearchMeta as IField[]}
      {...props}
      formInstance={props.formInstance}
      {...getSellerFulFillerTableColumns(true)}
    />
  )
}
