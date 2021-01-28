import * as React from "react"
import { PersonSearchMeta } from "~/FormMeta/Person/PersonSearchMeta"
import { SearchLookupOpenButton } from "~/Component/Common/SearchFilters/SearchLookupOpenButton"
import { IFilterFieldComponent, IFilterGenericComponentProps } from "~/Component/Common/SearchFilters/common"
import { getPersonTableColumns } from "~/FormMeta/Person/PersonTableColumns"
import { getEntityById } from "~/ApiServices/Service/EntityService"

interface ISearchLookupOpenButton extends IFilterGenericComponentProps<IFilterFieldComponent> {
  valueField?: string
}
export function SearchPersonLookupButton(props: ISearchLookupOpenButton) {
  return (
    <SearchLookupOpenButton
      lookupModalTitle="Select Person"
      displayField="SortName"
      meta={PersonSearchMeta}
      {...props}
      {...getPersonTableColumns(true)}
      valueField={props.valueField || "PersonID"}
      {...(props.defaultValue && {
        entityLookupFunc: () =>
          getEntityById("Person", props.defaultValue).then((x) => {
            return x.data
          })
      })}
    />
  )
}
