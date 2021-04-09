import * as React from "react"
import { LookupOpenButton } from "~/Component/Common/Modal/LookupModal/LookupOpenButton"
import { IField, IGeneratedField } from "~/Component/Common/Form/common"
import { getMarketingCodeRepositoryTableColumns } from "~/TableSearchMeta/MarketingCodeRepository/MarketingCodeRepositoryTableColumns"
import { MarketingCodeRepositorySearchMeta } from "~/TableSearchMeta/MarketingCodeRepository/MarketingCodeRepositorySearchMeta"

export function MarketingCodeLookup(props: IGeneratedField) {
  return (
    <LookupOpenButton
      lookupModalTitle="Select Promotion Code"
      valueKey="MarketingCodeID"
      displayKey="Name"
      placeholder="Search By Promotion Code"
      meta={MarketingCodeRepositorySearchMeta as IField[]}
      metaName="MarketingCodeRepositorySearchMeta"
      {...props}
      formInstance={props.formInstance}
      {...getMarketingCodeRepositoryTableColumns(true)}
    />
  )
}
