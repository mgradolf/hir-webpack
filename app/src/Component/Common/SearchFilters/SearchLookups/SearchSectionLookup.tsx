import * as React from "react"
import { SectionSearchMeta } from "~/FormMeta/Section/SectionSearchMeta"
import { SearchLookupOpenButton } from "~/Component/Common/SearchFilters/SearchLookupOpenButton"
import { IFilterFieldComponent, IFilterGenericComponentProps } from "~/Component/Common/SearchFilters/common"
import { getSectionTableColumns } from "~/FormMeta/Section/SectionTableColumns"
import { getEntityById } from "~/ApiServices/Service/EntityService"

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
      {...(props.defaultValue && {
        entityLookupFunc: () =>
          getEntityById("Section", props.defaultValue).then((x) => {
            return x.data
          })
      })}
    />
  )
}
