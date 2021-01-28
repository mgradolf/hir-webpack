import * as React from "react"
import { SearchLookupOpenButton } from "~/Component/Common/Form/SearchLookupOpenButton"
import { IField, IGeneratedField } from "~/Component/Common/Form/common"
import { getMarketingCodeRepositoryTableColumns } from "~/FormMeta/MarketingCodeRepository/MarketingCodeRepositoryTableColumns"
import { MarketingCodeRepositorySearchMeta } from "~/FormMeta/MarketingCodeRepository/MarketingCodeRepositorySearchMeta"

export function SearchMarketingCodeLookup(props: IGeneratedField) {
  return (
    <SearchLookupOpenButton
      lookupModalTitle="Select Promotion Code"
      valueField="MarketingCodeID"
      displayField="Name"
      meta={MarketingCodeRepositorySearchMeta as IField[]}
      {...props}
      formInstance={props.formInstance}
      {...getMarketingCodeRepositoryTableColumns(true)}
    />
  )
}
