import * as React from "react"
import SectionSearchFilterMeta from "~/FormMeta/Section/SectionSearchFilterMeta"
import { SearchLookupOpenButton } from "~/Component/Common/SearchFilters/SearchLookupOpenButton"
import { IFilterFieldComponent, IFilterGenericComponentProps } from "~/Component/Common/SearchFilters/common"
import { getSectionTableColumns } from "~/FormMeta/Section/SectionTableColumns"

export function SearchSectionLookupButton(props: IFilterGenericComponentProps<IFilterFieldComponent>) {
  return (
    <SearchLookupOpenButton
      lookupModalTitle="Select Section"
      valueField="SectionID"
      displayField="SectionNumber"
      meta={SectionSearchFilterMeta}
      {...props}
      formInstance={props.formInstance}
      {...getSectionTableColumns(true)}
    />
  )
}
