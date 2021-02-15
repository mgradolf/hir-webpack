import * as React from "react"
import { LookupOpenButton } from "~/Component/Common/Form/LookupOpenButton"
import { IField, IGeneratedField } from "~/Component/Common/Form/common"
import { SellerFulFillerSearchMeta } from "~/TableSearchMeta/SellerFulFiller/SellerFulFillerSearchMeta"
import { getSellerFulFillerTableColumns } from "~/TableSearchMeta/SellerFulFiller/SellerFulFillerTableColumns"

export function SellerFulFillerLookup(props: IGeneratedField) {
  return (
    <LookupOpenButton
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
