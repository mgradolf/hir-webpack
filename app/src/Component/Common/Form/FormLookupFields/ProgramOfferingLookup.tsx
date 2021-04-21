import * as React from "react"
import { LookupOpenButton } from "~/Component/Common/Modal/LookupModal/LookupOpenButton"
import { IField, IGeneratedField } from "~/Component/Common/Form/common"
import { getProgramOfferingTableColumns } from "~/TableSearchMeta/ProgramOffering/ProgramOfferingTableColumns"
import { ProgramOfferingSearchMeta } from "~/TableSearchMeta/ProgramOffering/ProgramOfferingSearchMeta"

export function ProgramOfferingLookup(props: IGeneratedField) {
  return (
    <LookupOpenButton
      lookupModalTitle="Select Program Offering"
      valueKey="ProgramOfferingID"
      displayKey="ProgramOfferingCode"
      searchFieldName="programOfferingCode"
      meta={ProgramOfferingSearchMeta as IField[]}
      metaName="ProgramOfferingSearchMeta"
      {...props}
      {...getProgramOfferingTableColumns(true)}
    />
  )
}
