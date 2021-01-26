import * as React from "react"
import { SearchLookupOpenButton } from "~/Component/Common/SearchForm/SearchLookupOpenButton"
import { IField, IGeneratedField } from "~/Component/Common/SearchForm/common"
// import { PersonSearchMeta } from "~/FormMeta/Person/PersonSearchMeta"
// import { getPersonTableColumns } from "~/FormMeta/Person/PersonTableColumns"
// import { getEntityById } from "~/ApiServices/Service/EntityService"
import { getCatalogTableColumns } from "~/FormMeta/Catalog/CatalogTableColumns"
import { CatalogSearchMeta } from "~/FormMeta/Catalog/CatalogSearchMeta"

interface ISearchLookupOpenButton extends IGeneratedField {
  valueField?: string
}
export function SearchCatalogLookup(props: ISearchLookupOpenButton) {
  return (
    <SearchLookupOpenButton
      lookupModalTitle="Select Catalog"
      displayField="Name"
      meta={CatalogSearchMeta as IField[]}
      {...props}
      {...getCatalogTableColumns(true)}
      valueField={props.valueField || "CatalogID"}
      // {...(props.defaultValue && {
      //   entityLookupFunc: () =>
      //     getEntityById("Person", props.defaultValue).then((x) => {
      //       return x.data
      //     })
      // })}
    />
  )
}
