import * as React from "react"
import { PersonSearchMeta } from "~/FormMeta/Person/PersonSearchFilterMeta"
import { SearchLookupOpenButton } from "~/Component/Common/SearchFilters/SearchLookupOpenButton"
import { IFilterFieldComponent, IFilterGenericComponentProps } from "~/Component/Common/SearchFilters/common"
import { getPersonTableColumns } from "~/FormMeta/Person/PersonTableColumns"

export function SearchPersonLookupButton(props: IFilterGenericComponentProps<IFilterFieldComponent>) {
  return (
    <SearchLookupOpenButton
      lookupModalTitle="Select Person"
      valueField="PersonID"
      displayField="Name"
      meta={PersonSearchMeta}
      {...props}
      formInstance={props.formInstance}
      {...getPersonTableColumns(true)}
    />
  )
}
