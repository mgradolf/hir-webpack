import * as React from "react"
import PersonSearchFilterMeta from "~/FormMeta/Person/PersonSearchFilterMeta"
import { SearchLookupOpenButton } from "~/Component/Common/SearchFilters/SearchLookupOpenButton"
import { IFilterFieldComponent, IFilterGenericComponentProps } from "~/Component/Common/SearchFilters/common"
import { searchPersons } from "~/ApiServices/BizApi/person/persongIF"
import { getPersonTableColumns } from "~/FormMeta/Person/PersonTableColumns"

export function SearchPersonLookupButton(props: IFilterGenericComponentProps<IFilterFieldComponent>) {
  return (
    <SearchLookupOpenButton
      lookupModalTitle="Select Person"
      valueField="PersonID"
      displayField="Name"
      meta={PersonSearchFilterMeta}
      {...props}
      formInstance={props.formInstance}
      searchFunc={searchPersons}
      columns={getPersonTableColumns(true)}
    />
  )
}
