import * as React from "react"
import { SearchLookupOpenButton } from "~/Component/Common/SearchFilters/SearchLookupOpenButton"
import { IFilterFieldComponent, IFilterGenericComponentProps } from "~/Component/Common/SearchFilters/common"
import { MarketingCodeResponseSearchMeta } from "~/FormMeta/MarketingCodeResponse/MarketingCodeResponseSearchMeta"
import { getMarketingCodeRepositoryTableColumns } from "~/FormMeta/MarketingCodeRepository/MarketingCodeRepositoryTableColumns"

export function SearchMarketingCodeLookup(props: IFilterGenericComponentProps<IFilterFieldComponent>) {
  return (
    <SearchLookupOpenButton
      lookupModalTitle="Select Marketing Code"
      valueField="MarketingCodeID"
      displayField="Name"
      meta={MarketingCodeResponseSearchMeta}
      {...props}
      formInstance={props.formInstance}
      {...getMarketingCodeRepositoryTableColumns(true)}
    />
  )
}
