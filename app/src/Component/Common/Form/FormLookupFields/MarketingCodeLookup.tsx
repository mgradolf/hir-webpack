import * as React from "react"
import { LookupOpenButton } from "~/Component/Common/Form/LookupOpenButton"
import { IField, IGeneratedField } from "~/Component/Common/Form/common"
import { getMarketingCodeRepositoryTableColumns } from "~/FormMeta/MarketingCodeRepository/MarketingCodeRepositoryTableColumns"
import { MarketingCodeRepositorySearchMeta } from "~/FormMeta/MarketingCodeRepository/MarketingCodeRepositorySearchMeta"

export function MarketingCodeLookup(props: IGeneratedField) {
  return (
    <LookupOpenButton
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
