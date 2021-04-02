import * as React from "react"
import { LookupOpenButton } from "~/Component/Common/Modal/LookupModal/LookupOpenButton"
import { IField, IGeneratedField } from "~/Component/Common/Form/common"
import { getProgramTableColumns } from "~/TableSearchMeta/Program/ProgramTableColumns"
import { ProgramSearchMeta } from "~/TableSearchMeta/Program/ProgramSearchMeta"
import { getEntityById } from "~/ApiServices/Service/EntityService"

interface ISearchProgramLookup extends IGeneratedField {
  valueKey?: string
}
export function ProgramLookup(props: ISearchProgramLookup) {
  return (
    <LookupOpenButton
      lookupModalTitle="Select Program"
      displayKey="ProgramCode"
      meta={ProgramSearchMeta as IField[]}
      metaName="ProgramSearchMeta"
      {...props}
      {...getProgramTableColumns(true)}
      valueKey={props.valueKey || "ProgramID"}
      {...(props.defaultValue && {
        entityLookupFunc: () =>
          getEntityById("Program", props.defaultValue).then((x) => {
            return x.data
          })
      })}
    />
  )
}
