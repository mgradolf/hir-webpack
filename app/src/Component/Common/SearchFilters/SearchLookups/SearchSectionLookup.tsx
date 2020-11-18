import * as React from "react"
import { SectionSearchMeta } from "~/FormMeta/Section/SectionSearchMeta"
import { SearchLookupOpenButton } from "~/Component/Common/SearchFilters/SearchLookupOpenButton"
import { IFilterFieldComponent, IFilterGenericComponentProps } from "~/Component/Common/SearchFilters/common"
import { getSectionTableColumns } from "~/FormMeta/Section/SectionTableColumns"

export function SearchSectionLookupButton(props: IFilterGenericComponentProps<IFilterFieldComponent>) {
  return (
    <SearchLookupOpenButton
      lookupModalTitle="Select Section"
      valueField="SectionID"
      displayField="SectionNumber"
      meta={SectionSearchMeta}
      {...props}
      formInstance={props.formInstance}
      {...getSectionTableColumns(true)}
    />
  )
}
