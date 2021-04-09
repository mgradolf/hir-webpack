import * as React from "react"
import { LookupOpenButton } from "~/Component/Common/Modal/LookupModal/LookupOpenButton"
import { IField, IGeneratedField } from "~/Component/Common/Form/common"
import { getProgramTableColumns } from "~/TableSearchMeta/Program/ProgramTableColumns"
import { ProgramSearchMeta } from "~/TableSearchMeta/Program/ProgramSearchMeta"

export function ProgramLookup(props: IGeneratedField) {
  return (
    <LookupOpenButton
      lookupModalTitle="Select Program"
      displayKey="ProgramCode"
      searchFieldName="programCode"
      meta={ProgramSearchMeta as IField[]}
      metaName="ProgramSearchMeta"
      {...props}
      {...getProgramTableColumns(true)}
      valueKey={props.valueKey || "ProgramID"}
    />
  )
}
