import * as React from "react"
import { SearchLookupOpenButton } from "~/Component/Common/SearchFilters/SearchLookupOpenButton"
import { IFilterFieldComponent, IFilterGenericComponentProps } from "~/Component/Common/SearchFilters/common"
import { getProgramTableColumns } from "~/FormMeta/Program/ProgramTableColumns"
import programMeta from "~/FormMeta/Program/ProgramSearchFilterMeta"

interface ISearchProgramLookup extends IFilterGenericComponentProps<IFilterFieldComponent> {
  valueField?: string
}
export function SearchProgramLookup(props: ISearchProgramLookup) {
  return (
    <SearchLookupOpenButton
      lookupModalTitle="Select Program"
      displayField="ProgramCode"
      meta={programMeta}
      {...props}
      {...getProgramTableColumns(true)}
      valueField={props.valueField || "ProgramID"}
    />
  )
}
