import * as React from "react"
import { PersonSearchMeta } from "~/FormMeta/Person/PersonSearchMeta"
import { SearchLookupOpenButton } from "~/Component/Common/SearchForm/SearchLookupOpenButton"
import { IField, IGeneratedField } from "~/Component/Common/SearchForm/common"
import { getPersonTableColumns } from "~/FormMeta/Person/PersonTableColumns"
import { getEntityById } from "~/ApiServices/Service/EntityService"

interface ISearchLookupOpenButton extends IGeneratedField {
  valueField?: string
}
export function SearchPersonLookupButton(props: ISearchLookupOpenButton) {
  return (
    <SearchLookupOpenButton
      lookupModalTitle="Select Person"
      displayField="FirstName"
      meta={PersonSearchMeta as IField[]}
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
