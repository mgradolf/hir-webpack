import * as React from "react"
import { SearchLookupOpenButton } from "~/Component/Common/SearchFilters/SearchLookupOpenButton"
import { IFilterFieldComponent, IFilterGenericComponentProps } from "~/Component/Common/SearchFilters/common"
import { getProgramTableColumns } from "~/FormMeta/Program/ProgramTableColumns"
import { ProgramSearchMeta } from "~/FormMeta/Program/ProgramSearchMeta"
import { getEntityById } from "~/ApiServices/Service/EntityService"

interface ISearchProgramLookup extends IFilterGenericComponentProps<IFilterFieldComponent> {
  valueField?: string
}
export function SearchProgramLookupButton(props: ISearchProgramLookup) {
  return (
    <SearchLookupOpenButton
      lookupModalTitle="Select Program"
      displayField="ProgramCode"
      meta={ProgramSearchMeta}
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
