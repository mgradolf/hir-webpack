import * as React from "react"
import { SearchLookupOpenButton } from "~/Component/Common/SearchFilters/SearchLookupOpenButton"
import { IFilterFieldComponent, IFilterGenericComponentProps } from "~/Component/Common/SearchFilters/common"
import { getMarketingCodeRepositoryTableColumns } from "~/FormMeta/MarketingCodeRepository/MarketingCodeRepositoryTableColumns"
import { MarketingCodeRepositorySearchMeta } from "~/FormMeta/MarketingCodeRepository/MarketingCodeRepositorySearchMeta"

export function SearchMarketingCodeLookup(props: IFilterGenericComponentProps<IFilterFieldComponent>) {
  return (
    <SearchLookupOpenButton
      lookupModalTitle="Select Marketing Code"
      valueField="MarketingCodeID"
      displayField="Name"
      meta={MarketingCodeRepositorySearchMeta}
      {...props}
      formInstance={props.formInstance}
      {...getMarketingCodeRepositoryTableColumns(true)}
    />
  )
}
