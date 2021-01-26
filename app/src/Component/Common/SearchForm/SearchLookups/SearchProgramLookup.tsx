import * as React from "react"
import { SearchLookupOpenButton } from "~/Component/Common/SearchForm/SearchLookupOpenButton"
import { IField, IGeneratedField } from "~/Component/Common/SearchForm/common"
import { getProgramTableColumns } from "~/FormMeta/Program/ProgramTableColumns"
import { ProgramSearchMeta } from "~/FormMeta/Program/ProgramSearchMeta"
import { getEntityById } from "~/ApiServices/Service/EntityService"

interface ISearchProgramLookup extends IGeneratedField {
  valueField?: string
}
export function SearchProgramLookupButton(props: ISearchProgramLookup) {
  return (
    <SearchLookupOpenButton
      lookupModalTitle="Select Program"
      displayField="ProgramCode"
      meta={ProgramSearchMeta as IField[]}
      {...props}
      {...getProgramTableColumns(true)}
      valueField={props.valueField || "ProgramID"}
      {...(props.defaultValue && {
        entityLookupFunc: () =>
          getEntityById("Program", props.defaultValue).then((x) => {
            return x.data
          })
      })}
    />
  )
}
